using EngineeringLogs.Api.Models;
using EngineeringLogs.Api.Models.Enums;

namespace EngineeringLogs.Api.Services;

public class ProjectService : IProjectService
{
    private static readonly List<Project> _projects = new()
    {
        new Project
            {
                Id = 1,
                Title = "Hexapod Robot",
                ShortDescription = "A six-legged walking robot.",
                Status = ProjectStatus.Planned,
                Technologies = new List<string>
                {
                    "Arduino",
                    "Fusion 360"
                },
                FeaturedOrder = 1,
                Thumbnail = "/images/projects/hexapod.png",
                GithubUrl = "",
                DemoUrl = "",
                Category = ProjectCategory.Robotics,
                Difficulty = ProjectDifficulty.Advanced,
                ViewCount = 0,
                Slug = "hexapod-robot"
            },

            new Project
            {
                Id = 2,
                Title = "Image Processing Application",
                ShortDescription = "An application for processing and analyzing images.",
                Status = ProjectStatus.Completed,
                Technologies = new List<string>
                {
                    "Python",
                    "OpenCV"
                },
                FeaturedOrder = 2,
                Thumbnail = "/images/projects/image-processing.png",
                GithubUrl = "",
                DemoUrl = "",
                StartDate = new DateTime(2023, 4, 5),
                LastUpdated = new DateTime(2026, 7, 15),
                Category = ProjectCategory.ComputerScience,
                Difficulty = ProjectDifficulty.Intermediate,
                ViewCount = 0,
                Slug = "image-processing-application"
            },

            new Project
            {
                Id = 3,
                Title = "3D Multiplayer Game",
                ShortDescription = "A 3D multiplayer game built with modern game development techniques.",
                Status = ProjectStatus.InProgress,
                Technologies = new List<string>
                {
                    "Unreal Engine",
                    "C++"
                },
                Thumbnail = "/images/projects/3d-multiplayer-game.png",
                GithubUrl = "",
                DemoUrl = "",
                StartDate = new DateTime(2025, 6, 8),
                LastUpdated = new DateTime(2026, 1, 11),
                Category = ProjectCategory.GameDevelopment,
                Difficulty = ProjectDifficulty.Intermediate,
                ViewCount = 0,
                Slug = "3d-multiplayer-game"
            }
    };
    public IEnumerable<Project> GetProjects()
    {
        return _projects;
    }

    public Project? GetProjectBySlug(string slug)
    {
        return _projects.FirstOrDefault(p => p.Slug.Equals(slug, StringComparison.OrdinalIgnoreCase));
    }
}