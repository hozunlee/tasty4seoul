import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Layout } from "@/shared/ui/layout/Layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "tasty 4 Seoul | Authentic Korean Food Guide & Hidden Gems in Seoul";
const description = "Discover the best Korean food in Seoul with our local's guide to authentic restaurants, street food, and hidden gems. Find the best places to eat in Hongdae, Itaewon, Insadong and more!";
const keywords = [
  "best Korean food Seoul",
  "authentic Korean restaurants",
  "Seoul food guide",
  "where to eat in Seoul",
  "Korean street food",
  "local food Seoul",
  "best bibimbap Seoul",
  "Korean BBQ restaurants",
  "Hongdae food guide",
  "Itaewon restaurants",
  "Insadong traditional food",
  "Seoul food tour",
  "Korean fried chicken",
  "best kimchi in Seoul",
  "Seoul night food"
].join(', ');

export const metadata: Metadata = {
  title,
  description,
  keywords,
  // viewport and themeColor moved to viewport.ts
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_SUB_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'ko-KR': '/ko',
    },
  },
  openGraph: {
    title: `${title} | Best Local Eats in Seoul`,
    description,
    url: '/',
    siteName: 'tasty 4 Seoul',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og_img.png',
        width: 1200,
        height: 630,
        alt: 'tasty 4 Seoul - Discover the best Korean food in Seoul',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${title} | Best Local Eats in Seoul`,
    description,
    images: ['https://mjxiofcpqnyfnskvoxut.supabase.co/storage/v1/object/public/strapi-uploads//og_img.png'],
    site: '@tasty4seoul',
    creator: '@tasty4seoul',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'YOUR_GOOGLE_SEARCH_CONSOLE_KEY',
    yandex: 'YOUR_YANDEX_VERIFICATION_KEY',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
  },
  manifest: '/site.webmanifest',
  other: {
    'msapplication-TileColor': '#FF5A36',
  },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}` } cz-shortcut-listen="true" >
    
      <Layout>
        {children}
      </Layout>
      </body>
    </html>
  );
}
