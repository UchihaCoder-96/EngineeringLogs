"use client";

import { KeyboardEvent, useState } from "react";

type ChipInputProps = {
    label: string;
    values: string[];
    onChange: (values: string[]) => void;
    placeholder?: string;
};

export default function ChipInput({
    label,
    values,
    onChange,
    placeholder = "Press Enter to add..."
}: ChipInputProps) {
    const [input, setInput] = useState("");

    function addChip() {
        const value = input.trim();

        if (!value) return;
        if (values.includes(value)) {
            setInput("");
            return;
        }

        onChange([...values, value]);
        setInput("");
    }

    function removeChip(chip: string) {
        onChange(values.filter((v) => v !== chip));
    }

    function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            e.preventDefault();
            addChip();
        }

        if (
            e.key === "Backspace" &&
            input === "" &&
            values.length > 0
        ) {
            removeChip(values[values.length - 1]);
        }
    }

    return (
        <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
                {label}
            </label>

            <div className="flex flex-wrap gap-2 rounded-xl border border-zinc-700 bg-zinc-900 p-3">

                {values.map((chip) => (
                    <span
                        key={chip}
                        className="flex items-center gap-2 rounded-full bg-blue-600 px-3 py-1 text-sm"
                    >
                        {chip}

                        <button
                            type="button"
                            onClick={() => removeChip(chip)}
                            className="font-bold text-white/70 hover:text-white"
                        >
                            ×
                        </button>
                    </span>
                ))}

                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className="min-w-[180px] flex-1 bg-transparent outline-none placeholder:text-zinc-500"
                />

            </div>
        </div>
    );
}