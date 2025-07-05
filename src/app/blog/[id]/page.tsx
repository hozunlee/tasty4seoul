import { notFound } from 'next/navigation';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getEngPostById, getAdjacentEngPosts } from '@/entities/post/api/posts';
import { RelatedPosts } from '@/widgets/blog/RelatedPosts';


export default async function PostPage({
  params,
}: { params: Promise<{ id: string }> }) {
  const paramsData = await params;
  const post = await getEngPostById(paramsData.id);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getAdjacentEngPosts(post.created_at, post.id, 3);
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
          priority
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
                  src={String(props.src) || ''}
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