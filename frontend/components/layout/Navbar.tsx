import Link from "next/link";

const navLinkStyle = "text-zinc-400 hover:text-white transition-colors";

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 bg-zinc-950 border-b border-zinc-800">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                <Link
                    href="/"
                    className="text-xl font-bold tracking-wide text-white hover:text-zinc-300 transition-colors"
                >
                    Engineering Logs
                </Link>

                <div className="flex items-center gap-8">
                    <Link
                        href="/projects"
                        className={navLinkStyle}
                    >
                        Projects
                    </Link>

                    <Link
                        href="/journal"
                        className={navLinkStyle}
                    >
                        Journal
                    </Link>

                    <Link
                        href="/about"
                        className={navLinkStyle}
                    >
                        About
                    </Link>
                </div>
            </div>
        </nav>
    );
}