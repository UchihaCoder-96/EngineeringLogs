import Link from "next/link";

export default function NotFound() {
    return (
        <section className="flex min-h-screen items-center justify-center bg-zinc-950 px-6">
            <div className="w-full max-w-xl rounded-3xl border border-zinc-800 bg-zinc-900 p-10 text-center shadow-xl">

                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-500/10">
                    <span className="text-4xl">404</span>
                </div>

                <h1 className="mt-6 text-3xl font-bold text-white">
                    Page Not Found
                </h1>

                <p className="mt-3 text-zinc-400">
                    The page you're looking for doesn't exist or may have been moved.
                </p>

                <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">

                    <Link
                        href="/"
                        className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-500"
                    >
                        Go Home
                    </Link>

                    <Link
                        href="/projects"
                        className="rounded-xl border border-zinc-700 px-6 py-3 font-medium text-zinc-300 transition hover:border-zinc-600 hover:bg-zinc-800"
                    >
                        Browse Projects
                    </Link>

                </div>

            </div>
        </section>
    );
}