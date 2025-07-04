import { getEngPosts } from '@/entities/post/api/posts';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://your-domain.com'; // Replace with your actual domain

  const posts = await getEngPosts();

  const feedItems = posts.map((post) => `
    <item>
      <title>${post.title}</title>
      <link>${baseUrl}/blog/${post.id}</link>
      <guid>${baseUrl}/blog/${post.id}</guid>
      <pubDate>${new Date(post.created_at).toUTCString()}</pubDate>
      <description><![CDATA[${post.desc}]]></description>
      ${post.image_url ? `<enclosure url="${post.image_url}" type="image/jpeg" />` : ''}
    </item>
  `).join('');

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>Seoul Food Blog</title>
      <link>${baseUrl}/blog</link>
      <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
      <description>Latest blog posts about Seoul food.</description>
      <language>en-us</language>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      ${feedItems}
    </channel>
  </rss>`;

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
