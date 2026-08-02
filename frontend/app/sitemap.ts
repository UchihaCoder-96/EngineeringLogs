import { MetadataRoute } from "next";
import {getProjects} from "@/lib/projects";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

    const projects = await getProjects();

    return [

        {
            url: "https://engineeringlogs.com",
            priority: 1,
        },

        {
            url: "https://engineeringlogs.com/projects",
        },

        ...projects.map(project => ({
            url: `https://engineeringlogs.com/projects/${project.slug}`,
        })),

    ];
}