import { ProjectGrid } from "@/components/home/ProjectGrid";

export const revalidate = 1800;

export default function ProjectsPage() {
  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', paddingTop: '80px' }}>
      <div className="max-w-7xl mx-auto px-6 pb-24">
        {/* We pass hideSearch={false} which is the default, to show the search UI */}
        <ProjectGrid />
      </div>
    </div>
  );
}
