import { NextResponse } from 'next/server';
import { getEngPosts } from '@/entities/post/api/posts';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get('limit')) || 6;
  const offset = Number(searchParams.get('offset')) || 0;

  try {
    const posts = await getEngPosts(limit, offset);
    return NextResponse.json(posts);
  } catch (error) {
    console.error('API Error fetching posts:', error);
    return NextResponse.json({ message: 'Failed to fetch posts' }, { status: 500 });
  }
}