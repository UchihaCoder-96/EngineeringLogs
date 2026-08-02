export default function Loading() {
    return (
        <section className="min-h-screen bg-zinc-950 text-white">
            <div className="mx-auto max-w-6xl px-6 py-20 animate-pulse">

                <div className="h-10 w-72 rounded-xl bg-zinc-800" />
                <div className="mt-4 h-5 w-[32rem] rounded-lg bg-zinc-800" />

                <div className="mt-12 space-y-6">

                    {[...Array(4)].map((_, index) => (
                        <div
                            key={index}
                            className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6"
                        >
                            <div className="h-7 w-1/3 rounded-lg bg-zinc-800" />

                            <div className="mt-4 h-4 w-full rounded bg-zinc-800" />
                            <div className="mt-2 h-4 w-5/6 rounded bg-zinc-800" />

                            <div className="mt-6 flex gap-2">
                                <div className="h-8 w-24 rounded-full bg-zinc-800" />
                                <div className="h-8 w-20 rounded-full bg-zinc-800" />
                                <div className="h-8 w-28 rounded-full bg-zinc-800" />
                            </div>

                            <div className="mt-6 flex gap-3">
                                <div className="h-10 w-24 rounded-xl bg-zinc-800" />
                                <div className="h-10 w-24 rounded-xl bg-zinc-800" />
                            </div>
                        </div>
                    ))}

                </div>

            </div>
        </section>
    );
}