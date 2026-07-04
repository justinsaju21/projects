import { NextRequest, NextResponse } from 'next/server';
import { insertProjectSubmission } from '@/lib/sheets';
import { sendSubmissionConfirmationEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, title, description, keywords, github, external, image } = body;

        const id = await insertProjectSubmission({
            name: name || '',
            email: email || '',
            title: title || '',
            description: description || '',
            keywords: keywords ? keywords.split(',').map((k: string) => k.trim()).filter(Boolean) : [],
            github: github || '',
            external: external || '',
            uploadedImageUrl: image || '',
        });

        if (email) {
            await sendSubmissionConfirmationEmail({ to: email, name: name || '' }).catch(console.error);
        }

        return NextResponse.json({ success: true, id });
    } catch (error: unknown) {
        console.error("Submit error:", error);
        const msg = error instanceof Error ? error.message : 'Internal error';
        return NextResponse.json({ success: false, error: msg }, { status: 500 });
    }
}
