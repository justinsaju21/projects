import { NextRequest, NextResponse } from 'next/server';
import { getProjectSubmissions } from '@/lib/sheets';
import { generateProjectContent, PartialProject } from "@/lib/gemini";

export const maxDuration = 60; // Allow Vercel up to 60s for AI Generation

export async function POST(req: NextRequest) {
    try {
        const { submissionId } = await req.json();

        if (!submissionId) {
            return NextResponse.json({ error: 'Missing submissionId' }, { status: 400 });
        }

        const submissions = await getProjectSubmissions();
        const submission = submissions.find(s => s.id === submissionId);

        if (!submission) {
            return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
        }

        const partialProject = {
            title: submission.title,
            description: submission.description,
            tags: submission.keywords,
        };

        const randomHash = Math.random().toString(36).substring(2, 6);

        try {
            const geminiResult = await generateProjectContent(partialProject);
            
            let baseSlug = geminiResult.slug || submission.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
            const finalSlug = `${baseSlug}-${randomHash}`;

            const processedData = {
                title: geminiResult.title || submission.title,
                slug: finalSlug,
                description: geminiResult.description || submission.description,
                category: geminiResult.category || 'Uncategorized',
                tags: geminiResult.tags || submission.keywords,
                github: submission.github || '',
                external: submission.external || '',
                image: submission.uploadedImageUrl || '',
            };

            return NextResponse.json({ success: true, data: processedData });
        } catch (err) {
            console.error("Gemini failed in generate-project-submission:", err);
            
            let baseSlug = submission.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
            const finalSlug = `${baseSlug}-${randomHash}`;

            const fallbackData = {
                title: submission.title,
                slug: finalSlug,
                description: submission.description,
                category: 'Uncategorized',
                tags: submission.keywords,
                github: submission.github || '',
                external: submission.external || '',
                image: submission.uploadedImageUrl || '',
            };

            return NextResponse.json({ success: true, data: fallbackData, fallback: true });
        }
    } catch (error) {
        console.error('Error in /api/generate-project-submission:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
