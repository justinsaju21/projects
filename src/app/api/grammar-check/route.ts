import { NextRequest, NextResponse } from 'next/server';
import { checkGrammar } from "@/lib/gemini";
import { auth } from "@/lib/auth";

export const maxDuration = 60; // Allow Vercel up to 60s for AI Generation

export async function POST(req: NextRequest) {
    try {
        const session = await auth();
        // Check if admin is logged in, you can tweak this condition based on how you do auth for AdminDashboard
        if (!session || session.user?.email !== process.env.OWNER_EMAIL) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { text } = body;

        if (!text) {
            return NextResponse.json({ error: 'Missing text' }, { status: 400 });
        }

        const correctedText = await checkGrammar(text);

        return NextResponse.json({ success: true, correctedText });
    } catch (error: unknown) {
        console.error("Grammar check error:", error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
