"use client";

import { useState } from "react";
import { Loader2, Wand2, Trash2 } from "lucide-react";
import type { Project } from "@/types";

interface ProjectSubmission {
    id: string;
    status: 'pending' | 'approved' | 'rejected';
    name: string;
    email: string;
    title: string;
    description: string;
    keywords: string[];
    github?: string;
    external?: string;
    uploadedImageUrl?: string;
    submittedAt: string;
}

interface AdminDashboardProps {
    projects: Project[];
    submissions: ProjectSubmission[];
}

export function AdminDashboard({ projects, submissions }: AdminDashboardProps) {
    const [activeTab, setActiveTab] = useState<'overview' | 'upload' | 'projects' | 'submissions' | 'contributors'>('overview');
    const [loading, setLoading] = useState(false);
    const [generating, setGenerating] = useState(false);
    const [actioningId, setActioningId] = useState<string | null>(null);
    const [activeSubmissionId, setActiveSubmissionId] = useState<string | null>(null);

    // Form state for AI assist (Projects)
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        category: '',
        authorName: 'Justin Jacob Saju',
        description: '',
        tags: '',
        github: 'https://github.com/justinsaju21',
        external: '',
        featured: false,
    });

    const pendingSubmissions = submissions.filter(s => s.status === 'pending');
    
    // Unique authors calculation
    const uniqueAuthors = Array.from(new Set(projects.map(p => p.authorName).filter(Boolean)));

    async function handleGenerateAI() {
        setGenerating(true);
        try {
            const res = await fetch("/api/generate-project-submission", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ submissionId: activeSubmissionId, ...formData }) // Optional: passing formData to seed if needed, but endpoint uses submissionId directly right now
            });
            const data = await res.json();
            if (data.success && data.data) {
                setFormData(prev => ({
                    ...prev,
                    title: data.data.title || prev.title,
                    slug: data.data.slug || prev.slug,
                    category: data.data.category || prev.category,
                    description: data.data.description || prev.description,
                    tags: Array.isArray(data.data.tags) ? data.data.tags.join(', ') : data.data.tags || prev.tags,
                }));
            } else {
                alert("AI Generation failed: " + data.error);
            }
        } catch (error) {
            console.error(error);
            alert("AI Generation failed.");
        } finally {
            setGenerating(false);
        }
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        const fd = new FormData(e.currentTarget);
        
        Object.entries(formData).forEach(([key, value]) => {
            if (key !== 'image') {
                fd.set(key, value.toString());
            }
        });
        
        if (activeSubmissionId) {
            fd.set('submissionId', activeSubmissionId);
            
            // Get email/name from the active submission to send approval email
            const activeSub = submissions.find(s => s.id === activeSubmissionId);
            if (activeSub) {
                fd.set('authorEmail', activeSub.email);
            }
        }
        
        // Tags to array string
        fd.set('tags', formData.tags.split(',').map(t => t.trim()).filter(Boolean).join(', '));
        
        // Format body to JSON for the new route
        const bodyObj = Object.fromEntries(fd.entries());
        
        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bodyObj),
            });
            if (res.ok) {
                window.location.reload();
            } else {
                alert("Upload failed");
            }
        } catch (err) {
            console.error(err);
            alert("Upload failed");
        } finally {
            setLoading(false);
        }
    }

    async function handleAction(id: string, action: 'approve' | 'reject') {
        if (action === 'approve') {
            setActioningId(id);
            try {
                const res = await fetch("/api/generate-project-submission", {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ submissionId: id }),
                });
                const data = await res.json();
                if (data.success && data.data) {
                    setFormData(prev => ({
                        ...prev,
                        title: data.data.title || '',
                        slug: data.data.slug || '',
                        category: data.data.category || '',
                        description: data.data.description || '',
                        tags: Array.isArray(data.data.tags) ? data.data.tags.join(', ') : data.data.tags || '',
                        github: data.data.github || '',
                        external: data.data.external || '',
                        authorName: submissions.find(s => s.id === id)?.name || 'Anonymous',
                    }));
                    
                    const formElement = document.querySelector('form') as HTMLFormElement;
                    if (formElement) {
                        const imageInput = formElement.querySelector('input[name="image"]') as HTMLInputElement;
                        if (imageInput) imageInput.value = data.data.image || '';
                    }

                    setActiveSubmissionId(id);
                    setActiveTab('upload');
                } else {
                    alert("Failed to process submission: " + data.error);
                }
            } catch (err) {
                console.error(err);
                alert("Failed to process submission");
            } finally {
                setActioningId(null);
            }
            return;
        }

        setActioningId(id);
        const sub = submissions.find(s => s.id === id);
        try {
            const res = await fetch("/api/approve", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    submissionId: id, 
                    action,
                    authorName: sub?.name,
                    authorEmail: sub?.email
                }),
            });
            if (res.ok) {
                window.location.reload();
            } else {
                const data = await res.json();
                alert(`Action failed: ${data.error || 'Unknown error'}`);
            }
        } catch (err) {
            console.error(err);
            alert("Action failed");
        } finally {
            setActioningId(null);
        }
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-6">
                <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, color: 'var(--text-primary)' }}>Dashboard</h1>
                
                <div className="flex overflow-x-auto hide-scrollbar gap-8 border-b" style={{ borderColor: 'var(--border)' }}>
                    {[
                        { id: 'overview', label: 'Overview' },
                        { id: 'upload', label: 'Upload' },
                        { id: 'projects', label: `Projects (${projects.length})` },
                        { id: 'submissions', label: `Submissions (${pendingSubmissions.length} pending)` },
                        { id: 'contributors', label: `Contributors (${uniqueAuthors.length})` }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className="pb-4 relative whitespace-nowrap transition-colors"
                            style={{ 
                                color: activeTab === tab.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                                fontWeight: activeTab === tab.id ? 500 : 400
                            }}
                        >
                            {tab.label}
                            {activeTab === tab.id && (
                                <div 
                                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 rounded-t-full" 
                                    style={{ background: 'var(--text-primary)' }} 
                                />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {activeTab === 'overview' && (
                <div className="p-8 rounded-2xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                    <p style={{ color: 'var(--text-secondary)' }}>Welcome to your Echo Projects Hub dashboard.</p>
                </div>
            )}

            {activeTab === 'projects' && (
                <div className="grid gap-4">
                    {projects.map(project => (
                        <div key={project.id} className="p-6 rounded-2xl flex items-center justify-between" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                            <div>
                                <h3 style={{ color: 'var(--text-primary)', fontSize: 18, fontWeight: 500 }}>{project.title}</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>{project.slug} • {project.category}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'submissions' && (
                <div className="grid gap-4">
                    {pendingSubmissions.length === 0 ? (
                        <div className="p-8 rounded-2xl text-center" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                            <p style={{ color: 'var(--text-secondary)' }}>No pending submissions.</p>
                        </div>
                    ) : (
                        pendingSubmissions.map(sub => (
                            <div key={sub.id} className="p-6 rounded-2xl flex flex-col gap-4" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                                <div>
                                    <h3 style={{ color: 'var(--text-primary)', fontSize: 18, fontWeight: 500 }}>{sub.title}</h3>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>By {sub.name} ({sub.email})</p>
                                    <p className="mt-4 text-sm line-clamp-3" style={{ color: 'var(--text-muted)' }}>{sub.description}</p>
                                </div>
                                <div className="flex gap-3 justify-end mt-2 border-t pt-4" style={{ borderColor: 'var(--border)' }}>
                                    <button 
                                        onClick={() => handleAction(sub.id, 'reject')}
                                        disabled={actioningId === sub.id}
                                        className="px-4 py-2 rounded-xl text-sm font-medium transition-colors hover:bg-red-500/10 text-red-500 flex items-center gap-2"
                                    >
                                        <Trash2 className="w-4 h-4" /> Reject
                                    </button>
                                    <button 
                                        onClick={() => handleAction(sub.id, 'approve')}
                                        disabled={actioningId === sub.id}
                                        className="px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2"
                                        style={{ background: 'var(--text-primary)', color: 'var(--bg-primary)' }}
                                    >
                                        {actioningId === sub.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Wand2 className="w-4 h-4" /> Review & AI Edit</>}
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {activeTab === 'contributors' && (
                <div className="grid gap-4">
                    {uniqueAuthors.map(author => (
                        <div key={author} className="p-6 rounded-2xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                            <h3 style={{ color: 'var(--text-primary)', fontSize: 18, fontWeight: 500 }}>{author}</h3>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'upload' && (
                <form onSubmit={handleSubmit} className="space-y-6 p-8 rounded-2xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                    <div className="flex justify-between items-center mb-6">
                        <h2 style={{ color: 'var(--text-primary)', fontSize: 20, fontFamily: "'Playfair Display', serif" }}>
                            {activeSubmissionId ? 'Reviewing Project' : 'Create New Project'}
                        </h2>
                        <div className="flex gap-4">
                            {activeSubmissionId && (
                                <button 
                                    type="button"
                                    onClick={() => {
                                        setActiveSubmissionId(null);
                                        setFormData({
                                            title: '', slug: '', category: '', authorName: 'Justin Jacob Saju', description: '', tags: '', github: 'https://github.com/justinsaju21', external: '', featured: false
                                        });
                                        const formElement = document.querySelector('form') as HTMLFormElement;
                                        if (formElement) {
                                            const imageInput = formElement.querySelector('input[name="image"]') as HTMLInputElement;
                                            if (imageInput) imageInput.value = '';
                                        }
                                    }}
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
                                    style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
                                >
                                    Cancel Review
                                </button>
                            )}
                            <button 
                                type="button"
                                onClick={handleGenerateAI}
                                disabled={generating}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
                                style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', border: '1px solid rgba(59, 130, 246, 0.2)' }}
                            >
                                {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
                                AI Assist
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Title</label>
                            <input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2.5 rounded-xl focus:outline-none" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }} />
                        </div>
                        <div className="space-y-2">
                            <label style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Slug</label>
                            <input value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full px-4 py-2.5 rounded-xl focus:outline-none" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }} />
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Category</label>
                            <input value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-2.5 rounded-xl focus:outline-none" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }} placeholder="e.g. AI, Web" />
                        </div>
                        <div className="space-y-2">
                            <label style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Tags (comma separated)</label>
                            <input value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} className="w-full px-4 py-2.5 rounded-xl focus:outline-none" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }} />
                        </div>
                        <div className="space-y-2">
                            <label style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Author Name</label>
                            <input value={formData.authorName} onChange={e => setFormData({...formData, authorName: e.target.value})} className="w-full px-4 py-2.5 rounded-xl focus:outline-none" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Description</label>
                        <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={5} className="w-full px-4 py-2.5 rounded-xl focus:outline-none resize-none" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>GitHub URL</label>
                            <input value={formData.github} onChange={e => setFormData({...formData, github: e.target.value})} className="w-full px-4 py-2.5 rounded-xl focus:outline-none" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }} />
                        </div>
                        <div className="space-y-2">
                            <label style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Live URL (External)</label>
                            <input value={formData.external} onChange={e => setFormData({...formData, external: e.target.value})} className="w-full px-4 py-2.5 rounded-xl focus:outline-none" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }} />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <input 
                                type="checkbox" 
                                id="featured" 
                                checked={formData.featured}
                                onChange={e => setFormData({...formData, featured: e.target.checked})}
                                className="w-4 h-4 rounded" 
                            />
                            <label htmlFor="featured" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Featured Project</label>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Cover Image URL (Optional)</label>
                        <input 
                            type="text" 
                            name="image" 
                            placeholder="Paste a Google Drive or other image URL here"
                            className="w-full px-4 py-2.5 rounded-xl focus:outline-none transition-colors" 
                            style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }} 
                        />
                    </div>

                    <button type="submit" disabled={loading} className="px-6 py-3 rounded-xl transition-all hover:scale-105 flex items-center justify-center gap-2" style={{ background: 'var(--text-primary)', color: 'var(--bg-primary)', fontWeight: 500 }}>
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Publish Project"}
                    </button>
                </form>
            )}
        </div>
    );
}
