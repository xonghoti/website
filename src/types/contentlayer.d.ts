declare module 'contentlayer/generated' {
  import type { Post as PostType } from 'contentlayer/generated'

  export type Post = PostType
  export const allPosts: Post[]
}