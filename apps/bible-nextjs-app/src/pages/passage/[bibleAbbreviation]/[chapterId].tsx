import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const { bibleAbbreviation, chapterId } = router.query;

  return (
    <>
      <Head>
        <title>Bible Next.js App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/bible.png" />
      </Head>

      <main>
        <div>bibleAbbreviation: {bibleAbbreviation}</div>
        <div>chapterId: {chapterId}</div>
      </main>
    </>
  );
}
