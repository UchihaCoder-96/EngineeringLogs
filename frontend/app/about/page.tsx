export default function Page() {
    return (
        <main className="min-h-screen bg-zinc-950 text-white">
            <section className="mx-auto max-w-6xl px-6 py-20">
                
                <div className="flex flex-col items-center gap-8 md:flex-row md:items-center">

                    <div className="flex h-44 w-44 items-center justify-center rounded-full border-2 border-zinc-700 bg-zinc-900 text-zinc-500">
                        Avatar
                    </div>

                    <div className="flex-1">
                        <h1 className="text-4xl font-bold">
                            Hi, I'm <span className="text-blue-500">Uwuchiha Boi</span>
                        </h1>

                        <p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-400">
                            I'm a Class 11 student from India. I enjoy building robots, experimenting with computer science, and documenting everything I learn. Engineering Logs is where I record projects, mistakes, debugging sessions, and ideas so I can learn from them and hopefully help others.
                        </p>

                        <div className="mt-6 flex flex-wrap gap-3">
                            <span className="rounded-full bg-zinc-800 px-4 py-2 text-sm">
                                Class 11 Student
                            </span>

                            <span className="rounded-full bg-zinc-800 px-4 py-2 text-sm">
                                Robotics
                            </span>

                            <span className="rounded-full bg-zinc-800 px-4 py-2 text-sm">
                                Programming
                            </span>
                        </div>
                    </div>
                </div>

                <div className="my-16 h-px bg-zinc-800" />

                <section>
                    <h2 className="text-3xl font-bold">
                        About Me
                    </h2>

                    <p className="mt-6 leading-8 text-zinc-400">
                        Uhh... What to add here? I guess i will add a few lines about me later...
                    </p>
                </section>

                <section className="mt-16">
                    <h2 className="text-3xl font-bold">
                        Interests
                    </h2>

                    <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
                            <h3 className="text-xl font-semibold">
                                Programming
                            </h3>

                            <p className="mt-3 text-zinc-400">
                                This is my main interest. I enjoy learning new programming languages, frameworks, and tools. I also like to build projects and experiment with different technologies.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
                            <h3 className="text-xl font-semibold">
                                Robotics
                            </h3>

                            <p className="mt-3 text-zinc-400">
                                I love building robots and experimenting with electronics. I enjoy designing, assembling, and programming robots for various tasks.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
                            <h3 className="text-xl font-semibold">
                                Mathematics
                            </h3>

                            <p className="mt-3 text-zinc-400">
                                I simply love mathematics. I enjoy solving problems, learning new concepts, and exploring the beauty of numbers and patterns.
                            </p>
                        </div>

                    </div>
                </section>

                <section className="mt-16">
                    <h2 className="text-3xl font-bold">
                        Skills
                    </h2>

                    <div className="mt-8 flex flex-wrap gap-3">
                        {[
                            "Basic C++",
                            "Python",
                            "C#",
                            "HTML/CSS",
                            "JS/TS",
                            "React",
                            "Next.js",
                            "Arduino",
                            "Fusion 360",
                            "Blender",
                            "Unity",
                            "Unreal Engine",
                            "Digital Art (Krita, Photoshop)",
                        ].map((skill) => (
                            <span
                                key={skill}
                                className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-zinc-300"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </section>

                <section className="mt-16">
                    <h2 className="text-3xl font-bold">
                        Journey
                    </h2>

                    <div className="mt-8 space-y-8 border-l border-zinc-800 pl-6">

                        <div>
                            <div className="text-blue-500 font-semibold">
                                2018-2020
                            </div>

                            <h3 className="text-xl font-semibold">
                                Started Learning Programming by Building Simple Games
                            </h3>

                            <p className="mt-2 text-zinc-400">
                                Placeholder description.
                            </p>
                        </div>

                        <div>
                            <div className="text-blue-500 font-semibold">
                                2020-2023
                            </div>

                            <h3 className="text-xl font-semibold">
                                Started Understanding Systems and Learning Low-Level Programming
                            </h3>

                            <p className="mt-2 text-zinc-400">
                                Placeholder description.
                            </p>
                        </div>

                        <div>
                            <div className="text-blue-500 font-semibold">
                                2023-2025
                            </div>

                            <h3 className="text-xl font-semibold">
                                Built First Engineering Project
                            </h3>

                            <p className="mt-2 text-zinc-400">
                                Placeholder description.
                            </p>
                        </div>

                        <div>
                            <div className="text-blue-500 font-semibold">
                                Present
                            </div>

                            <h3 className="text-xl font-semibold">
                                Exploring Robotics & AI
                            </h3>

                            <p className="mt-2 text-zinc-400">
                                Placeholder description.
                            </p>
                        </div>

                    </div>
                </section>

                <section className="mt-16">
                    <h2 className="text-3xl font-bold">
                        Current Goals
                    </h2>

                    <ul className="mt-6 space-y-4 text-zinc-400">
                        <li>• Build more complete engineering projects.</li>
                        <li>• Learn advanced C++ and Rust.</li>
                        <li>• Improve electronics and CAD skills.</li>
                        <li>• Participate in competitions and hackathons.</li>
                        <li>• Document every project on this website.</li>
                    </ul>
                </section>

                <section className="mt-20 rounded-2xl border border-zinc-800 bg-zinc-900 p-10 text-center">
                    <h2 className="text-2xl font-bold">
                        Philosophy
                    </h2>

                    <p className="mt-6 text-lg italic leading-8 text-zinc-400">
                        "Naani ga sukki!!?"
                    </p>
                </section>
            </section>
        </main>
    );
}