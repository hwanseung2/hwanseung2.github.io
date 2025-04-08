import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/app/lib/types";

interface RelatedPostsProps {
  posts: Post[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <div>
      <h3 className="text-xl font-bold text-white mb-6">관련 글</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/posts/${post.slug}`}
            className="block group"
          >
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              {post.thumbnail && (
                <div className="relative h-40 w-full">
                  <Image
                    src={post.thumbnail || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-4">
                <h4 className="font-medium text-white group-hover:text-cyan-400 transition-colors">
                  {post.title}
                </h4>
                <p className="text-sm text-gray-400 mt-2">{post.excerpt}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
