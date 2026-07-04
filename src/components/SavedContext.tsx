"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface SavedContextType {
    savedProjectSlugs: string[];
    toggleSaved: (slug: string) => void;
    isSaved: (slug: string) => boolean;
}

const SavedContext = createContext<SavedContextType | undefined>(undefined);

export function SavedProvider({ children }: { children: React.ReactNode }) {
    const [savedProjectSlugs, setSavedProjectSlugs] = useState<string[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem('echo_projects_saved_slugs');
        if (stored) {
            try {
                setSavedProjectSlugs(JSON.parse(stored));
            } catch (e) {
                console.error('Failed to parse saved projects from localStorage', e);
            }
        }
    }, []);

    const toggleSaved = (slug: string) => {
        setSavedProjectSlugs(prev => {
            const isCurrentlySaved = prev.includes(slug);
            const next = isCurrentlySaved 
                ? prev.filter(s => s !== slug)
                : [...prev, slug];
            
            localStorage.setItem('echo_projects_saved_slugs', JSON.stringify(next));
            return next;
        });
    };

    const isSaved = (slug: string) => savedProjectSlugs.includes(slug);

    return (
        <SavedContext.Provider value={{ savedProjectSlugs, toggleSaved, isSaved }}>
            {children}
        </SavedContext.Provider>
    );
}

export function useSaved() {
    const context = useContext(SavedContext);
    if (context === undefined) {
        throw new Error('useSaved must be used within a SavedProvider');
    }
    return context;
}
