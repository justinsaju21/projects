import { NextRequest, NextResponse } from 'next/server';
import { updateProjectSubmissionStatus, insertProject } from '@/lib/sheets';
import { sendRejectionEmail } from '@/lib/email';
import type { Project } from '@/types';
import { auth } from "@/lib/auth";

export async function POST(req: NextRequest) {
    try {
        const session = await auth();
        if (!session || session.user?.email !== process.env.OWNER_EMAIL) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { submissionId, action, authorName, authorEmail, projectData } = body;

        if (action === 'approve') {
            if (!projectData) {
                return NextResponse.json({ error: 'Missing projectData for approval' }, { status: 400 });
            }

            // Create the project object for insertion
            const newProject: Omit<Project, 'id'> = {
                title: projectData.title,
                slug: projectData.slug,
                description: projectData.description,
                category: projectData.category || 'Uncategorized',
                tags: projectData.tags || [],
                github: projectData.github,
                external: projectData.external,
                streamlit: projectData.streamlit,
                tinkercad: projectData.tinkercad,
                featured: false,
                authorName: authorName || 'Anonymous',
                order: 999, // Will be sorted at the end
            };

            await insertProject(newProject);
            await updateProjectSubmissionStatus(submissionId, 'approved');

            // Send approval email logic could be added here similar to blog if needed

            return NextResponse.json({ success: true, message: 'Project approved and published' });
        } else if (action === 'reject') {
            await updateProjectSubmissionStatus(submissionId, 'rejected');

            if (authorEmail && authorName) {
                await sendRejectionEmail({
                    to: authorEmail,
                    name: authorName,
                }).catch(err => {
                    console.error("Failed to send rejection email, but status updated:", err);
                });
            }
            return NextResponse.json({ success: true, message: 'Submission rejected' });
        }

        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    } catch (error: unknown) {
        console.error("Approve error:", error);
        const msg = error instanceof Error ? error.message : 'Internal error';
        return NextResponse.json({ success: false, error: msg }, { status: 500 });
    }
}
