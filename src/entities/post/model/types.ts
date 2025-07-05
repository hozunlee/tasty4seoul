export interface Post {
  id: string;
  title: string;
  content: string;
  desc: string;
  image_url: string; // image -> image_url for clarity
  tags: string[];
  address?: string;
  latitude?: number; // 추가
  longitude?: number; // 추가
  created_at: string;
  updated_at: string;
}