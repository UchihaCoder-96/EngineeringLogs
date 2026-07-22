using EngineeringLogs.Api.DTOs.Journals;
using EngineeringLogs.Api.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace EngineeringLogs.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class JournalsController : ControllerBase
    {
        private readonly IJournalService _journalService;
        private readonly ILogger<JournalsController> _logger;

        public JournalsController(IJournalService journalService, ILogger<JournalsController> logger)
        {
            _journalService = journalService;
            _logger = logger;
        }
        [HttpGet]
        public IActionResult GetJournals()
        {
            return Ok(_journalService.GetJournals());
        }

        [HttpGet("{slug}")]
        public IActionResult GetJournalBySlug(string slug)
        {
            var journal = _journalService.GetJournalBySlug(slug);
            if (journal == null)
            {
                return NotFound();
            }
            return Ok(journal);
        }

        [HttpPost]
        public IActionResult CreateJournal(CreateJournalDto createJournalDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var created = _journalService.CreateJournal(createJournalDto);
            _logger.LogInformation("Created journal {Id} (slug: {Slug}) via API", created.Id, created.Slug);

            return CreatedAtAction(nameof(GetJournalBySlug), new { slug = created.Slug }, created);
        }

        [HttpPut("{slug}")]
        public IActionResult UpdateJournal(string slug, UpdateJournalDto updateJournalDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var updated = _journalService.UpdateJournal(slug, updateJournalDto);
            if (updated == null)
            {
                return NotFound();
            }

            _logger.LogInformation("Updated journal {Slug} via API", slug);

            return Ok(updated);
        }

        [HttpDelete("{slug}")]
        public IActionResult DeleteJournal(string slug)
        {
            var deleted = _journalService.DeleteJournal(slug);
            if (!deleted)
            {
                return NotFound();
            }

            _logger.LogInformation("Deleted journal {Slug} via API", slug);

            return NoContent();
        }
    }
}