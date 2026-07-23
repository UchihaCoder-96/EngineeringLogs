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
        public async Task<IActionResult> GetProjects()
        {
            return Ok(await _projectService.GetProjectsAsync());
        }

        [HttpGet("{slug}")]
        public async Task<IActionResult> GetProjectBySlug(string slug)
        {
            var project = await _projectService.GetProjectBySlugAsync(slug);
            if (project == null)
            {
                return NotFound();
            }
            return Ok(project);
        }

        [HttpPost]
        public async Task<IActionResult> CreateProject(CreateProjectDto createProjectDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var created = await _projectService.CreateProjectAsync(createProjectDto);

            _logger.LogInformation("Created project {Id} (slug: {Slug}) via API", created.Id, created.Slug);

            return CreatedAtAction(nameof(GetProjectBySlug), new { slug = created.Slug }, created);
        }

        [HttpPut("{slug}")]
        public async Task<IActionResult> UpdateProject(string slug, UpdateProjectDto updateProjectDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var updated = await _projectService.UpdateProjectAsync(slug, updateProjectDto);
            if (updated == null)
            {
                return NotFound();
            }

            _logger.LogInformation("Updated project {Slug} via API", slug);

            return Ok(updated);
        }

        [HttpDelete("{slug}")]
        public async Task<IActionResult> DeleteProject(string slug)
        {
            var deleted = await _projectService.DeleteProjectAsync(slug);
            if (!deleted)
            {
                return NotFound();
            }

            _logger.LogInformation("Deleted project {Slug} via API", slug);

            return NoContent();
        }
    }
}