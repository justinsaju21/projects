import { getAllAuthors, Author } from '@/lib/sanity';
import Image from 'next/image';
import Link from 'next/link';
import { Users, ArrowRight } from 'lucide-react';
import { SidebarAdLayout } from '@/components/SidebarAdLayout';
import { AdBanner } from '@/components/AdBanner';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/lib/sanity';

// Image URL builder
const builder = imageUrlBuilder(client);
function urlFor(source: any) {
    return builder.image(source);
}

export const revalidate = 60;

export const metadata = {
    title: 'Authors | Projects Hub',
    description: 'Meet the creators behind our projects',
};

export default async function AuthorsPage() {
    const authors: Author[] = await getAllAuthors();

    return (
        <SidebarAdLayout>
            <main className="min-h-screen pt-32 pb-20 px-6">
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6" style={{
                            background: 'rgba(139, 92, 246, 0.1)',
                            border: '1px solid rgba(139, 92, 246, 0.3)',
                        }}>
                            <Users className="w-4 h-4 text-purple-400" />
                            <span className="text-sm font-medium text-purple-400">Our Creators</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            <span className="text-white">Meet the </span>
                            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Builders</span>
                        </h1>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            The talented individuals creating innovative projects.
                        </p>
                    </div>

                    {/* Ad Banner */}
                    <AdBanner slot="authors-header" className="mb-12" />

                    {/* Authors Grid */}
                    {authors && authors.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {authors.map((author) => (
                                <Link key={author._id} href={`/author/${author.slug}`}>
                                    <article
                                        className="rounded-2xl p-6 h-full transition-all group hover:scale-[1.02]"
                                        style={{
                                            background: 'rgba(30, 27, 75, 0.6)',
                                            border: '1px solid rgba(139, 92, 246, 0.3)',
                                            backdropFilter: 'blur(12px)',
                                        }}
                                    >
                                        <div className="flex flex-col items-center text-center">
                                            {/* Profile Image */}
                                            {author.image ? (
                                                <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 ring-4 ring-purple-500/20 group-hover:ring-purple-500/40 transition-all">
                                                    <Image
                                                        src={urlFor(author.image).width(192).height(192).url()}
                                                        alt={author.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-24 h-24 rounded-full bg-purple-500/10 flex items-center justify-center mb-4 ring-4 ring-purple-500/20">
                                                    <Users className="w-10 h-10 text-purple-400/50" />
                                                </div>
                                            )}

                                            {/* Name */}
                                            <h3 className="text-xl font-semibold text-white group-hover:text-purple-400 transition-colors mb-1">
                                                {author.name}
                                            </h3>

                                            {/* Role */}
                                            {author.role && (
                                                <span className="text-sm text-pink-400 mb-3">
                                                    {author.role}
                                                </span>
                                            )}

                                            {/* Bio Preview */}
                                            {author.bio && (
                                                <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                                                    {author.bio}
                                                </p>
                                            )}

                                            {/* View Profile Link */}
                                            <div className="flex items-center gap-2 text-purple-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                                <span>View Profile</span>
                                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </article>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div
                            className="rounded-2xl p-16 text-center"
                            style={{
                                background: 'rgba(30, 27, 75, 0.6)',
                                border: '1px solid rgba(139, 92, 246, 0.3)',
                            }}
                        >
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/10 mb-6">
                                <Users className="w-8 h-8 text-purple-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">No Authors Yet</h3>
                            <p className="text-gray-400">
                                Authors will appear here once they&apos;re added in Sanity Studio.
                            </p>
                        </div>
                    )}

                    {/* Footer Ad */}
                    <AdBanner slot="authors-footer" className="mt-12" />
                </div>
            </main>
        </SidebarAdLayout>
    );
}
