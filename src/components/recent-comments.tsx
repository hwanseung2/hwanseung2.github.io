import Link from "next/link";
import { getRecentComments } from "@/app/lib/posts";
import { formatDate } from "@/app/lib/utils";
import type { Comment } from "@/app/lib/types";

export default async function RecentComments() {
  const recentComments = await getRecentComments();

  return (
    <div className="border border-gray-800 rounded-lg overflow-hidden">
      <div className="bg-gray-900/50 px-5 py-4 border-b border-gray-800">
        <h3 className="font-medium text-lg">최근 댓글</h3>
      </div>
      <div className="p-5">
        <ul className="space-y-4">
          {recentComments.map((comment: Comment) => (
            <li
              key={comment.id}
              className="pb-4 border-b border-gray-800 last:border-0 last:pb-0"
            >
              <Link href={`/blog/${comment.postSlug}`} className="block group">
                <p className="text-sm line-clamp-2 text-gray-300 group-hover:text-[#00E8FC] transition-colors">
                  {comment.content}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm font-medium">{comment.author}</span>
                  <span className="text-xs text-gray-500">•</span>
                  <span className="text-sm text-gray-400">
                    {formatDate(comment.date)}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                  포스트: {comment.postTitle}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
