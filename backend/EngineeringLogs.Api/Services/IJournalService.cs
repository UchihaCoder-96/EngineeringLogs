using EngineeringLogs.Api.Models;
using EngineeringLogs.Api.DTOs.Journals;

namespace EngineeringLogs.Api.Services
{
    public interface IJournalService
    {
        IEnumerable<JournalDto> GetJournals();
        JournalDto? GetJournalBySlug(string slug);
        JournalDto CreateJournal(CreateJournalDto createJournalDto);
        JournalDto? UpdateJournal(string slug, UpdateJournalDto updateJournalDto);
        bool DeleteJournal(string slug);
    }
}
