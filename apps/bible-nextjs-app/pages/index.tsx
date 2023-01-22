import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Bible Next.js App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/bible.png" />
      </Head>
      <main>
        <h1 className="text-3xl font-bold underline">Bible</h1>
        <div className="container mx-auto mt-20 space-x-2">
          <button className="btn">Button</button>
          <button className="btn btn-primary">Button</button>
          <button className="btn btn-secondary">Button</button>
          <button className="btn btn-accent">Button</button>
          <button className="btn btn-ghost">Button</button>
          <button className="btn btn-link">Button</button>
        </div>
      </main>
    </>
  );
}
