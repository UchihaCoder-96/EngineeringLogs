using EngineeringLogs.Api.DTOs;
using EngineeringLogs.Api.Models;

namespace EngineeringLogs.Api.Services
{
    public interface IProjectService
    {
        IEnumerable<ProjectDto> GetProjects();
        ProjectDto? GetProjectBySlug(string slug);
    }
}