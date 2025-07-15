import Stack from '../lib/contentstack';

type BlogPost = {
  uid: string;
  title: string;
  body: string;
};

export async function getStaticProps() {
  const Query = Stack.ContentType('blog_post').Query().toJSON();

  const [entries] = await Query.find();

  return {
    props: {
      posts: entries,
    },
    revalidate: 60, // ISR - optional
  };
}

export default function Blog({ posts }: { posts: BlogPost[] }) {
  return (
    <div>
      <h1>Blog</h1>
      {posts.map((post: BlogPost) => (
        <div key={post.uid}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}