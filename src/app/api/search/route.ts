import { NextResponse } from 'next/server';
import { getEngPosts } from '@/entities/post/api/posts';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get('limit')) || 6;
  const offset = Number(searchParams.get('offset')) || 0;
  const searchTerm = searchParams.get('q') || undefined;

  try {
    const posts = await getEngPosts(limit, offset, searchTerm);
    return NextResponse.json(posts);
  } catch (error) {
    console.error('API Error fetching search results:', error);
    return NextResponse.json({ message: 'Failed to fetch search results' }, { status: 500 });
  }
}