using EngineeringLogs.Api.Models;

namespace EngineeringLogs.Api.Services
{
    public interface IJournalService
    {
        IEnumerable<Journal> GetJournals();
        Journal? GetJournalBySlug(string slug);
    }
}
