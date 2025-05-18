import { allPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  try {
    return allPosts.map((post) => ({
      id: post._raw.flattenedPath,
    }));
  } catch (e) {
    console.error('Error generating static params:', e);
    return [];
  }
}

const PostPage = async ({ params }: Props) => {
  try {
    const { id } = await params;
    const post = allPosts.find((post) => post._raw.flattenedPath === id);

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
};

export default PostPage;
