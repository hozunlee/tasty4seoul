import { supabase } from '@/shared/api/supabase';
import { Post } from '../model/types';

export async function getEngPosts(limit?: number, offset?: number, searchTerm?: string): Promise<Post[]> {
  try {
    let query = supabase
      .from('eng_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (searchTerm) {
      query = query.or(`title.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%`);
    }

    if (limit !== undefined) {
      query = query.limit(limit);
    }
    if (offset !== undefined) {
      query = query.range(offset, offset + (limit || 0) - 1); // Supabase range is inclusive
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching posts:', error);
      throw new Error('Could not fetch blog posts.');
    }
    return data || [];
  } catch (error) {
    console.error('An unexpected error occurred:', error);
    throw error;
  }
}

export async function getEngPostById(id: string): Promise<Post | null> {
  try {
    const { data, error } = await supabase
      .from('eng_posts')
      .select('*')
      .eq('id', id)
      .single(); // .single() ensures we get one record or null

    if (error) {
      if (error.code === 'PGRST116') {
        // This code means no rows were found, which is not a server error.
        console.log(`Post with id ${id} not found.`);
        return null;
      }
      console.error(`Error fetching post with id ${id}:`, error);
      throw new Error(`Could not fetch blog post with id ${id}.`);
    }

    return data;
  } catch (error) {
    console.error('An unexpected error occurred:', error);
    throw error;
  }
}



export async function getAdjacentEngPosts(currentPostCreatedAt: string, currentPostId: string, limit: number = 3): Promise<Post[]> {
  try {
    // Get previous posts (older than current, ordered descending by created_at)
    const { data: prevData, error: prevError } = await supabase
      .from('eng_posts')
      .select('*')
      .lt('created_at', currentPostCreatedAt)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (prevError) {
      console.error('Error fetching previous posts:', prevError);
    }

    // Get next posts (newer than current, ordered ascending by created_at)
    const { data: nextData, error: nextError } = await supabase
      .from('eng_posts')
      .select('*')
      .gt('created_at', currentPostCreatedAt)
      .order('created_at', { ascending: true })
      .limit(limit);

    if (nextError) {
      console.error('Error fetching next posts:', nextError);
    }

    console.log('getAdjacentEngPosts - prevData:', prevData);
    console.log('getAdjacentEngPosts - nextData:', nextData);

    // Combine and filter out the current post (though it should already be excluded by lt/gt)
    const combinedPosts = [...(prevData || []), ...(nextData || [])];
    const uniquePosts = Array.from(new Map(combinedPosts.map(post => [post.id, post])).values());

    // Sort by created_at to maintain a consistent order (e.g., newest first)
    uniquePosts.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    // Ensure we don't return more than 3 posts (or specified limit)
    const finalPosts = uniquePosts.slice(0, limit);
    console.log('getAdjacentEngPosts - finalPosts:', finalPosts);
    return finalPosts;

  } catch (error) {
    console.error('An unexpected error occurred while fetching adjacent posts:', error);
    return [];
  }
}
