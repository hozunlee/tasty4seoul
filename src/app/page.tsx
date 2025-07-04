import { getEngPosts } from '@/entities/post/api/posts';
import { PostCard } from '@/entities/post/ui/PostCard';
import { MapWithPosts } from '@/features/map/MapWithPosts';
import HeroClientWrapper from '@/shared/ui/HeroClientWrapper';
import BrandIdentity from '@/shared/ui/BrandIdentity';

export default async function Home() {
  // Fetch only the latest 3 posts
  const latestPosts = await getEngPosts(3);

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="container mx-auto py-8 px-4">
        <header className="text-center mb-12">
          <HeroClientWrapper />
        </header>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Latest Posts on Map</h2>
          <div className="rounded-xl overflow-hidden shadow-lg">
            <MapWithPosts posts={latestPosts} />
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Latest Posts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
            {latestPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>

        {/* Brand Identity Section */}
        <div className="container mx-auto px-4">
          <BrandIdentity />
        </div>
      </main>
    </div>
  );
}

