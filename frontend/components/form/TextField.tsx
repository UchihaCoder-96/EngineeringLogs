type TextFieldProps = {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    type?: React.HTMLInputTypeAttribute;
    required?: boolean;
};

export default function TextField({
    label,
    value,
    onChange,
    placeholder,
    type = "text",
    required = false,
}: TextFieldProps) {
    return (
        <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
                {label}
            </label>

            <input
                type={type}
                value={value}
                required={required}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            />
        </div>
    );
}
