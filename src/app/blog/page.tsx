import HeroClientWrapper from '@/shared/ui/HeroClientWrapper';
import BlogClient from './BlogClient';


// Re-export metadata from the separate metadata file
import { metadata as blogMetadata } from './metadata';

export { blogMetadata as metadata };

export default function BlogPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <HeroClientWrapper />
      <BlogClient />
    </main>
  );
}
