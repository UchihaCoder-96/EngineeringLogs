using EngineeringLogs.Api.Models.Enums;

namespace EngineeringLogs.Api.Models;

public class Project
{
    public int Id { get; set; }

    public string Title { get; set; } = string.Empty;

    public string ShortDescription { get; set; } = string.Empty;

    public ProjectStatus Status { get; set; }

    public List<string> Technologies { get; set; } = new List<string>();

    public int? FeaturedOrder { get; set; }

    public string Thumbnail { get; set; } = string.Empty; // Url

    public string GithubUrl { get; set; } = string.Empty;

    public string DemoUrl { get; set; } = string.Empty;

    public DateTime? StartDate { get; set; }

    public DateTime? LastUpdated { get; set; }

    public ProjectCategory Category { get; set; }

    public ProjectDifficulty Difficulty { get; set; }

    public int ViewCount { get; set; }

    public string Slug { get; set; } = string.Empty;
}