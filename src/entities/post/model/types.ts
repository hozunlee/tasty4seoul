export interface Post {
  id: string;
  title: string;
  content: string;
  desc: string;
  image_url: string; // image -> image_url for clarity
  tags: string[];
  address?: string;
  created_at: string;
  updated_at: string;
}