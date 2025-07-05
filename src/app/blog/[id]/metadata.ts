import { Metadata } from 'next';
import { getEngPostById } from '@/entities/post/api/posts';

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const post = await getEngPostById(params.id);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const postUrl = `${baseUrl}/blog/${params.id}`;
  const locale = 'en-US'; // 기본 로케일 설정

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
        title: 'Post Not Found | tasty 4 Seoul',
        description: 'The requested post could not be found. Discover the best Korean food and hidden restaurants in Seoul.',
        url: postUrl,
        type: 'website',
        locale,
        siteName: 'tasty 4 Seoul',
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
        title: 'Post Not Found | tasty 4 Seoul',
        description: 'The requested post could not be found. Discover the best Korean food and hidden restaurants in Seoul.',
        images: ['/og_img.png'],
      },
      alternates: {
        canonical: postUrl,
      },
    };
  }

  const postTitle = `${post.title} | Best Korean Food in Seoul`;
  const postDescription = post.desc || `Discover ${post.title} - one of the best places to eat in Seoul. ${seoKeywords.slice(0, 3).join(' • ')}`;
  const postKeywords = [...new Set([...seoKeywords, post.title, ...(post.tags || [])])].join(', ');
  const postImage = post.image_url || `${baseUrl}/og_img.png`;
  
  return {
    title: postTitle,
    description: postDescription,
    keywords: postKeywords,
    applicationName: 'tasty 4 Seoul',
    creator: 'tasty 4 Seoul Team',
    publisher: 'tasty 4 Seoul',
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
      siteName: 'tasty 4 Seoul',
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
    other: {
      'article:published_time': post.created_at,
      'article:modified_time': post.updated_at || post.created_at,
      'article:section': 'Food & Travel',
      'article:tag': post.tags?.join(', ') || 'Korean food, Seoul restaurants, Food travel',
      'article:author': 'tasty 4 Seoul Team',
      'twitter:card': 'summary_large_image',
      'twitter:title': postTitle,
      'twitter:description': postDescription,
      'twitter:image': postImage,
      'twitter:creator': '@tasty4seoul',
      'twitter:site': '@tasty4seoul'
    },
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
      date: true
    }
  };
}