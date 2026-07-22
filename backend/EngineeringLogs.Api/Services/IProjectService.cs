using EngineeringLogs.Api.DTOs.Projects;
using EngineeringLogs.Api.Models;

namespace EngineeringLogs.Api.Services
{
    public interface IProjectService
    {
        IEnumerable<ProjectDto> GetProjects();
        ProjectDto? GetProjectBySlug(string slug);
        ProjectDto CreateProject(CreateProjectDto createProjectDto);
        ProjectDto? UpdateProject(string slug, UpdateProjectDto updateProjectDto);
        bool DeleteProject(string slug);
    }
}