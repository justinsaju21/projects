"use client";

import { useState, useEffect } from "react";
import { Loader2, Wand2, Check, Trash2, Edit2 } from "lucide-react";
import type { Project } from "@/types";
import { createPortal } from "react-dom";

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

    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

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

    useEffect(() => {
        if (editingProject) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [editingProject]);

    async function handleGenerateAI() {
        setGenerating(true);
        try {
            const res = await fetch("/api/generate-project-submission", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ submissionId: activeSubmissionId, ...formData })
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
            const activeSub = submissions.find(s => s.id === activeSubmissionId);
            if (activeSub) {
                fd.set('authorEmail', activeSub.email);
            }
        }
        
        fd.set('tags', formData.tags.split(',').map(t => t.trim()).filter(Boolean).join(', '));
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

    async function handleDeleteSubmission(id: string) {
        if (isProcessing) return;
        if (!confirm('Are you sure you want to permanently delete this submission?')) return;
        setIsProcessing(true);
        try {
            const res = await fetch(`/api/submissions/${id}`, { method: 'DELETE' });
            if (res.ok) {
                window.location.reload();
            } else {
                alert('Delete failed');
            }
        } catch (err) {
            console.error(err);
            alert('Delete failed');
        } finally {
            setIsProcessing(false);
        }
    }

    async function handleSaveProject(e: React.FormEvent) {
        e.preventDefault();
        if (!editingProject || isProcessing) return;
        setIsProcessing(true);
        try {
            const res = await fetch(`/api/projects/${editingProject.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingProject)
            });
            if (res.ok) {
                window.location.reload();
            } else {
                alert('Update failed');
            }
        } catch (err) {
            console.error(err);
            alert('Update failed');
        } finally {
            setIsProcessing(false);
        }
    }

    async function handleDeleteProject(id: string) {
        if (isProcessing) return;
        if (!confirm('Are you sure you want to permanently delete this project?')) return;
        setIsProcessing(true);
        try {
            const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
            if (res.ok) {
                window.location.reload();
            } else {
                alert('Delete failed');
            }
        } catch (err) {
            console.error(err);
            alert('Delete failed');
        } finally {
            setIsProcessing(false);
        }
    }

    const cardStyle = {
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 16,
        padding: '24px',
    };

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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { label: 'Total Projects', value: projects.length },
                        { label: 'Pending Submissions', value: pendingSubmissions.length },
                        { label: 'Authors', value: uniqueAuthors.length },
                        { label: 'Featured', value: projects.filter(p => p.featured).length },
                    ].map((stat) => (
                        <div key={stat.label} style={cardStyle}>
                            <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>{stat.label}</p>
                            <p style={{ fontSize: 40, fontWeight: 300, color: 'var(--text-primary)' }}>{stat.value}</p>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'projects' && (
                <div className="grid gap-4">
                    {projects.map(project => (
                        <div 
                            key={project.id} 
                            onClick={() => setEditingProject(project)}
                            className="p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-white/5 transition-colors" 
                            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
                        >
                            <div>
                                <div className="flex items-center gap-3">
                                    <h3 style={{ color: 'var(--text-primary)', fontSize: 18, fontWeight: 500 }}>{project.title}</h3>
                                    {project.featured && (
                                        <span style={{ background: 'var(--accent)', color: 'var(--bg-primary)', padding: '2px 8px', borderRadius: 12, fontSize: 11, fontWeight: 600 }}>FEATURED</span>
                                    )}
                                </div>
                                <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginTop: 4 }}>
                                    {project.slug} • {project.category} • By {project.authorName}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setEditingProject(project);
                                    }}
                                    className="px-4 py-2 rounded-xl text-sm font-medium transition-colors hover:bg-white/10 flex items-center gap-2"
                                    style={{ color: 'var(--text-primary)', border: '1px solid var(--border)' }}
                                >
                                    <Edit2 className="w-4 h-4" /> Edit
                                </button>
                                <button
                                    disabled={isProcessing}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteProject(project.id);
                                    }}
                                    className="px-4 py-2 rounded-xl text-sm font-medium transition-colors hover:bg-red-500/10 text-red-500 flex items-center gap-2"
                                    style={{ border: '1px solid rgba(239, 68, 68, 0.2)' }}
                                >
                                    <Trash2 className="w-4 h-4" /> Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Editing Project Modal */}
            {editingProject && typeof document !== 'undefined' && createPortal(
                <div data-lenis-prevent="true" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', zIndex: 99999, overflowY: 'auto', overscrollBehavior: 'none' }}>
                    <div style={{ minHeight: '100%', padding: '48px 24px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                        <div style={{ background: 'var(--bg-primary)', borderRadius: 16, width: '100%', maxWidth: 800, padding: 32, border: '1px solid var(--border)', position: 'relative', margin: '0 auto' }}>
                            <button onClick={() => setEditingProject(null)} style={{ position: 'absolute', top: 24, right: 24, background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 24 }}>&times;</button>
                            <h2 style={{ fontSize: 24, fontWeight: 300, marginBottom: 24, color: 'var(--text-primary)' }}>Edit Project</h2>
                            
                            <form onSubmit={handleSaveProject} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Title</label>
                                    <input value={editingProject.title} onChange={e => setEditingProject({...editingProject, title: e.target.value})} className="w-full px-4 py-2.5 rounded-xl focus:outline-none" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }} />
                                </div>
                                <div className="space-y-2">
                                    <label style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Slug</label>
                                    <input value={editingProject.slug} onChange={e => setEditingProject({...editingProject, slug: e.target.value})} className="w-full px-4 py-2.5 rounded-xl focus:outline-none" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }} />
                                </div>
                                <div className="space-y-2">
                                    <label style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Category</label>
                                    <input value={editingProject.category} onChange={e => setEditingProject({...editingProject, category: e.target.value})} className="w-full px-4 py-2.5 rounded-xl focus:outline-none" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }} />
                                </div>
                                <div className="space-y-2">
                                    <label style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Author Name</label>
                                    <input value={editingProject.authorName} onChange={e => setEditingProject({...editingProject, authorName: e.target.value})} className="w-full px-4 py-2.5 rounded-xl focus:outline-none" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }} />
                                </div>
                                <div className="col-span-full space-y-2">
                                    <label style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Tags (comma separated)</label>
                                    <input value={editingProject.tags?.join(', ') || ''} onChange={e => setEditingProject({...editingProject, tags: e.target.value.split(',').map(t=>t.trim()).filter(Boolean)})} className="w-full px-4 py-2.5 rounded-xl focus:outline-none" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }} />
                                </div>
                                <div className="col-span-full space-y-2">
                                    <label style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Description</label>
                                    <textarea value={editingProject.description} onChange={e => setEditingProject({...editingProject, description: e.target.value})} rows={4} className="w-full px-4 py-2.5 rounded-xl focus:outline-none resize-none" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }} />
                                </div>

                                <div className="space-y-2">
                                    <label style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>GitHub URL</label>
                                    <input value={editingProject.github || ''} onChange={e => setEditingProject({...editingProject, github: e.target.value})} className="w-full px-4 py-2.5 rounded-xl focus:outline-none" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }} />
                                </div>
                                <div className="space-y-2">
                                    <label style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Live URL (External)</label>
                                    <input value={editingProject.external || ''} onChange={e => setEditingProject({...editingProject, external: e.target.value})} className="w-full px-4 py-2.5 rounded-xl focus:outline-none" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }} />
                                </div>

                                <div className="col-span-full flex items-center gap-4 py-2">
                                    <div className="flex items-center gap-2">
                                        <input 
                                            type="checkbox" 
                                            id="edit-featured" 
                                            checked={editingProject.featured}
                                            onChange={e => setEditingProject({...editingProject, featured: e.target.checked})}
                                            className="w-4 h-4 rounded" 
                                        />
                                        <label htmlFor="edit-featured" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Featured Project</label>
                                    </div>
                                </div>

                                <div className="col-span-full flex flex-col sm:flex-row justify-end gap-3 mt-4">
                                    <button type="button" disabled={isProcessing} onClick={() => setEditingProject(null)} style={{ padding: '12px 24px', background: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--border)', borderRadius: 8, cursor: isProcessing ? 'not-allowed' : 'pointer' }}>
                                        Cancel
                                    </button>
                                    <button type="submit" disabled={isProcessing} style={{ padding: '12px 24px', background: isProcessing ? 'var(--text-muted)' : 'var(--accent)', color: 'var(--bg-primary)', border: 'none', borderRadius: 8, cursor: isProcessing ? 'not-allowed' : 'pointer', fontWeight: 500 }}>
                                        {isProcessing ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>,
                document.body
            )}

            {activeTab === 'submissions' && (
                <div className="grid gap-4">
                    {submissions.length === 0 ? (
                        <div className="p-8 rounded-2xl text-center" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                            <p style={{ color: 'var(--text-secondary)' }}>No submissions.</p>
                        </div>
                    ) : (
                        submissions.map(sub => (
                            <div key={sub.id} className="p-6 rounded-2xl flex flex-col gap-4" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 style={{ color: 'var(--text-primary)', fontSize: 18, fontWeight: 500 }}>{sub.title}</h3>
                                        <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>By {sub.name} ({sub.email})</p>
                                    </div>
                                    <span style={{
                                        fontSize: 11,
                                        padding: '4px 12px',
                                        borderRadius: 999,
                                        background: sub.status === 'pending' ? 'rgba(234,179,8,0.15)' : sub.status === 'approved' ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)',
                                        color: sub.status === 'pending' ? '#facc15' : sub.status === 'approved' ? '#4ade80' : '#f87171',
                                    }}>
                                        {sub.status.toUpperCase()}
                                    </span>
                                </div>
                                <p className="mt-2 text-sm line-clamp-3" style={{ color: 'var(--text-muted)' }}>{sub.description}</p>
                                
                                <div className="flex gap-3 justify-end mt-2 border-t pt-4" style={{ borderColor: 'var(--border)' }}>
                                    <button 
                                        disabled={isProcessing}
                                        onClick={() => handleDeleteSubmission(sub.id)}
                                        className="px-4 py-2 rounded-xl text-sm font-medium transition-colors hover:bg-red-500/10 text-red-500 flex items-center gap-2"
                                        style={{ border: '1px solid rgba(239, 68, 68, 0.2)' }}
                                    >
                                        <Trash2 className="w-4 h-4" /> Delete
                                    </button>
                                    
                                    {sub.status === 'pending' && (
                                        <>
                                            <button 
                                                onClick={() => handleAction(sub.id, 'reject')}
                                                disabled={actioningId === sub.id}
                                                className="px-4 py-2 rounded-xl text-sm font-medium transition-colors hover:bg-white/10 flex items-center gap-2"
                                                style={{ color: 'var(--text-primary)', border: '1px solid var(--border)' }}
                                            >
                                                Reject
                                            </button>
                                            <button 
                                                onClick={() => handleAction(sub.id, 'approve')}
                                                disabled={actioningId === sub.id}
                                                className="px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2"
                                                style={{ background: 'var(--text-primary)', color: 'var(--bg-primary)' }}
                                            >
                                                {actioningId === sub.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Wand2 className="w-4 h-4" /> Review & AI Edit</>}
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {activeTab === 'contributors' && (
                <div className="grid gap-4">
                    {uniqueAuthors.map(author => (
                        <div key={author} className="p-6 rounded-2xl flex items-center justify-between" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                            <h3 style={{ color: 'var(--text-primary)', fontSize: 18, fontWeight: 500 }}>{author}</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
                                {projects.filter(p => p.authorName === author).length} project(s)
                            </p>
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
