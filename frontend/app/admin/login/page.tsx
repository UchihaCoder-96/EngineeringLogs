"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import TextField from "@/components/form/TextField";
import { login } from "@/lib/auth";
import Dialog from "@/components/ui/Dialog";

export default function Page() {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogTitle, setDialogTitle] = useState("");
    const [dialogMessage, setDialogMessage] = useState("");

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();

        setLoading(true);

        try {
            const response = await login(username, password);

            if (!response.ok) {
                setDialogTitle("Login Failed");
                setDialogMessage("Invalid username or password.");
                setDialogOpen(true);
                return;
            }

            localStorage.setItem("token", (await response.json()).token);
            console.log("Token stored in localStorage:", localStorage.getItem("token"));

            router.push("/admin");
        }
        catch (error) {
            console.error(error);

            setDialogTitle("Connection Error");
            setDialogMessage("Unable to connect to the server.");
            setDialogOpen(true);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <>
            <section className="flex min-h-screen items-center justify-center bg-zinc-950 px-6">

                <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900 p-8 shadow-xl">

                    <h1 className="text-3xl font-bold text-white">
                        Admin Login
                    </h1>

                    <p className="mt-2 text-zinc-400">
                        Sign in to access the admin dashboard.
                    </p>

                    <form
                        onSubmit={handleLogin}
                        className="mt-8 space-y-6"
                    >

                        <TextField
                            label="Username"
                            value={username}
                            onChange={setUsername}
                            placeholder="Enter username"
                            required
                        />

                        <TextField
                            label="Password"
                            type="password"
                            value={password}
                            onChange={setPassword}
                            placeholder="Enter password"
                            required
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>

                    </form>

                </div>

            </section>

            <Dialog
                open={dialogOpen}
                title={dialogTitle}
                message={dialogMessage}
                onClose={() => setDialogOpen(false)}
            />
        </>
    );
}