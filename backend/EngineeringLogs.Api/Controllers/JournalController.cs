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
        public async Task<IActionResult> GetJournals()
        {
            return Ok(await _journalService.GetJournalsAsync());
        }

        [HttpGet("{slug}")]
        public async Task<IActionResult> GetJournalBySlug(string slug)
        {
            var journal = await _journalService.GetJournalBySlugAsync(slug);
            if (journal == null)
            {
                return NotFound();
            }
            return Ok(journal);
        }

        [HttpPost]
        public async Task<IActionResult> CreateJournal(CreateJournalDto createJournalDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var created = await _journalService.CreateJournalAsync(createJournalDto);
            _logger.LogInformation("Created journal {Id} (slug: {Slug}) via API", created.Id, created.Slug);

            return CreatedAtAction(nameof(GetJournalBySlug), new { slug = created.Slug }, created);
        }

        [HttpPut("{slug}")]
        public async Task<IActionResult> UpdateJournal(string slug, UpdateJournalDto updateJournalDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var updated = await _journalService.UpdateJournalAsync(slug, updateJournalDto);
            if (updated == null)
            {
                return NotFound();
            }

            _logger.LogInformation("Updated journal {Slug} via API", slug);

            return Ok(updated);
        }

        [HttpDelete("{slug}")]
        public async Task<IActionResult> DeleteJournal(string slug)
        {
            var deleted = await _journalService.DeleteJournalAsync(slug);
            if (!deleted)
            {
                return NotFound();
            }

            _logger.LogInformation("Deleted journal {Slug} via API", slug);

            return NoContent();
        }
    }
}