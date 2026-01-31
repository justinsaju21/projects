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
    "author": author->{_id, name, "slug": slug.current, image, role}
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
    "author": author->{_id, name, "slug": slug.current, image, role}
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
    "author": author->{_id, name, "slug": slug.current, image, role, bio, email, website, twitter, linkedin, github}
  }`,

    // Get all authors
    allAuthors: `*[_type == "author" && !(_id in path("drafts.**"))] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    role,
    image,
    bio,
    website,
    twitter,
    linkedin,
    github
  }`,

    // Get author by slug with their projects
    authorBySlug: `*[_type == "author" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    role,
    image,
    bio,
    email,
    website,
    twitter,
    linkedin,
    github,
    "projects": *[_type == "project" && author._ref == ^._id] | order(order asc) {
      _id,
      title,
      "slug": slug.current,
      description,
      category,
      tags,
      github,
      streamlit,
      tinkercad,
      external
    }
  }`,
};

// Types
export interface Author {
    _id: string;
    name: string;
    slug: string;
    role?: string;
    image?: any;
    bio?: string;
    email?: string;
    website?: string;
    twitter?: string;
    linkedin?: string;
    github?: string;
}

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
    author?: Author;
}

export interface AuthorWithProjects extends Author {
    projects: Project[];
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

export async function getAllAuthors(): Promise<Author[]> {
    try {
        return await client.fetch(queries.allAuthors);
    } catch (error) {
        console.error("Error fetching authors:", error);
        return [];
    }
}

export async function getAuthorBySlug(slug: string): Promise<AuthorWithProjects | null> {
    try {
        return await client.fetch(queries.authorBySlug, { slug });
    } catch (error) {
        console.error("Error fetching author:", error);
        return null;
    }
}
