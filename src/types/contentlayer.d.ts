declare module 'contentlayer/generated' {
  export interface Post {
    title: string;
    date: string;
    author: string;
    category?: string;
    subcategory?: string;
    tags?: string[];
    summary?: string;
    body: {
      raw: string;
      html: string;
    };
    _id: string;
    _raw: {
      sourceFilePath: string;
      sourceFileName: string;
      sourceFileDir: string;
      contentType: string;
      flattenedPath: string;
    };
    type: 'Post';
    url: string;
    path: string;
    category_url: string | null;
    subcategory_url: string | null;
    formattedDate: string;
  }
  
  export const allPosts: Post[]
}