using EngineeringLogs.Api.Models;

namespace EngineeringLogs.Api.Services
{
    public interface IProjectService
    {
        IEnumerable<Project> GetProjects();
        Project? GetProjectBySlug(string slug);
    }
}