import type { Project } from "@/types/project.ts";

export const projects: Project[] = [
    {
        id: 1,
        title: "Hexapod Robot",
        shortDescription: "A six-legged walking robot.",
        status: "Planned",
        technologies: [
            "Arduino",
            "Fusion 360"
        ],
        featuredOrder: 1,
        thumbnail: "/images/projects/hexapod.png",
        githubUrl: "",
        demoUrl: "",
        category: "Robotics",
        difficulty: "Advanced",
        viewCount: 0,
        slug: "hexapod-robot"
    },
    {
        id: 2,
        title: "Image Processing Application",
        shortDescription: "An application for processing and analyzing images.",
        status: "Completed",
        technologies: [
            "Python",
            "OpenCV",
        ],
        featuredOrder: 1,
        thumbnail: "/images/projects/image-processing.png",
        githubUrl: "",
        demoUrl: "",
        startDate: new Date("2023-04-05"),
        lastUpdated: new Date("2026-07-15"),
        category: "Software",
        difficulty: "Intermediate",
        viewCount: 0,
        slug: "image-processing-application"
    },
    {
        id: 3,
        title: "3D Multiplayer Game",
        shortDescription: "A 3D multiplayer game built with modern game development techniques.",
        status: "In Progress",
        technologies: [
            "Unreal Engine",
            "C++",
        ],
        thumbnail: "/images/projects/3d-multiplayer-game.png",
        githubUrl: "",
        demoUrl: "",
        startDate: new Date("2025-06-08"),
        lastUpdated: new Date("2026-01-11"),
        category: "Software",
        difficulty: "Intermediate",
        viewCount: 0,
        slug: "3d-multiplayer-game"
    }
];