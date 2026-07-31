type SelectOption<T extends string> = {
    label: string;
    value: T;
};

type SelectFieldProps<T extends string> = {
    label: string;
    value: T;
    options: readonly (T | SelectOption<T>)[];
    onChange: (value: T) => void;
};

export default function SelectField<T extends string>({
    label,
    value,
    options,
    onChange,
}: SelectFieldProps<T>) {
    return (
        <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
                {label}
            </label>

            <select
                value={value}
                onChange={(e) => onChange(e.target.value as T)}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            >
                {options.map((option) => {
                    if (typeof option === "string") {
                        return (
                            <option
                                key={option}
                                value={option}
                            >
                                {option}
                            </option>
                        );
                    }

                    return (
                        <option
                            key={option.value}
                            value={option.value}
                        >
                            {option.label}
                        </option>
                    );
                })}
            </select>
        </div>
    );
}
