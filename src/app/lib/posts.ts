import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Post, Comment } from "./types";

const postsDirectory = path.join(process.cwd(), "src/content/posts");
// /Users/hwanseungyoo/Documents/github/tech-blog/src/content/posts
export async function getPosts({
  page = 1,
  limit = 5,
  category,
}: {
  page?: number;
  limit?: number;
  category?: string;
}) {
  // This would normally fetch from a database or API
  // For demo purposes, we'll read from the filesystem

  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title,
      excerpt: data.excerpt,
      content,
      date: data.date,
      author: data.author,
      position: data.position,
      category: data.category,
      thumbnail: data.thumbnail,
      coverImage: data.coverImage,
      githubLink: data.githubLink,
      views: data.views || 0,
    } as Post;
  });

  // Sort posts by date (newest first)
  const sortedPosts = allPosts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  // Filter by category if provided
  const filteredPosts = category
    ? sortedPosts.filter((post) => post.category === category)
    : sortedPosts;

  // Calculate pagination
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

  return {
    posts: paginatedPosts,
    total: filteredPosts.length,
  };
}

export async function getPostBySlug(slug: string) {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title,
      excerpt: data.excerpt,
      content,
      date: data.date,
      author: data.author,
      position: data.position,
      category: data.category,
      thumbnail: data.thumbnail,
      coverImage: data.coverImage,
      githubLink: data.githubLink,
      views: data.views || 0,
    } as Post;
  } catch {
    return null;
  }
}

export async function getRelatedPosts(currentSlug: string, category: string) {
  const { posts } = await getPosts({ limit: 10 });

  return posts
    .filter((post) => post.slug !== currentSlug && post.category === category)
    .slice(0, 2);
}

export async function getPopularPosts() {
  const { posts } = await getPosts({ limit: 20 });

  // Sort by views (most viewed first)
  return posts.sort((a, b) => b.views - a.views).slice(0, 5);
}

export async function getRecentComments() {
  // This would normally fetch from a database or API
  // For demo purposes, we'll return mock data

  const comments: Comment[] = [
    {
      id: "1",
      author: "신나는코끼리",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "토스페이먼트 개발자가 되려면 어떤 기술 스택을 공부해야 할까요?",
      postSlug: "sample-post",
      postTitle: "토스 프론트엔드에 이력서 없이 리포지토리 링크로 지원하세요",
      date: "2025-04-07",
    },
    {
      id: "2",
      author: "eogkr",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "토스 프론트엔드에서 어떤 라이브러리를 많이 사용하시나요?",
      postSlug: "sample-post",
      postTitle: "토스 프론트엔드에 이력서 없이 리포지토리 링크로 지원하세요",
      date: "2025-04-06",
    },
    {
      id: "3",
      author: "유쾌한도마뱀",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "잘 보고 갑니다! 👍 앞으로도 좋은 글 부탁드립니다",
      postSlug: "sample-post",
      postTitle: "토스 프론트엔드에 이력서 없이 리포지토리 링크로 지원하세요",
      date: "2025-04-05",
    },
    {
      id: "4",
      author: "제비꽃",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "아주 실용적인 내용이네요. 감사합니다!",
      postSlug: "sample-post",
      postTitle: "토스 프론트엔드에 이력서 없이 리포지토리 링크로 지원하세요",
      date: "2025-04-04",
    },
  ];

  return comments;
}
