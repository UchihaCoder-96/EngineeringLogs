import ProjectClient from "@/components/projects/ProjectClient";
import { getProject } from "@/lib/projects";
import type { Metadata } from "next";
import Script from "next/script";

export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {

    const { slug } = await params;
    const project = await getProject(slug);

    if (!project) {
        return {
            title: "Project Not Found",
        };
    }

    return {

        title: project.title,

        description: project.shortDescription,

        keywords: [
            project.category,
            ...project.technologies,
        ],

        openGraph: {

            title: project.title,

            description: project.shortDescription,

            type: "article",

            images: [
                project.thumbnail || "/og-image.png",
            ],

        },

        twitter: {

            card: "summary_large_image",

            title: project.title,

            description: project.shortDescription,

            images: [
                project.thumbnail || "/og-image.png",
            ],

        },

    };
}

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const project = await getProject(slug);

    return (
        <>
            <Script
                id="project-jsonld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "TechArticle",
                        headline: project.title,
                        description: project.shortDescription,
                        datePublished: project.startDate,
                        dateModified: project.lastUpdated,
                        author: {
                            "@type": "Person",
                            name: "Uwuchiha san",
                        },
                    }),
                }}
            />

            <ProjectClient project={project} />
        </>
    );
}
