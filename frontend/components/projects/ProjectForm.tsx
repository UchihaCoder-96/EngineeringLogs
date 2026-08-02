"use client";

import {
    PROJECT_CATEGORIES,
    PROJECT_DIFFICULTIES,
    PROJECT_STATUSES,
    Project,
} from "@/types/project";

import { useState } from "react";

import ChipInput from "@/components/form/ChipInput";
import SelectField from "@/components/form/SelectField";
import TextArea from "@/components/form/TextArea";
import TextField from "@/components/form/TextField";

type ProjectFormProps = {
    initialData?: Partial<Project>;
    submitText?: string;
    onSubmit: (project: {
        title: string;
        shortDescription: string;
        content: string;
        category: Project["category"];
        difficulty: Project["difficulty"];
        status: Project["status"];
        githubUrl: string;
        demoUrl: string;
        thumbnail: string;
        technologies: string[];
    }) => Promise<void>;
};

export default function ProjectForm({
    initialData,
    submitText = "Save Project",
    onSubmit,
}: ProjectFormProps) {
    const [title, setTitle] = useState(initialData?.title ?? "");
    const [description, setDescription] = useState(
        initialData?.shortDescription ?? ""
    );

    const [content, setContent] = useState(
        initialData?.content ?? ""
    );

    const [category, setCategory] = useState<Project["category"]>(
        initialData?.category ?? PROJECT_CATEGORIES[0]
    );

    const [difficulty, setDifficulty] =
        useState<Project["difficulty"]>(
            initialData?.difficulty ?? PROJECT_DIFFICULTIES[0]
        );

    const [status, setStatus] = useState<Project["status"]>(
        initialData?.status ?? PROJECT_STATUSES[0]
    );

    const [githubUrl, setGithubUrl] = useState(
        initialData?.githubUrl ?? ""
    );

    const [demoUrl, setDemoUrl] = useState(
        initialData?.demoUrl ?? ""
    );

    const [thumbnail, setThumbnail] = useState(
        initialData?.thumbnail ?? ""
    );

    const [technologies, setTechnologies] = useState<string[]>(
        initialData?.technologies ?? []
    );

    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        setLoading(true);

        try {
            await onSubmit({
                title,
                shortDescription: description,
                content,
                category,
                difficulty,
                status,
                githubUrl,
                demoUrl,
                thumbnail,
                technologies,
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-8"
        >
            <TextField
                label="Title"
                value={title}
                onChange={setTitle}
                required
            />

            <TextArea
                label="Short Description"
                value={description}
                onChange={setDescription}
                required
            />

            <TextArea
                label="Content"
                value={content}
                onChange={setContent}
                required
            />

            <div className="grid gap-6 md:grid-cols-2">

                <SelectField
                    label="Category"
                    value={category}
                    options={PROJECT_CATEGORIES}
                    onChange={setCategory}
                />

                <SelectField
                    label="Difficulty"
                    value={difficulty}
                    options={PROJECT_DIFFICULTIES}
                    onChange={setDifficulty}
                />

            </div>

            <SelectField
                label="Status"
                value={status}
                options={PROJECT_STATUSES}
                onChange={setStatus}
            />

            <div className="grid gap-6 md:grid-cols-2">

                <TextField
                    label="GitHub URL"
                    value={githubUrl}
                    onChange={setGithubUrl}
                    type="url"
                />

                <TextField
                    label="Demo URL"
                    value={demoUrl}
                    onChange={setDemoUrl}
                    type="url"
                />

            </div>

            <TextField
                label="Thumbnail URL"
                value={thumbnail}
                onChange={setThumbnail}
                type="url"
            />

            <ChipInput
                label="Technologies"
                values={technologies}
                onChange={setTechnologies}
                placeholder="Press Enter to add..."
            />

            <div className="flex justify-end">
                <button
                    disabled={loading}
                    className="rounded-xl bg-blue-600 px-6 py-3 font-medium transition hover:bg-blue-500 disabled:opacity-50"
                >
                    {loading ? "Saving..." : submitText}
                </button>
            </div>
        </form>
    );
}
