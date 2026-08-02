"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FolderGit2, NotebookPen } from "lucide-react";

export default function Page() {
    const router = useRouter();
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.push("/admin/login");
            return;
        }

        setToken(token);
    }, [router]);

    if (token === null) {
        return (
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">
                Loading...
            </div>
        );
    }

    /*
    function logout() {
        localStorage.removeItem("token");
        router.push("/admin/login");
    }
    */

    return (
        <section className="min-h-screen bg-zinc-950 text-white">
            <div className="mx-auto max-w-6xl px-6 py-20">

                <div>
                    <h1 className="text-5xl font-bold tracking-tight">
                        Admin Dashboard
                    </h1>
                    <p className="mt-4 max-w-2xl text-lg text-zinc-400">
                        Manage engineering projects and developer journals from a
                        single place.
                    </p>
                </div>

                <div className="mt-12 grid gap-8 md:grid-cols-2">

                    <div className="group rounded-3xl border border-zinc-800 bg-zinc-900 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10">

                        <div className="flex items-center gap-4">


                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
                                <FolderGit2 size={28} />
                            </div>

                            <div>
                                <h2 className="text-2xl font-semibold">
                                    Projects
                                </h2>

                                <p className="mt-1 text-zinc-400">
                                    Create, edit and organize engineering
                                    projects.
                                </p>
                            </div>

                        </div>

                        <div className="mt-8">

                            <Link
                                href="/admin/projects"
                                className="inline-flex rounded-xl bg-blue-600 px-5 py-3 font-medium transition hover:bg-blue-500"
                            >
                                Manage Projects →
                            </Link>

                        </div>

                    </div>

                    <div className="group rounded-3xl border border-zinc-800 bg-zinc-900 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10">

                        <div className="flex items-center gap-4">

                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
                                <NotebookPen size={28} />
                            </div>

                            <div>
                                <h2 className="text-2xl font-semibold">
                                    Journals
                                </h2>

                                <p className="mt-1 text-zinc-400">
                                    Write and manage engineering journal
                                    entries.
                                </p>
                            </div>

                        </div>

                        <div className="mt-8">

                            <Link
                                href="/admin/journals"
                                className="inline-flex rounded-xl bg-blue-600 px-5 py-3 font-medium transition hover:bg-blue-500"
                            >
                                Manage Journals →
                            </Link>

                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}
