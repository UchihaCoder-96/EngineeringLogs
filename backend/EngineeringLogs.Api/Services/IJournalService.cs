using EngineeringLogs.Api.Models;
using EngineeringLogs.Api.DTOs.Journals;

namespace EngineeringLogs.Api.Services
{
    public interface IJournalService
    {
        Task<IEnumerable<JournalDto>> GetJournalsAsync();
        Task<JournalDto?> GetJournalBySlugAsync(string slug);
        Task<JournalDto> CreateJournalAsync(CreateJournalDto createJournalDto);
        Task<JournalDto?> UpdateJournalAsync(string slug, UpdateJournalDto updateJournalDto);
        Task<bool> DeleteJournalAsync(string slug);
    }
}
