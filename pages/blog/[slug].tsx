// pages/blog/[slug].tsx
import { GetStaticProps } from 'next';
import Stack from '../../lib/contentstack';

type BlogPost = {
  title: string;
  body: string;
  slug: string;
};

export async function getStaticPaths() {
  const entries = await Stack.ContentType('blog_post').Query().toJSON().find();

  console.log('Build-time blog post slugs:', entries[0].map(e => e.slug));

  const paths = entries[0].map((entry: BlogPost) => ({
    params: { slug: entry.slug.replace(/^\//, '') }, // strip leading slash if any
  }));

  return {
    paths,
    fallback: false,
  };
}

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
