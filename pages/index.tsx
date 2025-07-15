// pages/index.tsx
import Link from 'next/link';

export default function Home() {

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>🌯 Space Burrito Chronicles</h1>

      <p>
        Welcome to the galaxys most trusted source for space-faring snacks,
        cosmic conspiracy theories, and extraterrestrial etiquette tips.
      </p>

      <h2>🪐 Explore the Cosmos</h2>
      <ul>
        <li>
          <Link href="/blog">Read our latest dispatches</Link>
        </li>
      </ul>

      <footer style={{ marginTop: '2rem', fontStyle: 'italic' }}>
        🚀 This site is built with Next.js, powered by Contentstack, and
        deployed with AWS Amplify. Who said launch testing cant be delicious?
      </footer>
    </main>
  );
}
