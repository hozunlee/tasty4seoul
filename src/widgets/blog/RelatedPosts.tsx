import { Post } from '@/entities/post/model/types';
import { PostCard } from '@/entities/post/ui/PostCard';

interface RelatedPostsProps {
  posts: Post[];
  title?: string; // Add title prop
}

export function RelatedPosts({ posts, title = 'More to Explore' }: RelatedPostsProps) {
  if (!posts || posts.length === 0) {
    return null; // Don't render if no related posts
  }

  return (
    <section className="mt-16">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          post.id ? <PostCard key={post.id} post={post} /> : null
        ))}
      </div>
    </section>
  );
}