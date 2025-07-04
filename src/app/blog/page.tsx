"use client";

import { Metadata } from 'next'; // Metadata는 서버 컴포넌트에서만 사용 가능하므로, 클라이언트 컴포넌트에서는 제거
import { useState, useEffect } from 'react';
import { getEngPosts } from '@/entities/post/api/posts';
import { PostListInfinite } from '@/widgets/blog/PostListInfinite';
import { SearchBar } from '@/widgets/blog/SearchBar';
import HeroClientWrapper from './HeroClientWrapper';
import { Post } from '@/entities/post/model/types';

// Metadata는 서버 컴포넌트에서만 사용 가능하므로, 클라이언트 컴포넌트에서는 제거하거나 별도 파일로 분리
// export const metadata: Metadata = {
//   title: 'Seoul Food Blog | Explore the Tastes of Seoul',
//   description: 'Your ultimate guide to the best food experiences in Seoul. Discover hidden gems, must-try dishes, and local favorites.',
// };

const POSTS_PER_PAGE = 6;

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
  const [initialPosts, setInitialPosts] = useState<Post[]>([]);
  const [loadingInitialPosts, setLoadingInitialPosts] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInitialPosts = async () => {
      setLoadingInitialPosts(true);
      setError(null);
      try {
        const posts = await getEngPosts(POSTS_PER_PAGE, 0, searchTerm);
        setInitialPosts(posts);
      } catch (err) {
        console.error('Error fetching initial posts:', err);
        setError('Failed to load blog posts. Please try again later.');
      } finally {
        setLoadingInitialPosts(false);
      }
    };

    fetchInitialPosts();
  }, [searchTerm]);

  if (loadingInitialPosts) {
    return (
      <main className="container mx-auto px-4 py-8">
        <HeroClientWrapper />
        <div className="mt-8 text-center">
          <p>Loading blog posts...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container mx-auto px-4 py-8">
        <HeroClientWrapper />
        <div className="mt-8 text-center py-10 text-red-500">
          <h2 className="text-2xl font-bold">An Error Occurred</h2>
          <p>{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <HeroClientWrapper />
      <div className="mt-8">
        <SearchBar onSearch={setSearchTerm} />
        {initialPosts.length === 0 && !searchTerm ? (
          <div className="text-center py-10">
            <h2 className="text-2xl font-bold">No posts yet!</h2>
            <p className="text-gray-500">Check back later for amazing stories about Seoul food.</p>
          </div>
        ) : initialPosts.length === 0 && searchTerm ? (
          <div className="text-center py-10">
            <h2 className="text-2xl font-bold">No results found for "{searchTerm}"</h2>
            <p className="text-gray-500">Try a different search term or clear your search.</p>
          </div>
        ) : (
          <PostListInfinite initialPosts={initialPosts} postsPerPage={POSTS_PER_PAGE} searchTerm={searchTerm} />
        )}
      </div>
    </main>
  );
}
