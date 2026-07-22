using EngineeringLogs.Api.Models;
using EngineeringLogs.Api.DTOs;

namespace EngineeringLogs.Api.Services
{
    public interface IJournalService
    {
        IEnumerable<JournalDto> GetJournals();
        JournalDto? GetJournalBySlug(string slug);
    }
}
