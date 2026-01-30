import { createClient } from "next-sanity";

export const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "qv90wwvq",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    apiVersion: "2024-01-21",
    useCdn: true,
});

// GROQ Queries
export const queries = {
    // Get all projects
    allProjects: `*[_type == "project"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    category,
    tags,
    github,
    streamlit,
    tinkercad,
    external,
    featured,
    "author": author->name
  }`,

    // Get projects by category
    projectsByCategory: `*[_type == "project" && category == $category] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    category,
    tags,
    github,
    streamlit,
    tinkercad,
    external,
    featured,
    "author": author->name
  }`,

    // Get single project by slug
    projectBySlug: `*[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    "body": body,
    category,
    tags,
    github,
    streamlit,
    tinkercad,
    external,
    featured,
    "author": author->name
  }`,
};

// Types
export interface Project {
    _id: string;
    title: string;
    slug: string;
    description: string;
    body?: any; // Portable Text block array
    category: "vlsi" | "embedded" | "virtual-labs" | "web-apps" | "circuits";
    tags: string[];
    github?: string;
    streamlit?: string;
    tinkercad?: string;
    external?: string;
    featured?: boolean;
    author?: string;
}

// Fetch functions
export async function getAllProjects(): Promise<Project[]> {
    try {
        return await client.fetch(queries.allProjects);
    } catch (error) {
        console.error("Error fetching projects:", error);
        return [];
    }
}

export async function getProjectsByCategory(category: string): Promise<Project[]> {
    try {
        return await client.fetch(queries.projectsByCategory, { category });
    } catch (error) {
        console.error("Error fetching projects by category:", error);
        return [];
    }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
    try {
        return await client.fetch(queries.projectBySlug, { slug });
    } catch (error) {
        console.error("Error fetching project by slug:", error);
        return null;
    }
}
