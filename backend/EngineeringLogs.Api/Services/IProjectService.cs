using EngineeringLogs.Api.DTOs.Projects;
using EngineeringLogs.Api.Models;

namespace EngineeringLogs.Api.Services
{
    public interface IProjectService
    {
        Task<IEnumerable<ProjectDto>> GetProjectsAsync();
        Task<ProjectDto?> GetProjectBySlugAsync(string slug);
        Task<ProjectDto> CreateProjectAsync(CreateProjectDto createProjectDto);
        Task<ProjectDto?> UpdateProjectAsync(string slug, UpdateProjectDto updateProjectDto);
        Task<bool> DeleteProjectAsync(string slug);
    }
}