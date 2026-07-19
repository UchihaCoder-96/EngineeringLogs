import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t border-zinc-800 bg-zinc-950">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-zinc-400 md:flex-row">

                {/* Left */}
                <div>
                    <h2 className="text-lg font-semibold text-white">
                        Engineering Logs
                    </h2>

                    <p className="mt-1">
                        Documenting projects, experiments and the journey of learning new things.
                    </p>
                </div>

                {/* Navigation */}
                <nav className="flex gap-6">
                    <Link
                        href="/"
                        className="transition-colors hover:text-white"
                    >
                        Home
                    </Link>

                    <Link
                        href="/projects"
                        className="transition-colors hover:text-white"
                    >
                        Projects
                    </Link>

                    <Link
                        href="/journal"
                        className="transition-colors hover:text-white"
                    >
                        Journal
                    </Link>

                    <Link
                        href="/about"
                        className="transition-colors hover:text-white"
                    >
                        About
                    </Link>
                </nav>
            </div>

            <div className="border-t border-zinc-800">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 text-xs text-zinc-500">

                    <p>
                        © {new Date().getFullYear()} Engineering Logs. All rights reserved.
                    </p>

                    <p>
                        Built with Next.js, React & Tailwind CSS.
                    </p>

                </div>
            </div>
        </footer>
    );
}