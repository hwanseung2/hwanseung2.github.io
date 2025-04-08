export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  position?: string;
  category: string;
  thumbnail?: string;
  coverImage?: string;
  githubLink?: string;
  views: number;
}

export interface Comment {
  id: string;
  author: string;
  avatar?: string;
  content: string;
  postSlug: string;
  postTitle: string;
  date: string;
}
