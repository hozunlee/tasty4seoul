'use client';

import { useState, useEffect } from 'react';
import { getEngPosts } from '@/entities/post/api/posts';
import { PostListInfinite } from '@/widgets/blog/PostListInfinite';
import { SearchBar } from '@/widgets/blog/SearchBar';
import { BlogPostSkeleton } from '@/shared/ui/skeletons/BlogPostSkeleton';
import { Post } from '@/entities/post/model/types';

const POSTS_PER_PAGE = 6;

export default function BlogClient() {
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
      <div className="mt-8">
        <SearchBar onSearch={setSearchTerm} disabled={true} />
        <div className="mt-8">
          <BlogPostSkeleton />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8 text-center py-10 text-red-500">
        <h2 className="text-2xl font-bold">An Error Occurred</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <SearchBar onSearch={setSearchTerm} disabled={loadingInitialPosts} />
      {initialPosts.length === 0 && !searchTerm ? (
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold">No posts yet!</h2>
          <p className="text-gray-500">Check back later for amazing stories about Seoul food.</p>
        </div>
      ) : initialPosts.length === 0 && searchTerm ? (
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold">No results found for &quot;{searchTerm}&quot;</h2>
          <p className="text-gray-500">Try a different search term or clear your search.</p>
        </div>
      ) : (
        <PostListInfinite 
          initialPosts={initialPosts} 
          postsPerPage={POSTS_PER_PAGE} 
          searchTerm={searchTerm} 
        />
      )}
    </div>
  );
}
