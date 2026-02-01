import { getAllAuthors, getAuthorBySlug, urlFor } from '@/lib/sanity';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, ArrowLeft, ArrowRight, Globe, Mail, Github, Linkedin, ExternalLink } from 'lucide-react';
import type { Author, Project } from '@/lib/sanity';
import { SidebarAdLayout } from '@/components/SidebarAdLayout';
import { AdBanner } from '@/components/AdBanner';

// Revalidate every 60 seconds
export const revalidate = 60;

// Define category colors (matching ProjectsGrid)
const getCategoryColor = (category: string) => {
    switch (category) {
        case "vlsi": return "bg-pink-500/20 text-pink-400 border-pink-500/30";
        case "embedded": return "bg-green-500/20 text-green-400 border-green-500/30";
        case "virtual-labs": return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30";
        case "web-apps": return "bg-violet-500/20 text-violet-400 border-violet-500/30";
        case "circuits": return "bg-amber-500/20 text-amber-400 border-amber-500/30";
        default: return "bg-purple-500/20 text-purple-400 border-purple-500/30";
    }
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const author = await getAuthorBySlug(slug);
    if (!author) return {};
    return {
        title: `${author.name} | Projects Hub`,
        description: author.bio || `Projects by ${author.name}`,
    };
}

export async function generateStaticParams() {
    const authors = await getAllAuthors();
    return authors.map((author) => ({ slug: author.slug }));
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const author = await getAuthorBySlug(slug);

    if (!author) notFound();

    return (
        <SidebarAdLayout>
            <main className="min-h-screen pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto">
                    {/* Back Link */}
                    <Link
                        href="/author"
                        className="group inline-flex items-center gap-2 text-foreground-muted hover:text-accent-cyan transition-colors mb-10"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span>All Authors</span>
                    </Link>

                    {/* Author Profile Card */}
                    <div className="glass rounded-2xl p-8 mb-12">
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            {/* Profile Image */}
                            {author.image && (
                                <div className="relative w-32 h-32 rounded-full overflow-hidden flex-shrink-0 ring-4 ring-accent-cyan/20">
                                    <Image
                                        src={urlFor(author.image).width(256).height(256).url()}
                                        alt={author.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}

                            {/* Author Info */}
                            <div className="flex-1">
                                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                                    {author.name}
                                </h1>
                                {author.role && (
                                    <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20 mb-4">
                                        {author.role}
                                    </span>
                                )}
                                {author.bio && (
                                    <p className="text-foreground-muted mb-6 leading-relaxed">
                                        {author.bio}
                                    </p>
                                )}

                                {/* Social Links */}
                                <div className="flex flex-wrap gap-3">
                                    {author.website && (
                                        <a
                                            href={author.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-foreground-muted hover:text-accent-cyan hover:bg-white/10 transition-all"
                                        >
                                            <Globe className="w-4 h-4" />
                                            <span className="text-sm">Website</span>
                                        </a>
                                    )}
                                    {author.email && (
                                        <a
                                            href={`mailto:${author.email}`}
                                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-foreground-muted hover:text-accent-cyan hover:bg-white/10 transition-all"
                                        >
                                            <Mail className="w-4 h-4" />
                                            <span className="text-sm">Email</span>
                                        </a>
                                    )}
                                    {author.github && (
                                        <a
                                            href={`https://github.com/${author.github}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-foreground-muted hover:text-accent-cyan hover:bg-white/10 transition-all"
                                        >
                                            <Github className="w-4 h-4" />
                                            <span className="text-sm">GitHub</span>
                                        </a>
                                    )}
                                    {author.linkedin && (
                                        <a
                                            href={author.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-foreground-muted hover:text-accent-cyan hover:bg-white/10 transition-all"
                                        >
                                            <Linkedin className="w-4 h-4" />
                                            <span className="text-sm">LinkedIn</span>
                                        </a>
                                    )}
                                    {author.twitter && (
                                        <a
                                            href={`https://twitter.com/${author.twitter}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-foreground-muted hover:text-accent-cyan hover:bg-white/10 transition-all"
                                        >
                                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                            </svg>
                                            <span className="text-sm">@{author.twitter}</span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Ad Banner */}
                    <AdBanner slot="author-profile" className="mb-8" />

                    {/* Author's Projects */}
                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-8">
                            Projects by {author.name}
                            <span className="ml-3 text-lg font-normal text-foreground-muted">
                                ({author.projects?.length || 0} projects)
                            </span>
                        </h2>

                        {author.projects && author.projects.length > 0 ? (
                            <div className="grid gap-6">
                                {author.projects.map((project) => (
                                    <Link key={project._id} href={`/project/${project.slug}`}>
                                        <article className="glass rounded-xl p-6 hover:glow transition-all group">
                                            <div className="flex flex-col md:flex-row gap-6">
                                                <div className="flex-1">
                                                    <div className="flex flex-wrap gap-2 mb-3">
                                                        <span
                                                            className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getCategoryColor(project.category)}`}
                                                        >
                                                            {project.category.replace("-", " ").toUpperCase()}
                                                        </span>
                                                        {project.featured && (
                                                            <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-yellow-500/20 text-yellow-500 border border-yellow-500/30">
                                                                Featured
                                                            </span>
                                                        )}
                                                    </div>
                                                    <h3 className="text-xl font-semibold text-foreground group-hover:text-accent-cyan transition-colors mb-2">
                                                        {project.title}
                                                    </h3>
                                                    <p className="text-foreground-muted text-sm line-clamp-2 mb-3">
                                                        {project.description}
                                                    </p>
                                                    <div className="flex items-center gap-4 text-foreground-dim text-sm">
                                                        <span className="flex items-center gap-1.5 transition-colors group-hover:text-accent-cyan">
                                                            View Project
                                                            <ArrowRight className="w-4 h-4" />
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </article>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="glass rounded-xl p-12 text-center">
                                <p className="text-foreground-muted">No projects published yet.</p>
                            </div>
                        )}
                    </section>

                    {/* Footer Ad */}
                    <AdBanner slot="author-footer" className="mt-12" />
                </div>
            </main>
        </SidebarAdLayout>
    );
}
