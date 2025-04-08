import Link from "next/link";
import Image from "next/image";
import { getPopularPosts, getRecentComments } from "@/app/lib/posts";
import type { Post, Comment } from "@/app/lib/types";

export default async function Sidebar() {
  const popularPosts = await getPopularPosts();
  const recentComments = await getRecentComments();

  return (
    <aside className="w-full md:w-1/3 space-y-8">
      {/* Popular Posts */}
      <div className="bg-gray-900 rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4">인기있는 글</h3>
        <div className="space-y-4">
          {popularPosts.map((post: Post) => (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              className="block group"
            >
              <div className="flex gap-3">
                {post.thumbnail && (
                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded">
                    <Image
                      src={post.thumbnail || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <h4 className="font-medium text-white group-hover:text-cyan-400 transition-colors">
                    {post.title}
                  </h4>
                  <p className="text-sm text-gray-400">{post.author}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Comments */}
      <div className="bg-gray-900 rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4">최근 댓글</h3>
        <div className="space-y-4">
          {recentComments.map((comment: Comment) => (
            <div
              key={comment.id}
              className="border-b border-gray-800 pb-4 last:border-0 last:pb-0"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gray-800">
                  {comment.avatar ? (
                    <Image
                      src={comment.avatar || "/placeholder.svg"}
                      alt={comment.author}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-xs text-white">
                      {comment.author.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <span className="font-medium text-white">{comment.author}</span>
              </div>
              <p className="text-sm text-gray-400">{comment.content}</p>
              <Link
                href={`/posts/${comment.postSlug}`}
                className="mt-2 block text-xs text-cyan-400 hover:underline"
              >
                {comment.postTitle}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="bg-gray-900 rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4">태그</h3>
        <div className="flex flex-wrap gap-2">
          {[
            "Frontend",
            "Server",
            "Product Design",
            "UX/UI",
            "DevOps",
            "Mobile",
          ].map((tag) => (
            <Link
              key={tag}
              href={`/tags/${tag.toLowerCase().replace(/\s+/g, "-")}`}
              className="px-3 py-1 bg-gray-800 text-sm text-gray-300 rounded-full hover:bg-cyan-900 hover:text-white transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
