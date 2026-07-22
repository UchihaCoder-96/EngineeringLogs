using EngineeringLogs.Api.Models;
using EngineeringLogs.Api.DTOs.Journals;

namespace EngineeringLogs.Api.Services
{
    public interface IJournalService
    {
        IEnumerable<JournalDto> GetJournals();
        JournalDto? GetJournalBySlug(string slug);
    }
}
