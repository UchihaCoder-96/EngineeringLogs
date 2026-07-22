using EngineeringLogs.Api.DTOs.Projects;
using EngineeringLogs.Api.Extensions;
using EngineeringLogs.Api.Models;
using EngineeringLogs.Api.Models.Enums;
using Microsoft.Extensions.Logging;

namespace EngineeringLogs.Api.Services;

public class ProjectService : IProjectService
{
    private readonly ILogger<ProjectService> _logger;

    public ProjectService(ILogger<ProjectService> logger)
    {
        _logger = logger;
    }

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
    public IEnumerable<ProjectDto> GetProjects()
    {
        return _projects.Select(ProjectExtensions.ToDto);
    }

    public ProjectDto? GetProjectBySlug(string slug)
    {
        var project = _projects.FirstOrDefault(p => p.Slug.Equals(slug, StringComparison.OrdinalIgnoreCase));
        return project is null ? null : ProjectExtensions.ToDto(project);
    }

    public ProjectDto CreateProject(CreateProjectDto createProjectDto)
    {
        var newId = _projects.Any() ? _projects.Max(p => p.Id) + 1 : 1;

        var slug = GenerateSlug(createProjectDto.Title);

        // Ensure unique slug by appending a number if necessary
        var baseSlug = slug;
        var suffix = 1;
        while (_projects.Any(p => p.Slug.Equals(slug, StringComparison.OrdinalIgnoreCase)))
        {
            suffix++;
            slug = $"{baseSlug}-{suffix}";
        }

        var project = new Project
        {
            Id = newId,
            Title = createProjectDto.Title,
            ShortDescription = createProjectDto.ShortDescription,
            Status = createProjectDto.Status,
            Technologies = createProjectDto.Technologies ?? new List<string>(),
            FeaturedOrder = null,
            Thumbnail = createProjectDto.Thumbnail ?? string.Empty,
            GithubUrl = createProjectDto.GithubUrl ?? string.Empty,
            DemoUrl = createProjectDto.DemoUrl ?? string.Empty,
            StartDate = DateTime.UtcNow,
            LastUpdated = null,
            Category = createProjectDto.Category,
            Difficulty = createProjectDto.Difficulty,
            ViewCount = 0,
            Slug = slug,
        };

        _projects.Add(project);

        _logger.LogInformation("Created project {Id} (slug: {Slug})", project.Id, project.Slug);

        return ProjectExtensions.ToDto(project);
    }

    public ProjectDto? UpdateProject(string slug, UpdateProjectDto updateProjectDto)
    {
        var project = _projects.FirstOrDefault(p => p.Slug.Equals(slug, StringComparison.OrdinalIgnoreCase));
        if (project == null) return null;

        project.Title = updateProjectDto.Title;
        project.ShortDescription = updateProjectDto.ShortDescription;
        project.Status = updateProjectDto.Status;
        project.Category = updateProjectDto.Category;
        project.Difficulty = updateProjectDto.Difficulty;
        project.GithubUrl = updateProjectDto.GithubUrl ?? string.Empty;
        project.DemoUrl = updateProjectDto.DemoUrl ?? string.Empty;
        project.Technologies = updateProjectDto.Technologies ?? new List<string>();
        project.Thumbnail = updateProjectDto.Thumbnail ?? string.Empty;
        project.LastUpdated = DateTime.UtcNow;

        // If title changed, regenerate slug and ensure uniqueness
        var newSlug = GenerateSlug(project.Title);
        if (!newSlug.Equals(project.Slug, StringComparison.OrdinalIgnoreCase))
        {
            var baseSlug2 = newSlug;
            var suffix2 = 1;
            while (_projects.Any(p => p.Id != project.Id && p.Slug.Equals(newSlug, StringComparison.OrdinalIgnoreCase)))
            {
                suffix2++;
                newSlug = $"{baseSlug2}-{suffix2}";
            }
            project.Slug = newSlug;
        }

        _logger.LogInformation("Updated project {Id} (slug: {Slug})", project.Id, project.Slug);

        return ProjectExtensions.ToDto(project);
    }

    public bool DeleteProject(string slug)
    {
        var project = _projects.FirstOrDefault(p => p.Slug.Equals(slug, StringComparison.OrdinalIgnoreCase));
        if (project == null) return false;

        _projects.Remove(project);
        _logger.LogInformation("Deleted project {Id} (slug: {Slug})", project.Id, slug);
        return true;
    }

    private static string GenerateSlug(string title)
    {
        var s = title?.ToLowerInvariant() ?? string.Empty;
        s = System.Text.RegularExpressions.Regex.Replace(s, "[^a-z0-9\\s-]", "");
        s = System.Text.RegularExpressions.Regex.Replace(s, "\\s+", "-").Trim('-');
        return s;
    }
}