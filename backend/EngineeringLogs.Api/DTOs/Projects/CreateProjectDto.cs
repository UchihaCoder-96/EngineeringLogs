using EngineeringLogs.Api.Models.Enums;
using System.ComponentModel.DataAnnotations;

namespace EngineeringLogs.Api.DTOs.Projects
{
    public class CreateProjectDto
    {
        [Required]
        [MaxLength(100)]
        public string Title { get; set; } = string.Empty;

        [Required]
        [MaxLength(500)]
        public string ShortDescription { get; set; } = string.Empty;

        [Required]
        public ProjectCategory Category { get; set; }

        [Required]
        public ProjectDifficulty Difficulty { get; set; }

        [Url]
        public string? GithubUrl { get; set; }

        [Url]
        public string? DemoUrl { get; set; }

        [MinLength(1)]
        public List<string> Technologies { get; set; } = [];

        [Required]
        public ProjectStatus Status { get; set; }

        [Url]
        public string? Thumbnail { get; set; } //Url
    }
}
