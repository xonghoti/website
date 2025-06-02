import { allPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export async function generateStaticParams() {
  const paths: { slug: string[] }[] = [];

  // Individual posts
  allPosts.forEach((post) => {
    paths.push({ slug: post.path.split("/") });
  });

  // Categories
  const categories = new Set(allPosts.map((post) => post.category).filter(Boolean));
  categories.forEach((category) => {
    paths.push({ slug: [category!] });
  });

  // Subcategories
  allPosts.forEach((post) => {
    if (post.category && post.subcategory) {
      paths.push({ slug: [post.category, post.subcategory] });
    }
  });

  return paths;
}

interface PageProps {
  params: Promise<{ slug: string[] }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page(props: PageProps) {
  const { slug } = await props.params;
  const slugPath = slug.join("/");

  // First, try to find an exact post match
  const post = allPosts.find((post) => post.path === slugPath);
  
  if (post) {
    // Render individual post
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-sm text-gray-500 mb-4">
          {post.formattedDate} | Author: {post.author}
        </p>
        <div
          className="prose prose-slate dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.body.html }}
        />
      </div>
    );
  }

  // If no post found, check if it's a category/subcategory
  const filteredPosts = allPosts.filter((post) => {
    if (slug.length === 1) {
      // Category page (e.g., /blog/21lessons)
      return post.category === slug[0];
    } else if (slug.length === 2) {
      // Subcategory page (e.g., /blog/21lessons/economics)
      return post.category === slug[0] && post.subcategory === slug[1];
    }
    return false;
  });

  if (filteredPosts.length > 0) {
    // Render category/subcategory listing
    const title = slug.length === 2 
      ? `${slug[0]} - ${slug[1]}`
      : slug[0];

    return (
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-8 capitalize">{title}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
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
                      <span
                        key={tag}
                        className="text-xs bg-secondary px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {post.summary && (
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                    {post.summary}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // If neither post nor category found, return 404
  return notFound();
}