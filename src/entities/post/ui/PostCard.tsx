import Link from 'next/link';
import Image from 'next/image';
import { Post } from '../model/types';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/blog/${post.id}`} className="group block overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={post.image_url || '/placeholder.svg'} // Fallback image
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold leading-tight text-gray-900 dark:text-gray-100 group-hover:text-blue-600">
          {post.title}
        </h3>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{post.desc}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags?.map((tag) => (
            <span key={tag} className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300">
              {tag}
            </span>
          ))}
        </div>
        <time className="mt-4 block text-xs text-gray-500 dark:text-gray-500">
          {new Date(post.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
      </div>
    </Link>
  );
}