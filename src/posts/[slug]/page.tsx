import { getPostBySlug, getRelatedPosts } from "@/app/lib/posts";
import { notFound } from "next/navigation";
import Image from "next/image";
import { format } from "date-fns";
import Markdown from "@/components/markdown";
import Sidebar from "@/components/sidebar";
import RelatedPosts from "@/components/related-posts";

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post.slug, post.category);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <article className="w-full md:w-2/3 bg-gray-900 rounded-lg p-6">
          <h1 className="text-4xl font-bold text-white mb-4">{post.title}</h1>
          <div className="flex items-center mb-6">
            <div className="text-sm text-gray-400">
              <p>
                {post.author} • {post.position}
              </p>
              <p>{format(new Date(post.date), "yyyy년 M월 d일")}</p>
            </div>
          </div>

          {post.coverImage && (
            <div className="mb-8">
              <Image
                src={post.coverImage || "/placeholder.svg"}
                alt={post.title}
                width={800}
                height={450}
                className="rounded-lg"
              />
            </div>
          )}

          <div className="prose prose-invert max-w-none">
            <Markdown content={post.content} />
          </div>

          <div className="mt-12">
            <RelatedPosts posts={relatedPosts} />
          </div>
        </article>

        <Sidebar />
      </div>
    </div>
  );
}
