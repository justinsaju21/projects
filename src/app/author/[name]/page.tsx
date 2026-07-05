import { getProjects } from "@/lib/sheets";
import { ProjectGridClient } from "@/components/home/ProjectGridClient";

export default async function AuthorPage({ params }: { params: Promise<{ name: string }> }) {
    const { name } = await params;
    const rawName = decodeURIComponent(name);
    const projects = await getProjects();
    const authorProjects = projects.filter(p => p.authorName === rawName);

    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px' }}>
            <div className="max-w-6xl mx-auto px-6">
                <div className="mb-12">
                    <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 48, color: 'var(--text-primary)', marginBottom: '1rem' }}>
                        {rawName}
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: 18 }}>
                        {authorProjects.length} published {authorProjects.length === 1 ? 'project' : 'projects'}
                    </p>
                </div>
                
                {authorProjects.length > 0 ? (
                    <ProjectGridClient projects={authorProjects} />
                ) : (
                    <p style={{ color: 'var(--text-secondary)' }}>No projects found for this author.</p>
                )}
            </div>
        </div>
    );
}
