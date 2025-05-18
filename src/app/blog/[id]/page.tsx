import { allPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  try {
    return allPosts.map((post) => ({
      id: post._raw.sourceFileName.replace(/\.md$/, ''),
    }));
  } catch (e) {
    console.error('Error generating static params:', e);
    return [];
  }
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page(props: PageProps) {
  const resolvedParams = await props.params;
  const { id } = resolvedParams;
  
  try {
    let post = allPosts.find((post) => post._raw.sourceFileName.replace(/\.md$/, '') === id);
    
    if (!post) {
      post = allPosts.find((post) => post._raw.flattenedPath === id);
    }

    if (!post) {
      return notFound();
    }

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
  } catch (e) {
    console.error('Error rendering post:', e);
    return notFound();
  }
}
