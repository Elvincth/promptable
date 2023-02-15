import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-[100vh] flex-col items-center justify-between p-20">
        <div className="w-full" />

        <div className="relative flex items-center justify-center px-4">
          <Image
            className="relative"
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
          <div
            style={{
              padding: "2rem",
              fontSize: "4rem",
            }}
          >
            +
          </div>
          <Image
            src={"/img/promptable-icon.png"}
            alt={"Promptable Logo"}
            className="relative"
            width={100}
            height={100}
          />
        </div>
        <div className="grid w-full grid-cols-4 gap-8">
          <a
            href="https://docs-promptable.vercel.app/"
            className="rounded border p-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className="text-2xl font-semibold">
              Docs <span>-&gt;</span>
            </h2>
            <p className="text-xl">Read the Promptable Docs!</p>
          </a>
          <Link href="/chat" className="rounded border p-2">
            <h2 className="text-2xl font-semibold">
              Chat Bot<span>-&gt;</span>
            </h2>
            <p className="text-xl">Read the Promptable Docs!</p>
          </Link>
        </div>
      </main>
    </>
  );
};

export default Home;