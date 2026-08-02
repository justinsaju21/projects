import { notFound } from "next/navigation";
import { getProjects } from "@/lib/sheets";
import { Github, ExternalLink, Pen, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import { ReadingProgressBar } from "@/components/ui/ReadingProgressBar";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 1800;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const projects = await getProjects();
  const project = projects.find((p) => p.slug === slug);

  if (!project) return { title: "Not Found" };

  return {
    title: `${project.title} | Echo Projects`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const projects = await getProjects();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <ReadingProgressBar />
      <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <Link href="/" className="inline-flex items-center gap-2 mb-8" style={{ color: 'var(--text-muted)' }}>
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium hover:underline">Back to Projects</span>
        </Link>
        
        <header className="mb-12">
          {project.category && (
            <div className="mb-4">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-medium border" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)', borderColor: 'var(--border)' }}>
                {project.category}
              </span>
            </div>
          )}
          
          <h1 className="mb-6 tracking-tight" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1, color: 'var(--text-primary)' }}>
            {project.title}
          </h1>
          
          <p className="text-xl mb-8 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {project.description}
          </p>
          
          <div className="flex flex-wrap items-center gap-6 py-6 border-y" style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
            {project.authorName && (
              <div className="flex items-center gap-2">
                <Pen className="w-4 h-4" />
                <span className="text-sm font-medium">{project.authorName}</span>
              </div>
            )}
            
            {(project.github || project.external || project.streamlit || project.tinkercad) && (
              <div className="flex items-center gap-4 border-l pl-6" style={{ borderColor: 'var(--border)' }}>
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:opacity-80 transition-opacity" style={{ color: 'var(--text-primary)' }}>
                    <Github className="w-4 h-4" />
                    <span className="text-sm font-medium">GitHub</span>
                  </a>
                )}
                {project.external && (
                  <a href={project.external} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:opacity-80 transition-opacity" style={{ color: 'var(--text-primary)' }}>
                    <ExternalLink className="w-4 h-4" />
                    <span className="text-sm font-medium">External</span>
                  </a>
                )}
                {project.streamlit && (
                  <a href={project.streamlit} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:opacity-80 transition-opacity" style={{ color: 'var(--text-primary)' }}>
                    <ExternalLink className="w-4 h-4" />
                    <span className="text-sm font-medium">Streamlit</span>
                  </a>
                )}
                {project.tinkercad && (
                  <a href={project.tinkercad} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:opacity-80 transition-opacity" style={{ color: 'var(--text-primary)' }}>
                    <ExternalLink className="w-4 h-4" />
                    <span className="text-sm font-medium">Tinkercad</span>
                  </a>
                )}
              </div>
            )}
          </div>
        </header>

        <div className="prose prose-invert prose-lg max-w-none prose-headings:text-[var(--text-primary)] prose-p:text-[var(--text-secondary)] prose-strong:text-white prose-li:text-[var(--text-secondary)] prose-blockquote:text-[var(--text-muted)] prose-blockquote:border-l-[var(--border)] prose-a:text-blue-400 hover:prose-a:text-blue-300 transition-colors" style={{ color: 'var(--text-secondary)' }}>
          {project.content ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {project.content}
            </ReactMarkdown>
          ) : (
            <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              This project does not have a detailed write-up yet. You can find more information by visiting the project links above.
            </p>
          )}
        </div>

        {(project.external || project.streamlit || project.tinkercad) && (() => {
          let iframeUrl = project.streamlit || project.tinkercad || project.external || '';
          
          // Streamlit apps require ?embed=true for iframes
          if (iframeUrl.includes('streamlit.app') || iframeUrl.includes('share.streamlit.io')) {
            const urlObj = new URL(iframeUrl);
            if (!urlObj.searchParams.has('embed')) {
              urlObj.searchParams.set('embed', 'true');
              iframeUrl = urlObj.toString();
            }
          }

          return (
            <div className="mt-16 pt-8 border-t" style={{ borderColor: 'var(--border)' }}>
              <h3 className="text-sm font-medium mb-6" style={{ color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Live Preview
              </h3>
              <div className="w-full rounded-2xl overflow-hidden border" style={{ borderColor: 'var(--border)', height: '700px', background: 'var(--bg-tertiary)' }}>
                <iframe 
                  src={iframeUrl} 
                  className="w-full h-full"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                  title={`${project.title} Preview`}
                  loading="lazy"
                />
              </div>
              <p className="text-sm mt-4 text-center" style={{ color: 'var(--text-muted)' }}>
                If the preview doesn't load, the site may not allow embedding. Use the links at the top to open it directly.
              </p>
            </div>
          );
        })()}

        {project.tags && project.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t" style={{ borderColor: 'var(--border)' }}>
            <h3 className="text-sm font-medium mb-4" style={{ color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs"
                  style={{ background: 'var(--glass)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
