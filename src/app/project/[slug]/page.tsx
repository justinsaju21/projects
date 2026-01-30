import { getProjectBySlug } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { ArrowLeft, Github, Globe, ExternalLink, Cpu } from "lucide-react";
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
        <main className="min-h-screen pt-32 pb-20 px-6 relative overflow-hidden">
            {/* Background blobs similar to layout/global */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary-purple/20 rounded-full blur-[120px] mix-blend-screen animate-blob" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-accent-cyan/20 rounded-full blur-[120px] mix-blend-screen animate-blob" />
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Back Link */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-foreground-dim hover:text-accent-cyan transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Projects
                </Link>

                {/* Header Section */}
                <div className="mb-12">
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                        <span
                            className="px-3 py-1 rounded-full text-xs font-medium border"
                            style={{
                                backgroundColor: `${categoryColor}15`,
                                color: categoryColor,
                                borderColor: `${categoryColor}30`
                            }}
                        >
                            {project.category.replace("-", " ").toUpperCase()}
                        </span>
                        {project.author && (
                            <span className="text-xs text-foreground-dim border border-white/10 px-3 py-1 rounded-full bg-white/5">
                                by {project.author}
                            </span>
                        )}
                        <span className="text-xs text-foreground-dim">
                            {project.tags.join(" • ")}
                        </span>
                    </div>

                    <h1 className="heading-xl mb-6 text-gradient">{project.title}</h1>
                    <p className="body-lg text-foreground-dim">{project.description}</p>
                </div>

                {/* Links Section */}
                <div className="flex flex-wrap gap-4 mb-16">
                    {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-accent-cyan/50 transition-all text-sm font-medium">
                            <Github className="w-4 h-4" />
                            View Source
                        </a>
                    )}
                    {project.streamlit && (
                        <a href={project.streamlit} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#ff4b4b]/10 border border-[#ff4b4b]/20 hover:bg-[#ff4b4b]/20 hover:border-[#ff4b4b]/50 transition-all text-sm font-medium text-[#ff4b4b]">
                            <Globe className="w-4 h-4" />
                            Streamlit App
                        </a>
                    )}
                    {project.tinkercad && (
                        <a href={project.tinkercad} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2481f4]/10 border border-[#2481f4]/20 hover:bg-[#2481f4]/20 hover:border-[#2481f4]/50 transition-all text-sm font-medium text-[#2481f4]">
                            <Cpu className="w-4 h-4" />
                            TinkerCAD Simulation
                        </a>
                    )}
                    {project.external && (
                        <a href={project.external} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 hover:bg-accent-cyan/20 hover:border-accent-cyan/50 transition-all text-sm font-medium text-accent-cyan">
                            <ExternalLink className="w-4 h-4" />
                            Live Demo
                        </a>
                    )}
                </div>

                {/* Content Body */}
                <div className="prose prose-invert prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground-dim prose-strong:text-foreground prose-li:text-foreground-dim">
                    {project.body ? (
                        <PortableText value={project.body} />
                    ) : (
                        <div className="p-8 rounded-2xl border border-white/10 bg-white/5 text-center text-foreground-dim">
                            <p>Detailed documentation is being updated for this project.</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
