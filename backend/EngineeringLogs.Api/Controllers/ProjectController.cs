using EngineeringLogs.Api.DTOs.Projects;
using EngineeringLogs.Api.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace EngineeringLogs.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectsController : ControllerBase
    {
        private readonly IProjectService _projectService;
        private readonly ILogger<ProjectsController> _logger;

        public ProjectsController(IProjectService projectService, ILogger<ProjectsController> logger)
        {
            _projectService = projectService;
            _logger = logger;
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

        [HttpPost]
        public IActionResult CreateProject(CreateProjectDto createProjectDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var created = _projectService.CreateProject(createProjectDto);

            _logger.LogInformation("Created project {Id} (slug: {Slug}) via API", created.Id, created.Slug);

            return CreatedAtAction(nameof(GetProjectBySlug), new { slug = created.Slug }, created);
        }

        [HttpPut("{slug}")]
        public IActionResult UpdateProject(string slug, UpdateProjectDto updateProjectDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var updated = _projectService.UpdateProject(slug, updateProjectDto);
            if (updated == null)
            {
                return NotFound();
            }

            _logger.LogInformation("Updated project {Slug} via API", slug);

            return Ok(updated);
        }

        [HttpDelete("{slug}")]
        public IActionResult DeleteProject(string slug)
        {
            var deleted = _projectService.DeleteProject(slug);
            if (!deleted)
            {
                return NotFound();
            }

            _logger.LogInformation("Deleted project {Slug} via API", slug);

            return NoContent();
        }
    }
}