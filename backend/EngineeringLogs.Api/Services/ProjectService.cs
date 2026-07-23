using EngineeringLogs.Api.Data;
using EngineeringLogs.Api.DTOs.Projects;
using EngineeringLogs.Api.Extensions;
using EngineeringLogs.Api.Models;
using EngineeringLogs.Api.Models.Enums;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;

namespace EngineeringLogs.Api.Services;

public class ProjectService : IProjectService
{
    private readonly ILogger<ProjectService> _logger;

    public ProjectService(ILogger<ProjectService> logger, EngineeringLogsDbContext context)
    {
        _logger = logger;
        _context = context;
    }

    private readonly EngineeringLogsDbContext _context;

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
    public async Task<IEnumerable<ProjectDto>> GetProjectsAsync()
    {
        var projects = await _context.Projects.ToListAsync();
        return projects.Select(ProjectExtensions.ToDto);
    }

    public async Task<ProjectDto?> GetProjectBySlugAsync(string slug)
    {
        // Normalize the incoming slug on the client side using invariant culture
        // and compare against the database value converted to lower-case. This
        // avoids using String.Equals with a StringComparison (which EF Core
        // cannot translate) while keeping the comparison translatable to SQL.
        var normalized = Utilities.EFStringComparisons.NormalizeForComparison(slug);
        var project = await _context.Projects.FirstOrDefaultAsync(p => p.Slug.ToLower() == normalized);

        return project is null ? null : ProjectExtensions.ToDto(project);
    }

    public async Task<ProjectDto> CreateProjectAsync(CreateProjectDto createProjectDto)
    {
        // Generate slug (normalized to lower-case) and ensure uniqueness in database
        var slug = GenerateSlug(createProjectDto.Title).ToLowerInvariant();
        var baseSlug = slug;
        var suffix = 1;
        // Compare with simple equality against the normalized slug so EF Core can translate to SQL
        while (await _context.Projects.AnyAsync(p => p.Slug == slug))
        {
            suffix++;
            slug = $"{baseSlug}-{suffix}";
        }

        var project = new Project
        {
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

        _context.Projects.Add(project);
        await _context.SaveChangesAsync();

        _logger.LogInformation("Created project {Id} (slug: {Slug})", project.Id, project.Slug);

        return ProjectExtensions.ToDto(project);
    }

    public async Task<ProjectDto?> UpdateProjectAsync(string slug, UpdateProjectDto updateProjectDto)
    {
        var normalized = Utilities.EFStringComparisons.NormalizeForComparison(slug);
        var project = await _context.Projects.FirstOrDefaultAsync(p => p.Slug.ToLower() == normalized);
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
            var normalizedNewSlug = Utilities.EFStringComparisons.NormalizeForComparison(newSlug);
            while (await _context.Projects.AnyAsync(p => p.Id != project.Id && p.Slug.ToLower() == normalizedNewSlug))
            {
                suffix2++;
                newSlug = $"{baseSlug2}-{suffix2}";
            }
            project.Slug = newSlug;
        }

        await _context.SaveChangesAsync();

        _logger.LogInformation("Updated project {Id} (slug: {Slug})", project.Id, project.Slug);

        return ProjectExtensions.ToDto(project);
    }

    public async Task<bool> DeleteProjectAsync(string slug)
    {
        var normalized = Utilities.EFStringComparisons.NormalizeForComparison(slug);
        var project = await _context.Projects.FirstOrDefaultAsync(p => p.Slug.ToLower() == normalized);
        if (project == null) return false;

        _context.Projects.Remove(project);
        await _context.SaveChangesAsync();

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