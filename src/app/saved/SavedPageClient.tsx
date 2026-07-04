"use client";

import { useSaved } from "@/components/SavedContext";
import { ProjectGridClient } from "@/components/home/ProjectGridClient";
import type { Project } from "@/types";
import { Bookmark } from "lucide-react";

interface SavedPageClientProps {
    projects: Project[];
}

export function SavedPageClient({ projects }: SavedPageClientProps) {
    const { savedProjectSlugs } = useSaved();
    
    const savedProjects = projects.filter(project => savedProjectSlugs.includes(project.slug));

    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', paddingTop: '120px' }}>
            <div className="max-w-7xl mx-auto px-6 mb-16">
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-2xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                        <Bookmark className="w-6 h-6" style={{ color: 'var(--text-primary)' }} />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--text-primary)' }}>
                        Saved Projects
                    </h1>
                </div>
                <p className="text-lg max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
                    Your personal collection of bookmarked projects.
                </p>
            </div>

            <div className="pb-24">
                {savedProjects.length > 0 ? (
                    <ProjectGridClient projects={savedProjects} hideSearch={true} />
                ) : (
                    <div className="max-w-7xl mx-auto px-6 text-center py-24">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                            <Bookmark className="w-6 h-6" style={{ color: 'var(--text-muted)' }} />
                        </div>
                        <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--text-primary)' }}>
                            No saved projects yet
                        </h2>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            When you find a project you want to read later, click the bookmark icon to save it here.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
