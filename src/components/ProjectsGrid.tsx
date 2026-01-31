"use client";

import { useState } from "react";
import { Github, ExternalLink, Play, ChevronDown, ChevronUp, Sparkles, Code2, Cpu, Globe, ArrowRight } from "lucide-react";
import { Project } from "@/lib/sanity";
import Link from "next/link";

type Category = "all" | "vlsi" | "embedded" | "virtual-labs" | "web-apps" | "circuits";

const categories: { id: Category; label: string; color: string; icon: React.ReactNode }[] = [
    { id: "all", label: "All Projects", color: "#a78bfa", icon: <Sparkles className="w-4 h-4" /> },
    { id: "vlsi", label: "VLSI / Hybrid", color: "#ec4899", icon: <Cpu className="w-4 h-4" /> },
    { id: "embedded", label: "Embedded", color: "#22c55e", icon: <Cpu className="w-4 h-4" /> },
    { id: "virtual-labs", label: "Virtual Labs", color: "#06b6d4", icon: <Globe className="w-4 h-4" /> },
    { id: "web-apps", label: "Web Apps", color: "#8b5cf6", icon: <Code2 className="w-4 h-4" /> },
    { id: "circuits", label: "Digital Circuits", color: "#f59e0b", icon: <Cpu className="w-4 h-4" /> },
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

    // Stats for hero section
    const stats = [
        { label: "Projects", value: projects.length },
        { label: "Categories", value: categories.length - 1 },
        { label: "Live Demos", value: projects.filter(p => p.streamlit || p.external).length },
    ];

    return (
        <main className="min-h-screen relative overflow-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-purple-500/20 to-pink-500/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-500/15 to-blue-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-violet-500/5 to-transparent rounded-full" />
            </div>

            {/* Hero Section */}
            <section className="pt-32 pb-16 px-6 relative z-10">
                <div className="max-w-5xl mx-auto text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 mb-8">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        <span className="text-sm font-medium text-purple-300">Open Source Projects</span>
                    </div>

                    {/* Title */}
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                        <span className="text-white">Projects </span>
                        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">Hub</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
                        A curated collection of experiments, demos, and live projects spanning
                        <span className="text-purple-400"> VLSI</span>,
                        <span className="text-green-400"> Embedded Systems</span>,
                        <span className="text-cyan-400"> Virtual Labs</span>, and
                        <span className="text-violet-400"> Web Applications</span>.
                    </p>

                    {/* Stats */}
                    <div className="flex justify-center gap-8 md:gap-16">
                        {stats.map((stat, i) => (
                            <div key={i} className="text-center">
                                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Category Filter */}
            <section className="px-6 pb-12 relative z-10">
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-wrap justify-center gap-3">
                        {categories.map((category) => {
                            const count = category.id === "all"
                                ? projects.length
                                : projects.filter((p) => p.category === category.id).length;
                            const isActive = activeCategory === category.id;

                            return (
                                <button
                                    key={category.id}
                                    onClick={() => {
                                        setActiveCategory(category.id);
                                        setShowAll(false);
                                    }}
                                    className="group relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2"
                                    style={{
                                        background: isActive
                                            ? `linear-gradient(135deg, ${category.color}20, ${category.color}10)`
                                            : "rgba(255,255,255,0.03)",
                                        border: isActive
                                            ? `1px solid ${category.color}50`
                                            : "1px solid rgba(255,255,255,0.08)",
                                        color: isActive ? category.color : "rgba(255,255,255,0.6)",
                                    }}
                                >
                                    <span className="transition-transform duration-300 group-hover:scale-110">
                                        {category.icon}
                                    </span>
                                    {category.label}
                                    <span
                                        className="text-xs px-2 py-0.5 rounded-full"
                                        style={{
                                            background: isActive ? `${category.color}30` : "rgba(255,255,255,0.05)",
                                            color: isActive ? category.color : "rgba(255,255,255,0.4)",
                                        }}
                                    >
                                        {count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="px-6 pb-20 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {displayedProjects.map((project, index) => {
                            const categoryColor = getCategoryColor(project.category);

                            return (
                                <Link
                                    href={`/project/${project.slug}`}
                                    key={project._id}
                                    className="group block"
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    <article
                                        className="relative h-full rounded-2xl p-[1px] overflow-hidden transition-all duration-500 hover:scale-[1.02]"
                                        style={{
                                            background: `linear-gradient(135deg, ${categoryColor}20, transparent 50%, ${categoryColor}10)`,
                                        }}
                                    >
                                        {/* Animated border glow on hover */}
                                        <div
                                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                                            style={{
                                                background: `linear-gradient(135deg, ${categoryColor}40, transparent, ${categoryColor}20)`,
                                            }}
                                        />

                                        {/* Card content */}
                                        <div className="relative h-full rounded-2xl bg-[#0a0a1a]/90 backdrop-blur-xl p-6 flex flex-col">
                                            {/* Top Row: Category + Author */}
                                            <div className="flex items-start justify-between mb-4">
                                                <span
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-300"
                                                    style={{
                                                        background: `${categoryColor}15`,
                                                        color: categoryColor,
                                                        border: `1px solid ${categoryColor}30`,
                                                    }}
                                                >
                                                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: categoryColor }} />
                                                    {project.category.replace("-", " ").toUpperCase()}
                                                </span>
                                                {project.author && (
                                                    <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded-md">
                                                        {project.author}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Title */}
                                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
                                                {project.title}
                                            </h3>

                                            {/* Description */}
                                            <p className="text-sm text-gray-400 mb-4 line-clamp-2 flex-grow">
                                                {project.description}
                                            </p>

                                            {/* Tags */}
                                            <div className="flex flex-wrap gap-2 mb-5">
                                                {project.tags?.slice(0, 3).map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="px-2 py-1 text-xs rounded-md bg-white/5 text-gray-400 border border-white/5"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                                {project.tags?.length > 3 && (
                                                    <span className="px-2 py-1 text-xs rounded-md bg-white/5 text-gray-500">
                                                        +{project.tags.length - 3}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Footer: Links + Read More */}
                                            <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                                <div className="flex items-center gap-2">
                                                    {project.github && (
                                                        <a
                                                            href={project.github}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all hover:scale-110"
                                                            title="GitHub"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            <Github className="w-4 h-4 text-gray-400" />
                                                        </a>
                                                    )}
                                                    {project.streamlit && (
                                                        <a
                                                            href={project.streamlit}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-all hover:scale-110"
                                                            title="Live Demo"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            <Play className="w-4 h-4 text-red-400" />
                                                        </a>
                                                    )}
                                                    {project.tinkercad && (
                                                        <a
                                                            href={project.tinkercad}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="p-2 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 transition-all hover:scale-110"
                                                            title="TinkerCAD"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            <ExternalLink className="w-4 h-4 text-orange-400" />
                                                        </a>
                                                    )}
                                                    {project.external && (
                                                        <a
                                                            href={project.external}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="p-2 rounded-lg bg-violet-500/10 hover:bg-violet-500/20 transition-all hover:scale-110"
                                                            title="External"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            <ExternalLink className="w-4 h-4 text-violet-400" />
                                                        </a>
                                                    )}
                                                </div>

                                                <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-500 group-hover:text-white transition-colors">
                                                    Read more
                                                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                                </span>
                                            </div>
                                        </div>
                                    </article>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Show More/Less Button */}
                    {hasMore && (
                        <div className="text-center mt-16">
                            <button
                                onClick={() => setShowAll(!showAll)}
                                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-105"
                            >
                                <span className="text-white font-medium">
                                    {showAll ? "Show Less" : `Show All ${filteredProjects.length} Projects`}
                                </span>
                                {showAll ? (
                                    <ChevronUp className="w-5 h-5 text-purple-400 group-hover:-translate-y-1 transition-transform" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-purple-400 group-hover:translate-y-1 transition-transform" />
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 px-6 pb-12">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col items-center justify-center gap-4 pt-8 border-t border-white/5">
                        <p className="text-sm text-gray-500">
                            Part of the{" "}
                            <a
                                href="https://justinsaju.me"
                                className="text-purple-400 hover:text-purple-300 transition-colors font-medium"
                            >
                                Justin Saju Ecosystem
                            </a>
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="https://github.com/justinsaju21" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
                                <Github className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    );
}
