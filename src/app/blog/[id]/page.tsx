import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Metadata } from 'next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getEngPostById, getAdjacentEngPosts } from '@/entities/post/api/posts';
import { RelatedPosts } from '@/widgets/blog/RelatedPosts';

interface PostPageProps {
  params: {
    id: string;
  };
}

// Dynamic SEO Metadata
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const post = await getEngPostById(params.id);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://your-domain.com';
  const postUrl = `${baseUrl}/blog/${params.id}`;
  const locale = 'ko-KR'; // 추후 i18n 구조에 맞게 확장

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested post could not be found.',
      openGraph: {
        title: 'Post Not Found',
        description: 'The requested post could not be found.',
        url: postUrl,
        type: 'article',
        locale,
        siteName: 'Seoul Food Blog',
      },
      alternates: {
        canonical: postUrl,
      },
    };
  }

  return {
    title: `${post.title} | Seoul Food Blog`,
    description: post.desc || '',
    openGraph: {
      title: post.title,
      description: post.desc || '',
      url: postUrl,
      type: 'article',
      locale,
      siteName: 'Seoul Food Blog',
      publishedTime: post.created_at,
      modifiedTime: post.updated_at || post.created_at,
      images: [
        {
          url: post.image_url || `${baseUrl}/placeholder.svg`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.desc || '',
      images: [post.image_url || `${baseUrl}/placeholder.svg`],
    },
    alternates: {
      canonical: postUrl,
      // 다국어 지원 예시 (추후 i18n 데이터에 따라 확장)
      languages: {
        'en-US': postUrl,
        'ko-KR': postUrl.replace('/blog/', '/ko/blog/'),
        'ja-JP': postUrl.replace('/blog/', '/jp/blog/'),
        'zh-CN': postUrl.replace('/blog/', '/cn/blog/'),
      },
    },
  };
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await getEngPostById(params.id);

  if (!post) {
    notFound(); // Triggers the 404 page
  }

  const relatedPosts = await getAdjacentEngPosts(post.created_at, post.id, 3); // Always get 3 adjacent posts
  const relatedPostsTitle = 'More Posts';

  return (
    <article className="container mx-auto px-4 py-8 mt-10 md:mt-24">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
          {post.title}
        </h1>
        <time className="mt-4 block text-sm text-gray-500 dark:text-gray-400">
          Published on {new Date(post.created_at).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
          })}
        </time>
      </header>

      <div className="relative mb-8 h-96 w-full overflow-hidden rounded-lg">
        <Image
          src={post.image_url || '/placeholder.svg'}
          alt={post.title}
          fill
          priority // Prioritize loading of the main image
          className="object-cover"
        />
      </div>

      <div className="prose prose-lg dark:prose-invert mx-auto max-w-3xl">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            img: ({ node, ...props }) => (
              <span className="block relative w-full h-96 max-h-[1000px] my-4">
                <Image
                  // {...props}
                  src={String(props.src)|| ''}
                  alt={props.alt || ''}
                  fill
                  className="object-cover"
                  loading="lazy"
                />
              </span>
            ),
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>

      {relatedPosts.length > 0 && (
        <RelatedPosts posts={relatedPosts} title={relatedPostsTitle} />
      )}
    </article>
  );
}