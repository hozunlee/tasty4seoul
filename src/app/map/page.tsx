import { getEngPosts } from '@/entities/post/api/posts';
import { MapWithPosts } from '@/features/map/MapWithPosts';
import HeroClientWrapper from '@/shared/ui/HeroClientWrapper';
import { PostsTable } from '@/widgets/blog/PostsTable';

export default async function MapPage() {
  const allPosts = await getEngPosts();

  return (
    <div className="min-h-screen bg-slate-50">
              <header className="text-center mb-12">
                <HeroClientWrapper />
              </header>
      <main className="container mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Explore Seoul's Best on the Map
        </h1>

        <section className="mb-12">
          <div className="rounded-xl overflow-hidden shadow-lg">
            <MapWithPosts posts={allPosts} />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">All Posts</h2>
          <div className="rounded-xl overflow-hidden shadow-lg bg-white">
            <PostsTable posts={allPosts} />
          </div>
        </section>
      </main>
    </div>
  );
}
