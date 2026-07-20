using EngineeringLogs.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace EngineeringLogs.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectsController : ControllerBase
    {
        private readonly IProjectService _projectService;

        public ProjectsController(IProjectService projectService)
        {
            _projectService = projectService;
        }

        [HttpGet]
        public IActionResult GetProjects()
        {
            return Ok(_projectService.GetProjects());
        }

        [HttpGet("{slug}")]
        public IActionResult GetProjectBySlug(string slug)
        {
            var project = _projectService.GetProjectBySlug(slug);
            if (project == null)
            {
                return NotFound();
            }
            return Ok(project);
        }
    }
}