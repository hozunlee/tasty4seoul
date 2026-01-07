import { NextResponse } from 'next/server';
import { getEngPosts } from '@/entities/post/api/posts';
import { geocodeAddress } from '@/shared/lib/google-maps/geocoding';
import { createClient } from '@supabase/supabase-js';
import { Post } from '@/entities/post/model/types';

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

export async function POST(request: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    return NextResponse.json({ message: 'Server configuration error' }, { status: 500 });
  }
  // Create a new Supabase client with the service role key for admin-level access
  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

  try {
    const postData: Partial<Post> = await request.json();

    // If an address is provided, geocode it
    if (postData.address) {
      const coordinates = await geocodeAddress(postData.address);
      if (coordinates) {
        postData.latitude = coordinates.lat;
        postData.longitude = coordinates.lng;
      }
    }

    // Insert the new post data into the database
    const { data, error } = await supabaseAdmin
      .from('eng_posts')
      .insert([postData])
      .select()
      .single();

    if (error) {
      console.error('Supabase error creating post:', error);
      return NextResponse.json({ message: 'Failed to create post', error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('API Error creating post:', error);
    return NextResponse.json({ message: 'Failed to create post' }, { status: 500 });
  }
}