// scripts/backfill-coordinates.ts
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import path from 'path';
import { geocodeAddress } from '../src/shared/lib/google-maps/geocoding';

// Load environment variables from .env file
config({ path: path.resolve(__dirname, '../.env') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey || supabaseServiceKey === 'YOUR_SUPABASE_SERVICE_ROLE_KEY_HERE') {
  console.error('Supabase URL or Service Role Key is not configured. Please check your .env file.');
  process.exit(1);
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// Function to introduce a delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function backfillCoordinates() {
  console.log('Starting backfill process...');

  try {
    // 1. Fetch posts where latitude is null and address is not empty
    const { data: posts, error } = await supabaseAdmin
      .from('eng_posts')
      .select('id, address')
      .is('latitude', null)
      .not('address', 'is', null);

    if (error) {
      console.error('Error fetching posts:', error);
      return;
    }

    if (!posts || posts.length === 0) {
      console.log('No posts found that need coordinate backfilling. All done!');
      return;
    }

    console.log(`Found ${posts.length} posts to backfill.`);

    // 2. Loop through each post and update it
    for (const post of posts) {
      if (!post.address) continue;

      console.log(`Geocoding address for post ID ${post.id}: "${post.address}"`);
      const coordinates = await geocodeAddress(post.address);

      if (coordinates) {
        const { error: updateError } = await supabaseAdmin
          .from('eng_posts')
          .update({
            latitude: coordinates.lat,
            longitude: coordinates.lng,
          })
          .eq('id', post.id);

        if (updateError) {
          console.error(`Failed to update post ID ${post.id}:`, updateError.message);
        } else {
          console.log(`Successfully updated post ID ${post.id}.`);
        }
      } else {
        console.warn(`Could not find coordinates for address: "${post.address}" (Post ID: ${post.id})`);
      }

      // 3. Add a delay to avoid hitting API rate limits
      await delay(200); // 200ms delay between each request
    }

    console.log('Backfill process completed.');
  } catch (err) {
    console.error('An unexpected error occurred during the backfill process:', err);
  }
}

backfillCoordinates();
