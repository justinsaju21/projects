import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs/promises';
import path from 'path';

const USERNAME = 'justinsaju21';
const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
    console.error("GEMINI_API_KEY is missing from environment variables.");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ 
    model: 'gemini-3.1-flash-lite', 
    generationConfig: { responseMimeType: 'application/json' } 
});

const promptTemplate = `
You are an expert technical writer and portfolio curator.
I will provide you with a GitHub repository's details and its README content.
I want you to extract and refine this information into a high-quality portfolio project entry.

Requirements:
1. title: A clean, human-readable title (e.g., "LogicMap Pro" instead of "logicmap-pro").
2. description: A concise 1-2 sentence summary of what the project is and why it's cool.
3. tags: An array of specific technical keywords and languages used.
4. category: A single broad category like "AI", "Web Development", "Hardware", "VLSI", "Engineering", etc.
5. content: A detailed write-up in Markdown format. If the README is good, refine it, fix grammar, and make it read like a professional blog post. If the README is short, expand on it logically based on the title and description, explaining potential use cases or features.

Return ONLY valid JSON matching this schema:
{
    "title": "string",
    "description": "string",
    "tags": ["string"],
    "category": "string",
    "content": "string (markdown)"
}
`;

async function fetchReadme(repoName) {
    let res = await fetch(`https://raw.githubusercontent.com/${USERNAME}/${repoName}/main/README.md`);
    if (res.ok) return await res.text();
    
    res = await fetch(`https://raw.githubusercontent.com/${USERNAME}/${repoName}/master/README.md`);
    if (res.ok) return await res.text();

    return null;
}

async function curateProjects() {
    console.log(`Fetching repositories for ${USERNAME}...`);
    const res = await fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100`);
    if (!res.ok) {
        console.error("Failed to fetch repositories.");
        return;
    }
    
    const repos = await res.json();
    const validRepos = repos.filter(r => !r.fork && r.size > 0);
    console.log(`Found ${validRepos.length} potential projects.`);

    const curatedList = [];

    for (const repo of validRepos) {
        console.log(`Processing: ${repo.name}...`);
        const readme = await fetchReadme(repo.name);
        
        if (!readme || readme.trim().length < 20) {
            console.log(`Skipping ${repo.name} - No meaningful README found.`);
            continue;
        }

        const input = `
Repository: ${repo.name}
Description: ${repo.description || 'N/A'}
Language: ${repo.language || 'N/A'}

README CONTENT:
${readme.substring(0, 5000)} // Truncating to avoid massive tokens
        `;

        try {
            const result = await model.generateContent(promptTemplate + "\n\n" + input);
            const data = JSON.parse(result.response.text());
            
            curatedList.push({
                ...data,
                githubUrl: repo.html_url,
                originalName: repo.name
            });
            console.log(`✅ Curated: ${data.title}`);
        } catch (error) {
            console.error(`❌ Failed to process ${repo.name}:`, error.message);
        }

        // Add a slight delay to avoid rate limiting
        await new Promise(r => setTimeout(r, 1500));
    }

    // Format output as Markdown
    let mdOutput = `# Curated GitHub Projects\n\nHere are your detailed, AI-curated project write-ups ready for your portfolio.\n\n`;
    
    for (const proj of curatedList) {
        mdOutput += `## ${proj.title}\n`;
        mdOutput += `**Category:** ${proj.category}\n`;
        mdOutput += `**Tags:** ${proj.tags.join(', ')}\n`;
        mdOutput += `**GitHub URL:** ${proj.githubUrl}\n\n`;
        mdOutput += `### Description\n${proj.description}\n\n`;
        mdOutput += `### Detailed Write-up (Markdown)\n\`\`\`markdown\n${proj.content}\n\`\`\`\n\n`;
        mdOutput += `---\n\n`;
    }

    const outputPath = path.join(process.cwd(), 'curated_projects.md');
    await fs.writeFile(outputPath, mdOutput);
    console.log(`\n🎉 Done! Generated rich details for ${curatedList.length} projects.`);
    console.log(`Output saved to: ${outputPath}`);
}

curateProjects();
