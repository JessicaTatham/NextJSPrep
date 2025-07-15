// pages/blog/[slug].tsx

import { GetStaticPaths, GetStaticProps } from 'next';
import Stack from '../../lib/contentstack'; // your configured Contentstack SDK

type BlogPost = {
  title: string;
  body: string;
  slug: string;
};

type Props = {
  post: BlogPost;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const [entries] = await Stack.ContentType('blog_post')
    .Query()
    .only(['slug']) // ← Use your actual field name here
    .toJSON()
    .find();

  const paths = entries.map((entry: BlogPost) => ({
    params: { slug: entry.slug },
  }));

  console.log('🛠️ Static Paths Generated:', paths);

  return {
    paths,
    fallback: false, // or 'blocking' if using ISR
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slugParam = params?.slug;

  const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;

  if (!slug) {
    return { notFound: true };
  }

  const [entries] = await Stack.ContentType('blog_post')
    .Query()
    .where('slug', slug)
    .toJSON()
    .find();

  if (!entries.length) {
    return { notFound: true };
  }

  return {
    props: {
      post: entries[0],
    },
  };
};

const BlogPostPage = ({ post }: Props) => {
  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.body }} />
    </article>
  );
};

export default BlogPostPage;
