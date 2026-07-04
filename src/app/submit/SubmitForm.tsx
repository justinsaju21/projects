"use client";

import { useState } from "react";
import { Loader2, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export function SubmitForm() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        title: '',
        description: '',
        keywords: '',
        github: '',
        external: '',
        image: ''
    });

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError(null);
        
        try {
            const res = await fetch("/api/submit", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            
            if (!res.ok) throw new Error(data.error || "Submission failed");
            
            setSuccess(true);
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : 'Submission failed';
            setError(msg);
        } finally {
            setLoading(false);
        }
    }

    if (success) {
        return (
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16 p-8 rounded-2xl"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
            >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6" style={{ background: 'var(--bg-tertiary)' }}>
                    <CheckCircle className="w-8 h-8" style={{ color: 'var(--text-primary)' }} />
                </div>
                <h3 className="text-2xl mb-4" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--text-primary)' }}>Submission Received</h3>
                <p style={{ color: 'var(--text-secondary)' }} className="mb-8 max-w-md mx-auto">
                    Thank you for submitting your project. I will review it and publish it to the hub!
                </p>
                <button 
                    onClick={() => {
                        setSuccess(false);
                        setFormData({ name: '', email: '', title: '', description: '', keywords: '', github: '', external: '', image: '' });
                    }}
                    className="px-6 py-2.5 rounded-xl transition-all hover:scale-105"
                    style={{ background: 'var(--text-primary)', color: 'var(--bg-primary)', fontWeight: 500 }}
                >
                    Submit Another
                </button>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 p-8 rounded-2xl relative" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            <div className="flex justify-between items-center mb-6">
                <h2 style={{ color: 'var(--text-primary)', fontSize: 20, fontFamily: "'Playfair Display', serif" }}>Project Details</h2>
            </div>

            {error && (
                <div className="p-4 rounded-xl text-red-500 bg-red-500/10 border border-red-500/20 text-sm">
                    {error}
                </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Your Name</label>
                    <input 
                        type="text" 
                        required 
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl focus:outline-none transition-colors"
                        style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                    />
                </div>
                
                <div className="space-y-2">
                    <label style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Email Address</label>
                    <input 
                        type="email" 
                        required 
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl focus:outline-none transition-colors"
                        style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Project Title</label>
                <input 
                    type="text" 
                    required 
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl focus:outline-none transition-colors"
                    style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                />
            </div>

            <div className="space-y-2">
                <label style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Category/Keywords (comma separated)</label>
                <input 
                    type="text" 
                    value={formData.keywords}
                    onChange={e => setFormData({...formData, keywords: e.target.value})}
                    placeholder="e.g. Next.js, Python, Automation"
                    className="w-full px-4 py-2.5 rounded-xl focus:outline-none transition-colors"
                    style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                />
            </div>

            <div className="space-y-2">
                <label style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Project Description</label>
                <textarea 
                    required 
                    rows={4}
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl focus:outline-none transition-colors"
                    style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>GitHub URL (Optional)</label>
                    <input 
                        type="url" 
                        value={formData.github}
                        onChange={e => setFormData({...formData, github: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl focus:outline-none transition-colors"
                        style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                    />
                </div>
                <div className="space-y-2">
                    <label style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Live/Deployment URL (Optional)</label>
                    <input 
                        type="url" 
                        value={formData.external}
                        onChange={e => setFormData({...formData, external: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl focus:outline-none transition-colors"
                        style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Cover Image URL (Optional)</label>
                <input 
                    type="text" 
                    placeholder="Paste a Google Drive or other image URL here"
                    value={formData.image}
                    onChange={e => setFormData({...formData, image: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl focus:outline-none transition-colors"
                    style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                />
            </div>

            <button 
                type="submit" 
                disabled={loading}
                className="w-full py-3.5 rounded-xl font-medium transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                style={{ background: 'var(--text-primary)', color: 'var(--bg-primary)' }}
            >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Submit Project"}
            </button>
        </form>
    );
}
