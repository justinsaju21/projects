"use client";

import { useState } from "react";
import { Github, ExternalLink, Play, ChevronDown, ChevronUp } from "lucide-react";
import { Project } from "@/lib/sanity";
import Link from "next/link";

type Category = "all" | "vlsi" | "embedded" | "virtual-labs" | "web-apps" | "circuits";

const categories: { id: Category; label: string; color: string }[] = [
    { id: "all", label: "All Projects", color: "#a78bfa" },
    { id: "vlsi", label: "VLSI / Hybrid", color: "#ec4899" },
    { id: "embedded", label: "Embedded", color: "#22c55e" },
    { id: "virtual-labs", label: "Virtual Labs", color: "#06b6d4" },
    { id: "web-apps", label: "Web Apps", color: "#8b5cf6" },
    { id: "circuits", label: "Digital Circuits", color: "#f59e0b" },
];

const getCategoryColor = (category: string) => {
    const cat = categories.find((c) => c.id === category);
    return cat?.color || "#a78bfa";
};

interface Props {
    projects: Project[];
}

export default function ProjectsGrid({ projects }: Props) {
    const [activeCategory, setActiveCategory] = useState<Category>("all");
    const [showAll, setShowAll] = useState(false);

    const filteredProjects = projects.filter(
        (project) => activeCategory === "all" || project.category === activeCategory
    );

    const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 9);
    const hasMore = filteredProjects.length > 9;

    return (
        <main className="min-h-screen pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="heading-xl mb-4">
                        <span style={{ color: "var(--foreground)" }}>Projects </span>
                        <span className="text-gradient">Hub</span>
                    </h1>
                    <p className="body-lg" style={{ color: "var(--foreground-dim)", maxWidth: "600px", margin: "0 auto" }}>
                        A curated collection of {projects.length} experiments, demos, and live projects spanning VLSI, Embedded Systems, Virtual Labs, and Web Applications.
                    </p>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map((category) => {
                        const count = category.id === "all"
                            ? projects.length
                            : projects.filter((p) => p.category === category.id).length;

                        return (
                            <button
                                key={category.id}
                                onClick={() => {
                                    setActiveCategory(category.id);
                                    setShowAll(false);
                                }}
                                className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2"
                                style={{
                                    background: activeCategory === category.id
                                        ? `linear-gradient(135deg, ${category.color}, ${category.color}cc)`
                                        : "rgba(30, 27, 75, 0.6)",
                                    color: activeCategory === category.id ? "#030014" : "var(--foreground-muted)",
                                    border: activeCategory === category.id
                                        ? "none"
                                        : "1px solid var(--glass-border)",
                                }}
                            >
                                {category.label}
                                <span
                                    className="text-xs px-2 py-0.5 rounded-full"
                                    style={{
                                        background: activeCategory === category.id ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.3)",
                                    }}
                                >
                                    {count}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayedProjects.map((project) => (
                        <Link href={`/project/${project.slug}`} key={project._id} className="block group">
                            <div
                                className="glass-card rounded-2xl p-6 h-full hover:border-[var(--accent-cyan)]/50 transition-colors"
                            >
                                {/* Category & Author Badge */}
                                <div className="flex items-start justify-between mb-4">
                                    <span
                                        className="px-3 py-1 text-xs rounded-full border"
                                        style={{
                                            backgroundColor: `${getCategoryColor(project.category)}20`,
                                            color: getCategoryColor(project.category),
                                            borderColor: `${getCategoryColor(project.category)}40`,
                                        }}
                                    >
                                        {project.category.replace("-", " ").toUpperCase()}
                                    </span>
                                    {project.author && (
                                        <span className="text-xs text-[var(--foreground-dim)] bg-white/5 px-2 py-1 rounded-full border border-white/10">
                                            by {project.author}
                                        </span>
                                    )}
                                </div>

                                {/* Content */}
                                <h3
                                    className="text-xl font-bold mb-3 group-hover:text-[var(--accent-cyan)] transition-colors"
                                    style={{ color: "var(--foreground)" }}
                                >
                                    {project.title}
                                </h3>
                                <p
                                    className="text-sm mb-4 line-clamp-3"
                                    style={{ color: "var(--foreground-muted)" }}
                                >
                                    {project.description}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tags?.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-2 py-1 text-xs rounded"
                                            style={{
                                                background: "rgba(0,0,0,0.3)",
                                                color: "var(--foreground-dim)",
                                                border: "1px solid var(--glass-border)",
                                            }}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Links */}
                                <div className="flex items-center gap-3">
                                    {project.github && (
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 rounded-lg transition-all hover:scale-110"
                                            style={{
                                                background: "rgba(0,0,0,0.3)",
                                                border: "1px solid var(--glass-border)",
                                                color: "var(--foreground-muted)",
                                            }}
                                            title="View on GitHub"
                                        >
                                            <Github className="w-5 h-5" />
                                        </a>
                                    )}
                                    {project.streamlit && (
                                        <a
                                            href={project.streamlit}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 rounded-lg transition-all hover:scale-110"
                                            style={{
                                                background: "rgba(0,0,0,0.3)",
                                                border: "1px solid var(--glass-border)",
                                                color: "#ef4444",
                                            }}
                                            title="View Live Demo"
                                        >
                                            <Play className="w-5 h-5" />
                                        </a>
                                    )}
                                    {project.tinkercad && (
                                        <a
                                            href={project.tinkercad}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 rounded-lg transition-all hover:scale-110"
                                            style={{
                                                background: "rgba(0,0,0,0.3)",
                                                border: "1px solid var(--glass-border)",
                                                color: "#f97316",
                                            }}
                                            title="View on TinkerCAD"
                                        >
                                            <ExternalLink className="w-5 h-5" />
                                        </a>
                                    )}
                                    {project.external && (
                                        <a
                                            href={project.external}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 rounded-lg transition-all hover:scale-110"
                                            style={{
                                                background: "rgba(0,0,0,0.3)",
                                                border: "1px solid var(--glass-border)",
                                                color: "#8b5cf6",
                                            }}
                                            title="View Documentation"
                                        >
                                            <ExternalLink className="w-5 h-5" />
                                        </a>
                                    )}
                                </div>
                            </div>
                    ))}
                        </div>

                {/* Show More/Less Button */ }
    {
                            hasMore && (
                            <div className="text-center mt-12">
                                <button
                                    onClick={() => setShowAll(!showAll)}
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full transition-all hover:scale-105"
                                    style={{
                                        border: "1px solid var(--glass-border)",
                                        color: "var(--foreground-muted)",
                                        background: "transparent",
                                    }}
                                >
                                    {showAll ? (
                                        <>Show Less <ChevronUp className="w-4 h-4" /></>
                                    ) : (
                                        <>Show All {filteredProjects.length} Projects <ChevronDown className="w-4 h-4" /></>
                                    )}
                                </button>
                            </div>
                        )
    }

                    {/* Footer */}
                    <footer className="text-center mt-20 pt-10" style={{ borderTop: "1px solid var(--glass-border)" }}>
                        <p style={{ color: "var(--foreground-dim)" }}>
                            Part of the{" "}
                            <a
                                href="https://justinsaju.me"
                                className="hover:underline"
                                style={{ color: "var(--accent-cyan)" }}
                            >
                                Justin Saju Ecosystem
                            </a>
                        </p>
                    </footer>
                </div >
        </main >
    );
}
