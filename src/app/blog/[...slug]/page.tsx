import { allPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

interface Props {
  params: {
    slug: string[];
  };
}

export async function generateStaticParams() {
  const paths: { slug: string[] }[] = [];
  
  // Add individual post paths
  allPosts.forEach((post) => {
    paths.push({ slug: post.path.split('/') });
  });

  // Add category paths
  const categories = new Set(allPosts.map(post => post.category).filter(Boolean));
  categories.forEach(category => {
    paths.push({ slug: [category!] });
  });

  // Add subcategory paths
  allPosts.forEach(post => {
    if (post.category && post.subcategory) {
      paths.push({ slug: [post.category, post.subcategory] });
    }
  });

  return paths;
}

const BlogSlugPage = async ({ params }: Props) => {
  const { slug } = params;
  const slugPath = slug.join('/');

  // Check if this is a direct post match
  const post = allPosts.find((post) => post.path === slugPath);
  if (post) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-sm text-gray-500 mb-4">
          {post.formattedDate} | Author: {post.author}
        </p>
        <div className="prose prose-slate dark:prose-invert" 
          dangerouslySetInnerHTML={{ __html: post.body.html }} 
        />
      </div>
    );
  }

  // Check if this is a category/subcategory listing
  const filteredPosts = allPosts.filter(post => {
    if (slug.length === 1) {
      return post.category === slug[0];
    } else if (slug.length === 2) {
      return post.category === slug[0] && post.subcategory === slug[1];
    }
    return false;
  });

  if (filteredPosts.length > 0) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-8">
          {slug.length === 2 ? `${slug[0]} - ${slug[1]}` : slug[0]}
        </h1>
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
    );
  }

  return notFound();
};

export default BlogSlugPage;
