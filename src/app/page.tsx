import HeroBanner from "@/components/hero-banner";
import PostList from "@/components/post-list";
import Sidebar from "@/components/sidebar";
import { getPosts } from "@/app/lib/posts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const dynamic = "force-dynamic";

interface Props {
  searchParams?: {
    page?: string;
    category?: string;
  };
}

export default async function Home({ searchParams = {} }: Props) {
  const params = await Promise.resolve(searchParams);
  const page = params.page ?? "1";
  const currentPage = parseInt(page, 10);
  const postsPerPage = 5;
  const category = params.category ?? "all";

  const { posts, total } = await getPosts({
    page: currentPage,
    limit: postsPerPage,
    category: category !== "all" ? category : undefined,
  });

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <HeroBanner />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-2/3">
            <Tabs defaultValue="all" className="mb-8">
              <TabsList className="mb-4">
                <TabsTrigger value="all">전체</TabsTrigger>
                <TabsTrigger value="development">개발</TabsTrigger>
                <TabsTrigger value="design">디자인</TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                <PostList
                  posts={posts}
                  currentPage={currentPage}
                  totalPosts={total}
                  postsPerPage={postsPerPage}
                />
              </TabsContent>
              <TabsContent value="development">
                <PostList
                  posts={posts.filter(
                    (post) => post.category === "development"
                  )}
                  currentPage={currentPage}
                  totalPosts={
                    posts.filter((post) => post.category === "development")
                      .length
                  }
                  postsPerPage={postsPerPage}
                />
              </TabsContent>
              <TabsContent value="design">
                <PostList
                  posts={posts.filter((post) => post.category === "design")}
                  currentPage={currentPage}
                  totalPosts={
                    posts.filter((post) => post.category === "design").length
                  }
                  postsPerPage={postsPerPage}
                />
              </TabsContent>
            </Tabs>
          </div>
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
