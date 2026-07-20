using EngineeringLogs.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace EngineeringLogs.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class JournalController : ControllerBase
    {
        private readonly IJournalService _journalService;

        public JournalController(IJournalService journalService)
        {
            _journalService = journalService;
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
    }
}