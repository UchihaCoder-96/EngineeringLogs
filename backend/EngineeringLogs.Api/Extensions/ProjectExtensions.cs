using EngineeringLogs.Api.DTOs.Projects;
using EngineeringLogs.Api.Models;

namespace EngineeringLogs.Api.Extensions
{
    public static class ProjectExtensions
    {
        public static ProjectDto ToDto(this Project project)
        {
            return new ProjectDto
            {
                Id = project.Id,
                Title = project.Title,
                ShortDescription = project.ShortDescription,
                Status = project.Status.ToString(),
                Category = project.Category.ToString(),
                Difficulty = project.Difficulty.ToString(),
                ViewCount = project.ViewCount,
                Slug = project.Slug,
                GithubUrl = project.GithubUrl,
                DemoUrl = project.DemoUrl,
                Thumbnail = project.Thumbnail,
                Technologies = project.Technologies
            };
        }
    }
}
