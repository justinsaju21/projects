import { getProjectBySlug } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { ArrowLeft, Github, Globe, ExternalLink, Cpu, Calendar, User, Tag, Sparkles } from "lucide-react";
import { notFound } from "next/navigation";

// Define category colors (matching ProjectsGrid)
const getCategoryColor = (category: string) => {
    switch (category) {
        case "vlsi": return "#ec4899";
        case "embedded": return "#22c55e";
        case "virtual-labs": return "#06b6d4";
        case "web-apps": return "#8b5cf6";
        case "circuits": return "#f59e0b";
        default: return "#a78bfa";
    }
};

// Custom components for PortableText rendering
const portableTextComponents = {
    block: {
        h1: ({ children }: { children: React.ReactNode }) => (
            <h1 className="text-3xl md:text-4xl font-bold text-white mt-12 mb-6 first:mt-0">{children}</h1>
        ),
        h2: ({ children }: { children: React.ReactNode }) => (
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-10 mb-5 flex items-center gap-3">
                <span className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full" />
                {children}
            </h2>
        ),
        h3: ({ children }: { children: React.ReactNode }) => (
            <h3 className="text-xl md:text-2xl font-semibold text-white mt-8 mb-4">{children}</h3>
        ),
        normal: ({ children }: { children: React.ReactNode }) => (
            <p className="text-gray-300 leading-relaxed mb-6">{children}</p>
        ),
    },
    list: {
        bullet: ({ children }: { children: React.ReactNode }) => (
            <ul className="space-y-3 mb-6 ml-4">{children}</ul>
        ),
        number: ({ children }: { children: React.ReactNode }) => (
            <ol className="space-y-3 mb-6 ml-4 list-decimal">{children}</ol>
        ),
    },
    listItem: {
        bullet: ({ children }: { children: React.ReactNode }) => (
            <li className="flex items-start gap-3 text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2.5 flex-shrink-0" />
                <span>{children}</span>
            </li>
        ),
        number: ({ children }: { children: React.ReactNode }) => (
            <li className="text-gray-300 ml-4">{children}</li>
        ),
    },
    marks: {
        strong: ({ children }: { children: React.ReactNode }) => (
            <strong className="font-semibold text-white">{children}</strong>
        ),
        code: ({ children }: { children: React.ReactNode }) => (
            <code className="px-2 py-1 rounded bg-purple-500/20 text-purple-300 font-mono text-sm">{children}</code>
        ),
        link: ({ children, value }: { children: React.ReactNode; value: { href: string } }) => (
            <a href={value.href} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 underline underline-offset-4 transition-colors">
                {children}
            </a>
        ),
    },
};

export default async function ProjectPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const project = await getProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    const categoryColor = getCategoryColor(project.category);

    return (
        <main className="min-h-screen relative overflow-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0 pointer-events-none">
                <div
                    className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[150px] opacity-30"
                    style={{ background: `radial-gradient(circle, ${categoryColor}, transparent)` }}
                />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-purple-500/20 to-transparent rounded-full blur-[120px]" />
            </div>

            {/* Content */}
            <div className="relative z-10 pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto">
                    {/* Back Link */}
                    <Link
                        href="/"
                        className="group inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-10"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span>Back to Projects</span>
                    </Link>

                    {/* Hero Section */}
                    <header className="mb-16">
                        {/* Category Badge */}
                        <div className="flex flex-wrap items-center gap-3 mb-6">
                            <span
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold"
                                style={{
                                    background: `${categoryColor}15`,
                                    color: categoryColor,
                                    border: `1px solid ${categoryColor}30`,
                                }}
                            >
                                <span className="w-2 h-2 rounded-full" style={{ background: categoryColor }} />
                                {project.category.replace("-", " ").toUpperCase()}
                            </span>
                            {project.author && (
                                <span className="inline-flex items-center gap-2 text-sm text-gray-400 bg-white/5 px-3 py-2 rounded-lg border border-white/10">
                                    <User className="w-4 h-4" />
                                    {project.author}
                                </span>
                            )}
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                            <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                                {project.title}
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="text-xl text-gray-400 leading-relaxed mb-8">{project.description}</p>

                        {/* Tags */}
                        <div className="flex flex-wrap items-center gap-2 mb-8">
                            <Tag className="w-4 h-4 text-gray-500" />
                            {project.tags?.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 text-sm rounded-full bg-white/5 text-gray-400 border border-white/5"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-4">
                            {project.github && (
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                                >
                                    <Github className="w-5 h-5 text-gray-300" />
                                    <span className="font-medium text-white">View Source</span>
                                </a>
                            )}
                            {project.streamlit && (
                                <a
                                    href={project.streamlit}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/20 hover:border-red-500/40 transition-all duration-300"
                                >
                                    <Globe className="w-5 h-5 text-red-400" />
                                    <span className="font-medium text-red-400">Streamlit App</span>
                                </a>
                            )}
                            {project.tinkercad && (
                                <a
                                    href={project.tinkercad}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300"
                                >
                                    <Cpu className="w-5 h-5 text-blue-400" />
                                    <span className="font-medium text-blue-400">TinkerCAD</span>
                                </a>
                            )}
                            {project.external && (
                                <a
                                    href={project.external}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-500/10 to-violet-500/10 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
                                >
                                    <ExternalLink className="w-5 h-5 text-purple-400" />
                                    <span className="font-medium text-purple-400">Live Demo</span>
                                </a>
                            )}
                        </div>
                    </header>

                    {/* Divider */}
                    <div className="relative mb-16">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/10" />
                        </div>
                        <div className="relative flex justify-center">
                            <span className="px-4 py-2 bg-[#030014] text-gray-500 text-sm flex items-center gap-2">
                                <Sparkles className="w-4 h-4" />
                                Project Details
                            </span>
                        </div>
                    </div>

                    {/* Content Body */}
                    <article className="prose-custom">
                        {project.body ? (
                            <PortableText value={project.body} components={portableTextComponents} />
                        ) : (
                            <div className="p-12 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent text-center">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-500/10 flex items-center justify-center">
                                    <Sparkles className="w-8 h-8 text-purple-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">Documentation Coming Soon</h3>
                                <p className="text-gray-400">
                                    Detailed documentation is being prepared for this project.
                                </p>
                            </div>
                        )}
                    </article>

                    {/* Bottom Navigation */}
                    <div className="mt-20 pt-10 border-t border-white/10">
                        <Link
                            href="/"
                            className="group inline-flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" />
                            <span className="text-lg">Back to All Projects</span>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
