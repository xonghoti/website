declare module 'contentlayer/generated' {
  import type { Post as PostType } from 'contentlayer/generated'

  export interface Post extends PostType {
    category?: string;
    subcategory?: string;
    tags?: string[];
    path: string;
    category_url: string | null;
    subcategory_url: string | null;
  }
  
  export const allPosts: Post[]
}