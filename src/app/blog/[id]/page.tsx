import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Metadata } from 'next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getEngPostById, getAdjacentEngPosts } from '@/entities/post/api/posts';
import { RelatedPosts } from '@/widgets/blog/RelatedPosts';



// Generate SEO-optimized metadata for blog posts
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const post = await getEngPostById(params.id);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const postUrl = `${baseUrl}/blog/${params.id}`;
  const locale = 'en-US';
  
  // Common keywords for Korean food and travel
  const seoKeywords = [
    'Korean food guide', 'Seoul restaurants', 'best Korean food',
    'Seoul street food', 'authentic Korean cuisine', 'Seoul food tour',
    'Korean BBQ Seoul', 'local food Seoul', 'must-eat Seoul', 'hidden gems Seoul'
  ];

  if (!post) {
    return {
      title: 'Post Not Found | Best Korean Food in Seoul',
      description: 'The requested post could not be found. Discover the best Korean food and hidden restaurants in Seoul.',
      keywords: seoKeywords.join(', '),
      openGraph: {
        title: 'Post Not Found | Taste 4 Seoul',
        description: 'The requested post could not be found. Discover the best Korean food and hidden restaurants in Seoul.',
        url: postUrl,
        type: 'website',
        locale,
        siteName: 'Taste 4 Seoul',
        images: [
          {
            url: '/og_img.png',
            width: 1200,
            height: 630,
            alt: 'Discover the best Korean food in Seoul',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Post Not Found | Taste 4 Seoul',
        description: 'The requested post could not be found. Discover the best Korean food and hidden restaurants in Seoul.',
        images: ['/og_img.png'],
      },
      alternates: {
        canonical: postUrl,
      },
    };
  }

  // Generate post-specific metadata
  const postTitle = `${post.title} | Best Korean Food in Seoul`;
  const postDescription = post.desc || `Discover ${post.title} - one of the best places to eat in Seoul. ${seoKeywords.slice(0, 3).join(' • ')}`;
  const postKeywords = [...new Set([...seoKeywords, post.title, ...(post.tags || [])])].join(', ');
  const postImage = post.image_url || `${baseUrl}/og_img.png`;
  
  return {
    title: postTitle,
    description: postDescription,
    keywords: postKeywords,
    applicationName: 'Taste 4 Seoul',
    creator: 'Taste 4 Seoul Team',
    publisher: 'Taste 4 Seoul',
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: postUrl,
      languages: {
        'en-US': postUrl,
        'ko-KR': postUrl.replace('/blog/', '/ko/blog/'),
        'ja-JP': postUrl.replace('/blog/', '/jp/blog/'),
        'zh-CN': postUrl.replace('/blog/', '/zh/blog/')
      }
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    },
    openGraph: {
      title: postTitle,
      description: postDescription,
      url: postUrl,
      type: 'article',
      locale: 'en_US',
      siteName: 'Taste 4 Seoul',
      publishedTime: post.created_at,
      modifiedTime: post.updated_at || post.created_at,
      images: [
        {
          url: postImage,
          width: 1200,
          height: 630,
          alt: postTitle
        }
      ]
    } as const,
    // Article-specific metadata
    // Article and social media metadata
    other: {
      'article:published_time': post.created_at,
      'article:modified_time': post.updated_at || post.created_at,
      'article:section': 'Food & Travel',
      'article:tag': post.tags?.join(', ') || 'Korean food, Seoul restaurants, Food travel',
      'article:author': 'Taste 4 Seoul Team',
      'twitter:card': 'summary_large_image',
      'twitter:title': postTitle,
      'twitter:description': postDescription,
      'twitter:image': postImage,
      'twitter:creator': '@taste4seoul',
      'twitter:site': '@taste4seoul'
    },
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
      date: true
    }
  };
}

interface PostPageProps {
  params: {
    id: string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
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
            img: ({ ...props }) => (
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