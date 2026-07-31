"use client";

type DialogProps = {
    open: boolean;
    title: string;
    message: string;
    buttonText?: string;
    onClose: () => void;
};

export default function Dialog({
    open,
    title,
    message,
    buttonText = "OK",
    onClose,
}: DialogProps) {
    if (!open) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

            <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl">

                <h2 className="text-xl font-semibold text-white">
                    {title}
                </h2>

                <p className="mt-3 text-zinc-400">
                    {message}
                </p>

                <div className="mt-6 flex justify-end">

                    <button
                        onClick={onClose}
                        className="rounded-xl bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-500"
                    >
                        {buttonText}
                    </button>

                </div>

            </div>

        </div>
    );
}


/*

Usage:
const [dialogOpen, setDialogOpen] = useState(false);


Show it:
setDialogOpen(true);

Render:
<Dialog
    open={dialogOpen}
    title="Exaample title"
    message="khi khi khi..."
    onClose={() => setDialogOpen(false)}
/>

*/

