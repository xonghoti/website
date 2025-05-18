import React from "react";
import { allPosts } from "contentlayer/generated";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const BlogPage = async () => {
  const posts = allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const categories = Array.from(new Set(posts.map(post => post.category).filter(Boolean)));

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Categories</h2>
        <div className="flex flex-wrap gap-4">
          {categories.map((category) => (
            <Link 
              key={category} 
              href={`/blog/${category}`}
              className="px-4 py-2 bg-secondary rounded-md hover:bg-secondary/80 transition-colors"
            >
              {category}
            </Link>
          ))}
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Featured Content</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl">
                <Link href="/blog/whitepaper" className="hover:underline">
                  Bitcoin Whitepaper
                </Link>
              </CardTitle>
              <CardDescription>The foundational document of Bitcoin</CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl">
                <Link href="/blog/21lessons" className="hover:underline">
                  21 Lessons
                </Link>
              </CardTitle>
              <CardDescription>Essential lessons about Bitcoin</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Latest Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Card key={post._id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">
                  <Link href={post.url} className="hover:underline">
                    {post.title}
                  </Link>
                </CardTitle>
                <CardDescription>{post.formattedDate}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Author: {post.author}</p>
                {post.tags && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-secondary px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
