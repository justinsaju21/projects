import { NextRequest, NextResponse } from 'next/server';
import { insertProject, updateProjectSubmissionStatus } from '@/lib/sheets';
import { sendApprovalEmail } from '@/lib/email';
import { auth } from "@/lib/auth";

export async function POST(req: NextRequest) {
    try {
        const session = await auth();
        if (!session || session.user?.email !== process.env.OWNER_EMAIL) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { 
            submissionId, 
            authorName,
            authorEmail,
            title, 
            slug, 
            description, 
            category, 
            tags,
            github,
            external,
            image,
            featured
        } = body;

        // Ensure slug has a random hash for uniqueness if not provided correctly, or simply append one to guarantee no collisions
        const randomHash = Math.random().toString(36).substring(2, 6);
        let finalSlug = slug || title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') || `project-${randomHash}`;
        
        // If it doesn't already end with a hash pattern (we assume simple check), we append one just in case, though the UI generator might have added one. Let's just always ensure uniqueness:
        if (!finalSlug.match(/-[a-z0-9]{4}$/)) {
            finalSlug = `${finalSlug}-${randomHash}`;
        }

        // 1. Insert into Projects sheet
        const projectId = await insertProject({
            title: title || '',
            slug: finalSlug,
            description: description || '',
            category: category || 'Uncategorized',
            tags: tags || [],
            github: github || '',
            streamlit: '',
            tinkercad: '',
            external: external || '',
            featured: featured || false,
            authorName: authorName || 'Anonymous',
            order: 999, // New projects go to the end or we can determine order logic
        });

        // 2. Mark submission as approved
        if (submissionId) {
            await updateProjectSubmissionStatus(submissionId, 'approved');
        }

        // 3. Send approval email if email is provided
        if (authorEmail && authorName) {
            await sendApprovalEmail({
                to: authorEmail,
                name: authorName,
                projectTitle: title,
                projectSlug: slug,
            }).catch(err => {
                console.error("Failed to send approval email, but project was inserted:", err);
            });
        }
        
        // Trigger on-demand revalidation
        await fetch(`${process.env.AUTH_URL}/api/revalidate`, {
            method: 'POST',
            headers: { 'x-revalidate-secret': process.env.AUTH_SECRET || '' }
        }).catch(console.error);

        return NextResponse.json({ success: true, id: projectId });
    } catch (error: unknown) {
        console.error("Upload project error:", error);
        const msg = error instanceof Error ? error.message : 'Internal error';
        return NextResponse.json({ success: false, error: msg }, { status: 500 });
    }
}
