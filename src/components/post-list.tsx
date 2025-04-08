import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import type { Post } from "@/app/lib/types";
import Pagination from "./pagination";
import { Github } from "lucide-react";

interface PostListProps {
  posts: Post[];
  currentPage: number;
  totalPosts: number;
  postsPerPage: number;
}

export default function PostList({
  posts,
  currentPage,
  totalPosts,
  postsPerPage,
}: PostListProps) {
  return (
    <div>
      <div className="space-y-8">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="flex flex-col md:flex-row gap-6 pb-8 border-b border-gray-800"
          >
            <div className="flex-1">
              <Link href={`/posts/${post.slug}`}>
                <h2 className="text-2xl font-bold text-white hover:text-cyan-400 transition-colors mb-2">
                  {post.title}
                </h2>
              </Link>
              <p className="text-gray-400 mb-4">{post.excerpt}</p>
              <div className="flex items-center text-sm text-gray-500">
                <span>{post.author}</span>
                <span className="mx-2">•</span>
                <span>{format(new Date(post.date), "yyyy년 M월 d일")}</span>
              </div>
            </div>

            {post.thumbnail && (
              <Link
                href={`/posts/${post.slug}`}
                className="block w-full md:w-1/3"
              >
                <div className="relative h-48 w-full overflow-hidden rounded-lg">
                  <Image
                    src={post.thumbnail || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                  />
                </div>
              </Link>
            )}

            {post.githubLink && !post.thumbnail && (
              <Link
                href={post.githubLink}
                target="_blank"
                className="block w-full md:w-1/3"
              >
                <div className="relative h-48 w-full overflow-hidden rounded-lg bg-gray-800 flex items-center justify-center">
                  <Github className="h-16 w-16 text-white" />
                </div>
              </Link>
            )}
          </article>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalItems={totalPosts}
        itemsPerPage={postsPerPage}
      />
    </div>
  );
}
