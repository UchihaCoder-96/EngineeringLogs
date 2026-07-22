using EngineeringLogs.Api.DTOs;
using EngineeringLogs.Api.Models;

namespace EngineeringLogs.Api.Extensions
{
    public static class JournalExtensions
    {
        public static JournalDto ToDto(this Journal journal)
        {
            return new JournalDto
            {
                Id = journal.Id,
                Title = journal.Title,
                Summary = journal.Summary,
                Date = journal.Date,
                Tags = journal.Tags,
                ProjectSlug = journal.ProjectSlug,
                Slug = journal.Slug,
            };
        }
    }
}
