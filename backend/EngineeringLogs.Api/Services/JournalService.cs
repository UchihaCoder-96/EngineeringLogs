using EngineeringLogs.Api.DTOs.Journals;
using EngineeringLogs.Api.Extensions;
using EngineeringLogs.Api.Models;
using EngineeringLogs.Api.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace EngineeringLogs.Api.Services;

public class JournalService : IJournalService
{
    private readonly ILogger<JournalService> _logger;
    private readonly EngineeringLogsDbContext _context;

    public JournalService(ILogger<JournalService> logger, EngineeringLogsDbContext context)
    {
        _logger = logger;
        _context = context;
    }

    public async Task<IEnumerable<JournalDto>> GetJournalsAsync()
    {
        var journals = await _context.Journals.ToListAsync();
        return journals.Select(JournalExtensions.ToDto);
    }

    public async Task<JournalDto?> GetJournalBySlugAsync(string slug)
    {
        var normalized = Utilities.EFStringComparisons.NormalizeForComparison(slug);
        var journal = await _context.Journals.FirstOrDefaultAsync(j => j.Slug.ToLower() == normalized);
        return journal is null ? null : JournalExtensions.ToDto(journal);
    }

    public async Task<JournalDto> CreateJournalAsync(CreateJournalDto createJournalDto)
    {
        string GenerateSlug(string title)
        {
            var s = title?.ToLowerInvariant() ?? string.Empty;
            s = System.Text.RegularExpressions.Regex.Replace(s, "[^a-z0-9\\s-]", "");
            s = System.Text.RegularExpressions.Regex.Replace(s, "\\s+", "-").Trim('-');
            return s;
        }

        var slug = GenerateSlug(createJournalDto.Title);
        var baseSlug = slug;
        var suffix = 1;
        var normalized = Utilities.EFStringComparisons.NormalizeForComparison(slug);

        while (await _context.Journals.AnyAsync(j => j.Slug.ToLower() == normalized))
        {
            suffix++;
            slug = $"{baseSlug}-{suffix}";
            normalized = Utilities.EFStringComparisons.NormalizeForComparison(slug);
        }

        var journal = new Journal
        {
            Title = createJournalDto.Title,
            Slug = slug,
            Date = DateTime.UtcNow,
            Summary = createJournalDto.Summary,
            Tags = createJournalDto.Tags ?? new List<string>(),
            ProjectSlug = createJournalDto.ProjectSlug
        };

        _context.Journals.Add(journal);
        await _context.SaveChangesAsync();

        _logger.LogInformation("Created journal {Id} (slug: {Slug})", journal.Id, journal.Slug);

        return JournalExtensions.ToDto(journal);
    }

    public async Task<JournalDto?> UpdateJournalAsync(string slug, UpdateJournalDto updateJournalDto)
    {
        var normalized = Utilities.EFStringComparisons.NormalizeForComparison(slug);
        var journal = await _context.Journals.FirstOrDefaultAsync(j => j.Slug.ToLower() == normalized);
        if (journal == null) return null;

        journal.Title = updateJournalDto.Title;
        journal.Summary = updateJournalDto.Summary;
        journal.Tags = updateJournalDto.Tags ?? new List<string>();
        journal.ProjectSlug = updateJournalDto.ProjectSlug;

        // regenerate slug if title changed
        var newSlug = GenerateSlug(updateJournalDto.Title);
        if (!newSlug.Equals(journal.Slug, StringComparison.OrdinalIgnoreCase))
        {
            var baseSlug2 = newSlug;
            var suffix2 = 1;
            var newNormalized = Utilities.EFStringComparisons.NormalizeForComparison(newSlug);
            while (await _context.Journals.AnyAsync(j => j.Id != journal.Id && j.Slug.ToLower() == newNormalized))
            {
                suffix2++;
                newSlug = $"{baseSlug2}-{suffix2}";
            }
            journal.Slug = newSlug;
        }

        await _context.SaveChangesAsync();

        _logger.LogInformation("Updated journal {Id} (slug: {Slug})", journal.Id, journal.Slug);

        return JournalExtensions.ToDto(journal);
    }

    public async Task<bool> DeleteJournalAsync(string slug)
    {
        var normalized = Utilities.EFStringComparisons.NormalizeForComparison(slug);
        var journal = await _context.Journals.FirstOrDefaultAsync(j => j.Slug.ToLower() == normalized);
        if (journal == null) return false;

        _context.Journals.Remove(journal);
        await _context.SaveChangesAsync();

        _logger.LogInformation("Deleted journal {Id} (slug: {Slug})", journal.Id, slug);
        return true;
    }

    static string GenerateSlug(string title)
    {
        var s = title?.ToLowerInvariant() ?? string.Empty;
        s = System.Text.RegularExpressions.Regex.Replace(s, "[^a-z0-9\\s-]", "");
        s = System.Text.RegularExpressions.Regex.Replace(s, "\\s+", "-").Trim('-');
        return s;
    }
}
