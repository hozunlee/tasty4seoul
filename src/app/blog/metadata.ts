import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Seoul Food Blog | Best Korean Food Guide & Hidden Gems',
  description: 'Discover the best Korean food in Seoul with our expert guides. Find hidden gems, local favorites, and must-try dishes in Seoul\'s vibrant food scene.',
  keywords: [
    'Korean food blog', 'Seoul restaurants', 'best Korean food',
    'Seoul street food', 'authentic Korean cuisine', 'Seoul food tour',
    'Korean BBQ Seoul', 'local food Seoul', 'must-eat Seoul', 'hidden gems Seoul',
    'Seoul cafe guide', 'traditional Korean food', 'Seoul night markets', 'best bibimbap Seoul',
    'Hongdae food guide', 'Insadong restaurants', 'Myeongdong street food', 'Gangnam dining'
  ],
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/blog',
    languages: {
      'en-US': '/blog',
      'ko-KR': '/ko/blog',
      'ja-JP': '/jp/blog',
      'zh-CN': '/zh/blog'
    }
  },
  openGraph: {
    title: 'Seoul Food Blog | Best Korean Food Guide & Hidden Gems',
    description: 'Discover the best Korean food in Seoul with our expert guides. Find hidden gems, local favorites, and must-try dishes in Seoul\'s vibrant food scene.',
    url: '/blog',
    type: 'website',
    locale: 'en_US',
    siteName: 'tasty 4 Seoul',
    images: [
      {
        url: '/og_img.png',
        width: 1200,
        height: 630,
        alt: 'Seoul Food Blog - Discover the Best Korean Food in Seoul'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Seoul Food Blog | Best Korean Food Guide & Hidden Gems',
    description: 'Discover the best Korean food in Seoul with our expert guides. Find hidden gems, local favorites, and must-try dishes.',
    images: ['/og_img.png'],
    creator: '@tasty4seoul',
    site: '@tasty4seoul'
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
  other: {
    'article:section': 'Food & Travel',
    'article:tag': 'Korean food, Seoul restaurants, Food travel, Korean cuisine, Seoul food guide',
    'article:author': 'tasty 4 Seoul Team'
  }
};
