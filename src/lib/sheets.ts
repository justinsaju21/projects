import { google } from 'googleapis'
import type { Project } from '@/types'

function getAuth() {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON!
  const creds = JSON.parse(raw)
  return new google.auth.GoogleAuth({
    credentials: creds,
    scopes: [
      'https://www.googleapis.com/auth/spreadsheets.readonly',
    ],
  })
}

async function getSheetsClient() {
  const auth = getAuth()
  return google.sheets({ version: 'v4', auth })
}

const SHEET_ID = () => process.env.GOOGLE_SHEETS_ID!

// Helpers
function parseBoolean(val: string | undefined): boolean {
  return val?.toUpperCase() === 'TRUE'
}

function parseArray(val: string | undefined): string[] {
  if (!val) return []
  return val.split(',').map((s) => s.trim()).filter(Boolean)
}

function parseIntSafe(val: string | undefined, defaultVal = 0): number {
  const parsed = parseInt(val || '', 10)
  return isNaN(parsed) ? defaultVal : parsed
}

// ─── Projects ──────────────────────────────────────────────────────────────
// Columns: id | title | slug | description | category | tags | github | streamlit | tinkercad | external | featured | authorName | order
function rowToProject(row: string[]): Project {
  return {
    id: row[0] ?? '',
    title: row[1] ?? '',
    slug: row[2] ?? '',
    description: row[3] ?? '',
    category: row[4] ?? '',
    tags: parseArray(row[5]),
    github: row[6] || undefined,
    streamlit: row[7] || undefined,
    tinkercad: row[8] || undefined,
    external: row[9] || undefined,
    featured: parseBoolean(row[10]),
    authorName: row[11] ?? '',
    order: parseIntSafe(row[12], 999),
  }
}

export async function getProjects(): Promise<Project[]> {
  try {
    const sheets = await getSheetsClient()
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID(),
      range: 'Projects!A2:M',
    })
    const rows = (res.data.values ?? []) as string[][]
    const projects = rows.filter((r) => r[0]).map(rowToProject)
    return projects.sort((a, b) => a.order - b.order)
  } catch (error) {
    console.error("Error fetching Projects:", error)
    return []
  }
}

export async function insertProject(project: Omit<Project, 'id'>): Promise<string> {
  const sheets = await getSheetsClient()
  const id = crypto.randomUUID()
  const row = [
    id,
    project.title,
    project.slug,
    project.description,
    project.category,
    project.tags.join(', '),
    project.github || '',
    project.streamlit || '',
    project.tinkercad || '',
    project.external || '',
    project.featured ? 'TRUE' : 'FALSE',
    project.authorName,
    project.order,
  ]
  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID(),
    range: 'Projects!A:M',
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    requestBody: { values: [row] },
  })
  return id
}

// ─── Project Submissions ───────────────────────────────────────────────────
export interface ProjectSubmission {
  id: string
  status: 'pending' | 'approved' | 'rejected'
  name: string
  email: string
  title: string
  description: string
  keywords: string[]
  github?: string
  external?: string
  uploadedImageUrl?: string
  submittedAt: string
}

export async function insertProjectSubmission(
  submission: Omit<ProjectSubmission, 'id' | 'status' | 'submittedAt'>
): Promise<string> {
  const sheets = await getSheetsClient()
  const id = crypto.randomUUID()
  const now = new Date().toISOString()
  const row = [
    id,
    'pending',
    submission.name,
    submission.email,
    submission.title,
    submission.description,
    submission.keywords.join(', '),
    submission.github || '',
    submission.external || '',
    submission.uploadedImageUrl || '',
    now,
  ]
  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID(),
    range: 'ProjectSubmissions!A:K',
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    requestBody: { values: [row] },
  })
  return id
}

export async function getProjectSubmissions(): Promise<ProjectSubmission[]> {
  try {
    const sheets = await getSheetsClient()
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID(),
      range: 'ProjectSubmissions!A2:K',
    })
    const rows = (res.data.values ?? []) as string[][]
    return rows.filter((r) => r[0]).map(r => ({
      id: r[0] ?? '',
      status: (r[1] as 'pending' | 'approved' | 'rejected') ?? 'pending',
      name: r[2] ?? '',
      email: r[3] ?? '',
      title: r[4] ?? '',
      description: r[5] ?? '',
      keywords: parseArray(r[6]),
      github: r[7] || undefined,
      external: r[8] || undefined,
      uploadedImageUrl: r[9] || undefined,
      submittedAt: r[10] ?? '',
    })).reverse()
  } catch (error) {
    console.error("Error fetching ProjectSubmissions:", error)
    return []
  }
}

export async function updateProjectSubmissionStatus(id: string, status: 'approved' | 'rejected'): Promise<boolean> {
  try {
    const sheets = await getSheetsClient();
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID(),
      range: 'ProjectSubmissions!A:B',
    });
    
    const rows = res.data.values;
    if (!rows) return false;
    
    const rowIndex = rows.findIndex(row => row[0] === id);
    if (rowIndex === -1) return false;
    
    const actualRowNumber = rowIndex + 1;
    
    await sheets.spreadsheets.values.update({
      spreadsheetId: SHEET_ID(),
      range: `ProjectSubmissions!B${actualRowNumber}`,
      valueInputOption: 'RAW',
      requestBody: { values: [[status]] },
    });
    
    return true;
  } catch (error) {
    console.error("Error updating project submission status:", error);
    return false;
  }
}
