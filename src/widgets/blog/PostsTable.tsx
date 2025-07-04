
'use client';

import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/shared/ui/table";
import { Post } from "@/entities/post/model/types";
import { useRouter } from 'next/navigation';

interface PostsTableProps {
  posts: Post[];
}

export function PostsTable({ posts }: PostsTableProps) {
  const router = useRouter();

  const handleRowClick = (id: string) => {
    router.push(`/blog/${id}`);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Tags</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post) => (
          <TableRow 
            key={post.id} 
            onClick={() => handleRowClick(post.id)}
            className="cursor-pointer"
          >
            <TableCell>{post.title}</TableCell>
            <TableCell>{post.address}</TableCell>
            <TableCell>{post.tags.join(', ')}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
