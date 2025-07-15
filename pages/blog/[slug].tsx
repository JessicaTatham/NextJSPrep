// pages/blog/[slug].tsx
import { GetStaticPaths, GetStaticProps } from 'next';
import Stack from '../../lib/contentstack';

type BlogPost = {
  title: string;
  body: string;
  slug: string;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const Query = Stack.ContentType('blog_post').Query().toJSON();
  const [entries] = await Query.find();

  const paths = entries.map((entry: BlogPost) => ({
    params: { slug: entry.slug },
  }));

  return {
    paths,
    fallback: false, // or 'blocking' if you want on-demand builds
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;

  const Query = Stack.ContentType('blog_post')
    .Query()
    .where('slug', slug)
    .toJSON();

  const [entries] = await Query.find();

  if (!entries || entries.length === 0) {
    return { notFound: true };
  }

  const post = entries[0];

  return {
    props: {
      post: {
        title: post.title,
        body: post.body,
        slug: post.slug,
      },
    },
    revalidate: 60,
  };
};

export default function BlogPost({ post }: { post: BlogPost }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.body }} />
    </article>
  );
}
