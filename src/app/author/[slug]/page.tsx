import { getAuthorBySlug, getAllAuthors, AuthorWithProjects, Author } from '@/lib/sanity';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Globe, Mail, Github, Linkedin, Folder } from 'lucide-react';
import { SidebarAdLayout } from '@/components/SidebarAdLayout';
import { AdBanner } from '@/components/AdBanner';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/lib/sanity';

// Image URL builder
const builder = imageUrlBuilder(client);
function urlFor(source: any) {
    return builder.image(source);
}

// Category colors
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

export const revalidate = 60;

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
    const authors: Author[] = await getAllAuthors();
    return authors.map((author) => ({ slug: author.slug }));
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const author: AuthorWithProjects | null = await getAuthorBySlug(slug);

    if (!author) notFound();

    return (
        <SidebarAdLayout>
            <main className="min-h-screen pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto">
                    {/* Back Link */}
                    <Link
                        href="/author"
                        className="group inline-flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors mb-10"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span>All Authors</span>
                    </Link>

                    {/* Author Profile Card */}
                    <div
                        className="rounded-2xl p-8 mb-12"
                        style={{
                            background: 'rgba(30, 27, 75, 0.6)',
                            border: '1px solid rgba(139, 92, 246, 0.3)',
                            backdropFilter: 'blur(12px)',
                        }}
                    >
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            {/* Profile Image */}
                            {author.image && (
                                <div className="relative w-32 h-32 rounded-full overflow-hidden flex-shrink-0 ring-4 ring-purple-500/30">
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
                                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                                    {author.name}
                                </h1>
                                {author.role && (
                                    <span
                                        className="inline-block px-3 py-1 text-sm font-medium rounded-full mb-4"
                                        style={{
                                            background: 'rgba(139, 92, 246, 0.2)',
                                            border: '1px solid rgba(139, 92, 246, 0.3)',
                                            color: '#a78bfa',
                                        }}
                                    >
                                        {author.role}
                                    </span>
                                )}
                                {author.bio && (
                                    <p className="text-gray-400 mb-6 leading-relaxed">
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
                                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-gray-400 hover:text-purple-400 hover:bg-white/10 transition-all"
                                        >
                                            <Globe className="w-4 h-4" />
                                            <span className="text-sm">Website</span>
                                        </a>
                                    )}
                                    {author.email && (
                                        <a
                                            href={`mailto:${author.email}`}
                                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-gray-400 hover:text-purple-400 hover:bg-white/10 transition-all"
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
                                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-gray-400 hover:text-purple-400 hover:bg-white/10 transition-all"
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
                                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-gray-400 hover:text-purple-400 hover:bg-white/10 transition-all"
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
                                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-gray-400 hover:text-purple-400 hover:bg-white/10 transition-all"
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
                        <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                            <Folder className="w-6 h-6 text-purple-400" />
                            Projects by {author.name}
                            <span className="text-lg font-normal text-gray-400">
                                ({author.projects?.length || 0})
                            </span>
                        </h2>

                        {author.projects && author.projects.length > 0 ? (
                            <div className="grid gap-6">
                                {author.projects.map((project) => (
                                    <Link key={project._id} href={`/project/${project.slug}`}>
                                        <article
                                            className="rounded-xl p-6 transition-all group hover:scale-[1.01]"
                                            style={{
                                                background: 'rgba(30, 27, 75, 0.6)',
                                                border: '1px solid rgba(139, 92, 246, 0.3)',
                                                backdropFilter: 'blur(12px)',
                                            }}
                                        >
                                            <div className="flex flex-col md:flex-row gap-4 items-start">
                                                {/* Category indicator */}
                                                <div
                                                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                                                    style={{
                                                        background: `${getCategoryColor(project.category)}20`,
                                                        border: `1px solid ${getCategoryColor(project.category)}50`,
                                                    }}
                                                >
                                                    <Folder className="w-6 h-6" style={{ color: getCategoryColor(project.category) }} />
                                                </div>

                                                <div className="flex-1">
                                                    {/* Category & Tags */}
                                                    <div className="flex flex-wrap gap-2 mb-2">
                                                        <span
                                                            className="px-2 py-0.5 text-xs font-medium rounded-full"
                                                            style={{
                                                                background: `${getCategoryColor(project.category)}20`,
                                                                color: getCategoryColor(project.category),
                                                            }}
                                                        >
                                                            {project.category.replace('-', ' ').toUpperCase()}
                                                        </span>
                                                    </div>

                                                    <h3 className="text-xl font-semibold text-white group-hover:text-purple-400 transition-colors mb-2">
                                                        {project.title}
                                                    </h3>
                                                    <p className="text-gray-400 text-sm line-clamp-2">
                                                        {project.description}
                                                    </p>

                                                    {/* Tags */}
                                                    {project.tags && project.tags.length > 0 && (
                                                        <div className="flex flex-wrap gap-2 mt-3">
                                                            {project.tags.slice(0, 4).map((tag) => (
                                                                <span
                                                                    key={tag}
                                                                    className="px-2 py-0.5 text-xs rounded-full bg-white/5 text-gray-400"
                                                                >
                                                                    {tag}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </article>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div
                                className="rounded-xl p-12 text-center"
                                style={{
                                    background: 'rgba(30, 27, 75, 0.6)',
                                    border: '1px solid rgba(139, 92, 246, 0.3)',
                                }}
                            >
                                <p className="text-gray-400">No projects published yet.</p>
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
