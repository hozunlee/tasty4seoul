import { MetadataRoute } from 'next'
import { getEngPosts } from '@/entities/post/api/posts'

// Helper function to format date to ISO string
const formatDate = (dateString?: string | Date | null): string => {
  if (!dateString) return new Date().toISOString()
  return new Date(dateString).toISOString()
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  const now = new Date().toISOString()

  try {
    const posts = await getEngPosts()

    // Blog post entries
    const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.id}`,
      lastModified: formatDate(post.updated_at || post.created_at),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
      {
        url: baseUrl,
        lastModified: now,
        changeFrequency: 'daily' as const,
        priority: 1,
      },
      {
        url: `${baseUrl}/blog`,
        lastModified: now,
        changeFrequency: 'daily' as const,
        priority: 0.9,
      },
      {
        url: `${baseUrl}/map`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
      {
        url: `${baseUrl}/about`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.5,
      }
    ]

    return [...staticPages, ...postEntries]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    // Return at least the essential pages even if there's an error
    return [
      {
        url: baseUrl,
        lastModified: now,
        changeFrequency: 'daily' as const,
        priority: 1,
      },
      {
        url: `${baseUrl}/blog`,
        lastModified: now,
        changeFrequency: 'daily' as const,
        priority: 0.9,
      },
      {
        url: `${baseUrl}/map`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
      {
        url: `${baseUrl}/about`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.5,
      }
    ]
  }
}
