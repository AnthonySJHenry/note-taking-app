import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/notes");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 dark:bg-black">
      <main className="flex max-w-2xl flex-col items-center text-center">
        <h1 className="mb-6 text-5xl font-bold tracking-tight text-black dark:text-zinc-50">
          Welcome to Anthony's Note-Taking App
        </h1>
        <p className="mb-8 text-xl text-zinc-600 dark:text-zinc-400">
          A full-stack Next.js application with authentication and note-taking
          capabilities.
        </p>
        <div className="flex gap-4">
          <Link
            href="/login"
            className="rounded-md bg-black px-6 py-3 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200"
          >
            Get Started
          </Link>
          <a
            href="https://github.com/AnthonySJHenry/note-taking-app"
            target="_blank"
            rel="nofollow"
            className="rounded-md border border-zinc-300 px-6 py-3 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            View Source
          </a>
        </div>
        <div className="mt-16 rounded-lg border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="mb-4 text-2xl font-semibold text-black dark:text-zinc-50">
            Features
          </h2>
          <ul className="space-y-2 text-left text-zinc-600 dark:text-zinc-400">
            <li>✓ Secure authentication with Supabase</li>
            <li>✓ Create, read, update, and delete notes</li>
            <li>✓ Row-level security for data privacy</li>
            <li>✓ Modern UI with Tailwind CSS v4</li>
            <li>✓ Built with Next.js 16 App Router</li>
          </ul>
          <Link
            href="https://www.linkedin.com/in/anthonysjhenry/"
            target="_blank"
            rel="nofollow"
            className="place-content-center space-y-2"
          >
            <img src="/linkedin.svg" alt="LinkedIn" />
          </Link>
        </div>
      </main>
    </div>
  );
}
