import { getProjects } from "@/lib/sheets";
import { SavedPageClient } from "./SavedPageClient";

export default async function SavedPage() {
    const projects = await getProjects();
    
    return (
        <SavedPageClient projects={projects} />
    );
}
