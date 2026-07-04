import { MetadataRoute } from 'next'
import { getProjects } from '@/lib/sheets'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://projects.justinsaju.me'

    // Fetch all projects
    const projects = await getProjects()

    const projectUrls = projects.map((project) => ({
        url: `${baseUrl}/project/${project.slug}`,
        lastModified: new Date(), // Using current date as default since projects don't have publishedAt yet
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    const routes = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 1,
        },
    ]

    return [...routes, ...projectUrls]
}
