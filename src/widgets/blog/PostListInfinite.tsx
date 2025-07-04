"use client";
import { useState, useEffect, useRef, useCallback } from 'react';
import { Post } from '@/entities/post/model/types';
import { PostCard } from '@/entities/post/ui/PostCard';

interface PostListInfiniteProps {
  initialPosts: Post[];
  postsPerPage: number;
  searchTerm?: string; // Add searchTerm prop
}

export function PostListInfinite({ initialPosts, postsPerPage, searchTerm }: PostListInfiniteProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [hasMore, setHasMore] = useState(initialPosts.length === postsPerPage);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(initialPosts.length);

  const loadMorePosts = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('limit', String(postsPerPage));
      queryParams.append('offset', String(offsetRef.current));
      if (searchTerm) {
        queryParams.append('q', searchTerm);
      }
      const response = await fetch(`/api/search?${queryParams.toString()}`); // Use /api/search
      if (!response.ok) {
        throw new Error('Failed to fetch more posts');
      }
      const newPosts: Post[] = await response.json();

      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      offsetRef.current += newPosts.length;
      setHasMore(newPosts.length === postsPerPage);
    } catch (error) {
      console.error('Error loading more posts:', error);
      // Optionally, show an error message to the user
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, postsPerPage, searchTerm]); // Add searchTerm to dependencies

  // Reset posts and offset when searchTerm changes
  useEffect(() => {
    setPosts(initialPosts);
    setHasMore(initialPosts.length === postsPerPage);
    offsetRef.current = initialPosts.length;
  }, [initialPosts, postsPerPage, searchTerm]); // Depend on initialPosts and searchTerm

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          // When the target is intersecting and we have more posts to load and not currently loading
          loadMorePosts();
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the target is visible
    );

    const currentObserverRef = observerRef.current;

    if (currentObserverRef) {
      observer.observe(currentObserverRef);
    }

    return () => {
      if (currentObserverRef) {
        observer.unobserve(currentObserverRef);
      }
    };
  }, [loadMorePosts, hasMore, loading]); // Add loading to dependencies to re-observe when loading state changes

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        post.id ? <PostCard key={post.id} post={post} /> : null
      ))}
      {loading && (
        <div className="col-span-full text-center py-4">
          <p>Loading more posts...</p>
        </div>
      )}
      {!hasMore && posts.length > 0 && (
        <div className="col-span-full text-center py-4 text-gray-500">
          <p>You've reached the end of the posts!</p>
        </div>
      )}
      <div ref={observerRef} className="col-span-full h-1" /> {/* Intersection Observer target */}
    </div>
  );
}