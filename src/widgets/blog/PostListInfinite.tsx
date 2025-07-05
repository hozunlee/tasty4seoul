"use client";
import { useState, useEffect, useRef, useCallback } from 'react';
import { Post } from '@/entities/post/model/types';
import { PostCard } from '@/entities/post/ui/PostCard';
import { BlogPostSkeleton } from '@/shared/ui/skeletons/BlogPostSkeleton';

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
    <div className="space-y-6">
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          post.id ? <PostCard key={post.id} post={post} /> : null
        ))}
      </div>
      
      {loading && <BlogPostSkeleton />}
      
      {!loading && !hasMore && posts.length > 0 && (
        <div className="text-center py-8 text-muted-foreground">
          You&apos;ve reached the end of the list
        </div>
      )}
      
      {!loading && posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No posts found</p>
        </div>
      )}
      
      <div ref={observerRef} className="h-1" />
    </div>
  );
}