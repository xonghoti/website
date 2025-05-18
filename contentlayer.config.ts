import { defineDocumentType, makeSource } from 'contentlayer/source-files'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.md`,
  contentType: 'markdown',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    date: {
      type: 'date',
      required: true,
    },
    author: {
      type: 'string',
      required: true,
    },
    category: {
      type: 'string',
      required: false,
    },
    subcategory: {
      type: 'string',
      required: false,
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
      required: false,
    },
    summary: {
      type: 'string',
      required: false,
    }
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (post) => `/blog/${post._raw.flattenedPath}`,
    },
    path: {
      type: 'string',
      resolve: (post) => post._raw.flattenedPath,
    },
    category_url: {
      type: 'string',
      resolve: (post) => post.category ? `/blog/${post.category}` : null,
    },
    subcategory_url: {
      type: 'string',
      resolve: (post) => post.category && post.subcategory ? `/blog/${post.category}/${post.subcategory}` : null,
    },
    formattedDate: {
      type: 'string',
      resolve: (post) => {
        try {
          return new Date(post.date).toLocaleDateString()
        } catch (e) {
          console.error('Error formatting date:', e)
          return ''
        }
      },
    },
  },
}))

export default makeSource({
  contentDirPath: 'posts',
  documentTypes: [Post],
})
