import { NextRequest, NextResponse } from 'next/server';
import { getProjectSubmissions } from '@/lib/sheets';
import { generateProjectContent, PartialProject } from "@/lib/gemini";

export const maxDuration = 60; // Allow Vercel up to 60s for AI Generation

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { submissionId, title, description, tags, github, external, image } = body;

        let inputTitle = title || '';
        let inputDescription = description || '';
        let inputTags = Array.isArray(tags) ? tags : typeof tags === 'string' ? tags.split(',').map((t:string)=>t.trim()).filter(Boolean) : [];
        let inputGithub = github || '';
        let inputExternal = external || '';
        let inputImage = image || '';

        if (submissionId) {
            const submissions = await getProjectSubmissions();
            const submission = submissions.find(s => s.id === submissionId);
            if (!submission) {
                return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
            }
            inputTitle = inputTitle || submission.title;
            inputDescription = inputDescription || submission.description;
            inputTags = inputTags.length > 0 ? inputTags : submission.keywords;
            inputGithub = inputGithub || submission.github || '';
            inputExternal = inputExternal || submission.external || '';
            inputImage = inputImage || submission.uploadedImageUrl || '';
        }

        if (!inputTitle && !inputDescription) {
             return NextResponse.json({ error: 'Missing title and description for generation' }, { status: 400 });
        }

        const partialProject = {
            title: inputTitle,
            description: inputDescription,
            tags: inputTags,
        };

        const randomHash = Math.random().toString(36).substring(2, 6);

        try {
            const geminiResult = await generateProjectContent(partialProject);
            
            let baseSlug = geminiResult.slug || inputTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
            const finalSlug = `${baseSlug}-${randomHash}`;

            const processedData = {
                title: geminiResult.title || inputTitle,
                slug: finalSlug,
                description: geminiResult.description || inputDescription,
                category: geminiResult.category || 'Uncategorized',
                tags: geminiResult.tags || inputTags,
                github: inputGithub,
                external: inputExternal,
                image: inputImage,
            };

            return NextResponse.json({ success: true, data: processedData });
        } catch (err) {
            console.error("Gemini failed in generate-project-submission:", err);
            
            let baseSlug = inputTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
            const finalSlug = `${baseSlug}-${randomHash}`;

            const fallbackData = {
                title: inputTitle,
                slug: finalSlug,
                description: inputDescription,
                category: 'Uncategorized',
                tags: inputTags,
                github: inputGithub,
                external: inputExternal,
                image: inputImage,
            };

            return NextResponse.json({ success: true, data: fallbackData, fallback: true });
        }
    } catch (error) {
        console.error('Error in /api/generate-project-submission:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
