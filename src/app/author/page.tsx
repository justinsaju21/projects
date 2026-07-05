import { getProjects } from "@/lib/sheets";
import Link from "next/link";
import { ArrowRight, User } from "lucide-react";

export const metadata = {
  title: 'Contributors | Echo Projects Hub',
  description: 'Meet the brilliant minds behind our projects.',
};

export default async function AuthorsPage() {
  const projects = await getProjects();
  
  const authorStats = projects.reduce((acc, project) => {
    if (!project.authorName) return acc;
    if (!acc[project.authorName]) {
      acc[project.authorName] = { count: 0 };
    }
    acc[project.authorName].count++;
    return acc;
  }, {} as Record<string, { count: number }>);

  const authors = Object.entries(authorStats)
    .sort((a, b) => b[1].count - a[1].count)
    .map(([name, stats]) => ({ name, ...stats }));

  return (
    <div className="pt-32 pb-24 min-h-[80vh]">
      <div className="max-w-4xl mx-auto px-6">
        <h1 
          className="text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tight"
          style={{ fontFamily: "'Playfair Display', serif", color: "var(--text-primary)" }}
        >
          Our Contributors
        </h1>
        <p className="text-lg md:text-xl mb-16 max-w-2xl" style={{ color: "var(--text-secondary)" }}>
          The brilliant minds sharing their projects, experiments, and innovations on Echo Projects Hub.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {authors.map((author) => (
            <Link 
              key={author.name} 
              href={`/author/${encodeURIComponent(author.name)}`}
              className="group p-6 md:p-8 rounded-3xl transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: "var(--glass-bg)",
                border: "1px solid var(--glass-border)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div className="flex items-center gap-6">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0"
                  style={{ background: "var(--bg-tertiary)" }}
                >
                  <User className="w-8 h-8" style={{ color: "var(--text-muted)" }} />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-medium mb-1 transition-colors" style={{ color: "var(--text-primary)" }}>
                    {author.name}
                  </h2>
                  <p className="text-sm flex items-center gap-2" style={{ color: "var(--text-secondary)" }}>
                    {author.count} Project{author.count === 1 ? '' : 's'} published
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all" style={{ color: "var(--text-primary)" }} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

