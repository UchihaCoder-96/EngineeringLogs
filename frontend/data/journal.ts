import type { Journal } from "@/types/journal";

export const journals: Journal[] = [
    {
        id: 1,
        title: "Created Python project for image processing",
        slug: "created-python-project-for-image-processing",
        date: new Date("2023-04-05"),
        summary: "Made a Python project for image processing using OpenCV.",
        tags: ["Python", "Image Processing", "OpenCV"],
        projectSlug: "image-processing-application"
    },
    {
        id: 2,
        title: "Added UI elements to image processing application",
        slug: "added-ui-elements-to-image-processing-application",
        date: new Date("2023-04-06"),
        summary: "Added UI elements to the image processing application using PyQt5.",
        tags: ["Python", "Image Processing", "OpenCV"],
        projectSlug: "image-processing-application"
    },
    {
        id: 3,
        title: "Added image filtering feature to image processing application",
        slug: "added-image-filtering-feature-to-image-processing-application",
        date: new Date("2023-04-07"),
        summary: "Added image filtering feature to the image processing application using OpenCV and kernel algorithms.",
        tags: ["Python", "Image Processing", "OpenCV"],
        projectSlug: "image-processing-application"
    }
]