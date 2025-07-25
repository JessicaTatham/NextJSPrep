// pages/blog.tsx
import Link from 'next/link';
import Stack from '../lib/contentstack';

type BlogPost = {
  title: string;
  slug: string;
  uid: string;
};

export async function getStaticProps() {

  const Query = Stack.ContentType('blog_post').Query().toJSON();
  const [entries] = await Query.find();

  const posts = entries.map((entry: BlogPost) => ({
    title: entry.title,
    slug: entry.slug,
    uid: entry.uid,
  }));

  return {
    props: { posts },
    revalidate: 60,
  };
}

export default function Blog({ posts }: { posts: BlogPost[] }) {
  return (
    <div>
      <h1>Blog</h1>
      {posts.map((post) => (
        <div key={post.uid}>
          <h2>
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </h2>
        </div>
      ))}
    </div>
  );
}