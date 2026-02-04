"use client";

import { useState, useMemo } from "react";
import { Github, ExternalLink, Play, ChevronDown, ChevronUp, Sparkles, Code2, Cpu, Globe, ArrowRight, Search, Filter, SortAsc, Calendar, User } from "lucide-react";
import { Project } from "@/lib/sanity";
import Link from "next/link";
import { client } from "@/lib/sanity";
import imageUrlBuilder from "@sanity/image-url";
import { AdBanner } from "./AdBanner";

const builder = imageUrlBuilder(client);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function urlFor(source: any) {
    return builder.image(source);
}

type Category = "all" | "vlsi" | "embedded" | "virtual-labs" | "web-apps" | "circuits";
type SortOption = "newest" | "oldest" | "alpha";

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
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState<SortOption>("newest");
    const [selectedAuthor, setSelectedAuthor] = useState<string>("all");
    const [showAll, setShowAll] = useState(false);

    // Extract unique authors
    const uniqueAuthors = useMemo(() => {
        const authors = new Map();
        projects.forEach(p => {
            p.authors?.forEach(a => {
                if (!authors.has(a._id)) {
                    authors.set(a._id, a.name);
                }
            });
        });
        return Array.from(authors.entries()).map(([id, name]) => ({ id, name }));
    }, [projects]);

    const filteredProjects = useMemo(() => {
        let result = projects;

        // 1. Filter by Category
        if (activeCategory !== "all") {
            result = result.filter((p) => p.category === activeCategory);
        }

        // 2. Filter by Search
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter((p) =>
                p.title.toLowerCase().includes(query) ||
                p.description.toLowerCase().includes(query) ||
                p.tags?.some(t => t.toLowerCase().includes(query))
            );
        }

        // 3. Filter by Author
        if (selectedAuthor !== "all") {
            result = result.filter(p => p.authors?.some(a => a._id === selectedAuthor));
        }

        // 4. Sort
        return [...result].sort((a, b) => {
            if (sortBy === "alpha") return a.title.localeCompare(b.title);
            // Assuming projects come in roughly chronological order or have a date field.
            // If no date, relies on Sanity's default order (often updated/created) or the 'order' field if used.
            // Using implicit order from props as "newest" (if fetched that way)
            // Ideally projects have a 'date' or 'publishedAt' field. Fallback to list index.
            // Since Sanity fetch orders by 'order asc' or 'date desc', we assume input is 'newest'.
            // For proper sorting without date field, we might need to rely on index order reversing.
            // Let's use the list index as a proxy if explicit date is missing.
            const indexA = projects.indexOf(a);
            const indexB = projects.indexOf(b);

            if (sortBy === "oldest") return indexB - indexA; // Reverse logic: actually, original list is likely Newest or custom Order. 
            // If input is Newest -> Oldest:
            // Newest (default): Keep order (if input is sorted)
            // Oldest: Reverse order

            // Let's assume input is "Newest/Custom Priority".
            if (sortBy === "newest") return 0; // Keep current sort (from Sanity query)
            if (sortBy === "oldest") return 1; // Reverse (simplified, implies reverse mapping needs robust logic if sort changes frequently)

            return 0;
        });

    }, [projects, activeCategory, searchQuery, sortBy, selectedAuthor]);

    const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 9);
    const hasMore = filteredProjects.length > 9;

    // Stats
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
            <section className="pt-32 pb-12 px-6 relative z-10">
                <div className="max-w-5xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 mb-8">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        <span className="text-sm font-medium text-purple-300">Open Source Projects</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                        <span className="text-[var(--foreground)]">Projects </span>
                        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">Hub</span>
                    </h1>
                    <p className="text-lg md:text-xl text-[var(--foreground-dim)] max-w-2xl mx-auto mb-12 leading-relaxed">
                        A curated collection of experiments, demos, and live projects.
                    </p>
                    <div className="flex justify-center gap-8 md:gap-16">
                        {stats.map((stat, i) => (
                            <div key={i} className="text-center">
                                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-b from-[var(--foreground)] to-[var(--foreground-muted)] bg-clip-text text-transparent">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-[var(--foreground-muted)] mt-1">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Controls Section */}
            <section className="px-6 pb-8 relative z-10 sticky top-20 bg-[var(--background)]/80 backdrop-blur-xl py-4 border-y border-[var(--glass-border)] shadow-2xl z-40">
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Top Row: Search & Filters */}
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        {/* Search */}
                        <div className="relative w-full md:max-w-md group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--foreground-muted)] group-focus-within:text-purple-400 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search projects..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl py-2.5 pl-10 pr-4 text-sm text-[var(--foreground)] placeholder:text-[var(--foreground-muted)] focus:outline-none focus:border-purple-500/50 focus:bg-[var(--glass-bg)] transition-all"
                            />
                        </div>

                        {/* Dropdowns */}
                        <div className="flex gap-3 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
                            {/* Author Select */}
                            <div className="relative min-w-[140px]">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--foreground-muted)]" />
                                <select
                                    value={selectedAuthor}
                                    onChange={(e) => setSelectedAuthor(e.target.value)}
                                    className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl py-2.5 pl-10 pr-8 text-sm text-[var(--foreground)] appearance-none focus:outline-none focus:border-purple-500/50 cursor-pointer hover:bg-[var(--glass-bg)] transition-colors"
                                >
                                    <option value="all" className="bg-[var(--background)] text-[var(--foreground)]">All Authors</option>
                                    {uniqueAuthors.map(a => (
                                        <option key={a.id} value={a.id} className="bg-[var(--background)] text-[var(--foreground)]">{a.name}</option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-[var(--foreground-muted)] pointer-events-none" />
                            </div>

                            {/* Sort Select */}
                            <div className="relative min-w-[140px]">
                                <SortAsc className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--foreground-muted)]" />
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                                    className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl py-2.5 pl-10 pr-8 text-sm text-[var(--foreground)] appearance-none focus:outline-none focus:border-purple-500/50 cursor-pointer hover:bg-[var(--glass-bg)] transition-colors"
                                >
                                    <option value="newest" className="bg-[var(--background)] text-[var(--foreground)]">Newest First</option>
                                    <option value="oldest" className="bg-[var(--background)] text-[var(--foreground)]">Oldest First</option>
                                    <option value="alpha" className="bg-[var(--background)] text-[var(--foreground)]">Name (A-Z)</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-[var(--foreground-muted)] pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* Category Tabs */}
                    <div className="flex flex-wrap justify-center gap-2">
                        {categories.map((category) => {
                            const isActive = activeCategory === category.id;
                            return (
                                <button
                                    key={category.id}
                                    onClick={() => {
                                        setActiveCategory(category.id);
                                        setShowAll(false);
                                    }}
                                    className={`px-4 py-2 rounded-lg text-xs font-medium transition-all duration-300 flex items-center gap-2 border ${isActive
                                        ? `bg-[${category.color}]/10 border-[${category.color}]/30 text-[${category.color}]`
                                        : "bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                                        }`}
                                    style={{
                                        borderColor: isActive ? `${category.color}50` : undefined,
                                        color: isActive ? category.color : undefined,
                                        backgroundColor: isActive ? `${category.color}10` : undefined
                                    }}
                                >
                                    {category.icon}
                                    {category.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="px-6 pb-20 relative z-10 pt-8">
                <div className="max-w-7xl mx-auto">
                    {/* Top Ad (Consistent with Gateway/Blog) */}
                    <AdBanner slot="projects-grid-top" className="mb-12" />

                    {displayedProjects.length > 0 ? (
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
                                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                                                style={{ background: `linear-gradient(135deg, ${categoryColor}40, transparent, ${categoryColor}20)` }}
                                            />
                                            <div className="relative h-full rounded-2xl glass p-6 flex flex-col border border-[var(--glass-border)]">
                                                {/* Header */}
                                                <div className="flex items-start justify-between mb-4">
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg"
                                                        style={{ background: `${categoryColor}15`, color: categoryColor, border: `1px solid ${categoryColor}30` }}>
                                                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: categoryColor }} />
                                                        {project.category.replace("-", " ").toUpperCase()}
                                                    </span>
                                                    {project.authors && project.authors.length > 0 && (
                                                        <div className="flex -space-x-2">
                                                            {project.authors.map((author) => (
                                                                <div key={author._id} className="relative group/author">
                                                                    <span className="flex items-center justify-center w-6 h-6 text-[10px] text-[var(--foreground-muted)] bg-[var(--glass-bg)] rounded-full border border-[var(--glass-border)] overflow-hidden">
                                                                        {author.image ? (
                                                                            // eslint-disable-next-line @next/next/no-img-element
                                                                            <img
                                                                                src={urlFor(author.image).width(48).height(48).url()}
                                                                                alt={author.name}
                                                                                className="w-full h-full object-cover"
                                                                                onError={(e) => {
                                                                                    e.currentTarget.style.display = 'none';
                                                                                    if (e.currentTarget.parentElement) {
                                                                                        e.currentTarget.parentElement.innerText = author.name.substring(0, 2).toUpperCase();
                                                                                    }
                                                                                }}
                                                                            />
                                                                        ) : (
                                                                            author.name.substring(0, 2).toUpperCase()
                                                                        )}
                                                                    </span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>

                                                <h3 className="text-xl font-bold text-[var(--foreground)] mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[var(--foreground)] group-hover:to-[var(--foreground-muted)] group-hover:bg-clip-text transition-all duration-300">
                                                    {project.title}
                                                </h3>
                                                <p className="text-sm text-[var(--foreground-dim)] mb-4 line-clamp-2 flex-grow">
                                                    {project.description}
                                                </p>

                                                {/* Tags */}
                                                <div className="flex flex-wrap gap-2 mb-5">
                                                    {project.tags?.slice(0, 3).map((tag) => (
                                                        <span key={tag} className="px-2 py-1 text-xs rounded-md bg-[var(--glass-bg)] text-[var(--foreground-muted)] border border-[var(--glass-border)]">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                    {project.tags?.length > 3 && (
                                                        <span className="px-2 py-1 text-xs rounded-md bg-[var(--glass-bg)] text-[var(--foreground-dim)] border border-[var(--glass-border)]">+{project.tags.length - 3}</span>
                                                    )}
                                                </div>

                                                {/* Footer */}
                                                <div className="flex items-center justify-between pt-4 border-t border-[var(--glass-border)]">
                                                    <div className="flex items-center gap-2">
                                                        {project.github && (
                                                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-[var(--glass-bg)] hover:bg-[var(--glass-border)] transition-all hover:scale-110" onClick={(e) => e.stopPropagation()}>
                                                                <Github className="w-4 h-4 text-[var(--foreground-dim)]" />
                                                            </a>
                                                        )}
                                                        {project.streamlit && (
                                                            <a href={project.streamlit} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-all hover:scale-110" onClick={(e) => e.stopPropagation()}>
                                                                <Play className="w-4 h-4 text-red-400" />
                                                            </a>
                                                        )}
                                                        {project.tinkercad && (
                                                            <a href={project.tinkercad} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 transition-all hover:scale-110" onClick={(e) => e.stopPropagation()}>
                                                                <ExternalLink className="w-4 h-4 text-orange-400" />
                                                            </a>
                                                        )}
                                                        {project.external && (
                                                            <a href={project.external} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-violet-500/10 hover:bg-violet-500/20 transition-all hover:scale-110" onClick={(e) => e.stopPropagation()}>
                                                                <ExternalLink className="w-4 h-4 text-violet-400" />
                                                            </a>
                                                        )}
                                                    </div>
                                                    <span className="inline-flex items-center gap-1 text-xs font-medium text-[var(--foreground-dim)] group-hover:text-[var(--foreground)] transition-colors">
                                                        Read more <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                                    </span>
                                                </div>
                                            </div>
                                        </article>
                                    </Link>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] mb-4">
                                <Search className="w-8 h-8 text-[var(--foreground-muted)]" />
                            </div>
                            <h3 className="text-xl font-medium text-[var(--foreground)] mb-2">No projects found</h3>
                            <p className="text-[var(--foreground-muted)]">Try adjusting your search or filters.</p>
                        </div>
                    )}

                    {hasMore && (
                        <div className="text-center mt-16">
                            <button
                                onClick={() => setShowAll(!showAll)}
                                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-105"
                            >
                                <span className="text-[var(--foreground)] font-medium">
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

                    {/* Bottom Ad */}
                    <AdBanner slot="projects-grid-bottom" className="mt-20" />
                </div>
            </section>
        </main>
    );
}
