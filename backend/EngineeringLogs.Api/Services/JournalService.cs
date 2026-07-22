using EngineeringLogs.Api.DTOs.Journals;
using EngineeringLogs.Api.Extensions;
using EngineeringLogs.Api.Models;
using Microsoft.Extensions.Logging;

namespace EngineeringLogs.Api.Services;

public class JournalService : IJournalService
{
    private readonly ILogger<JournalService> _logger;

    public JournalService(ILogger<JournalService> logger)
    {
        _logger = logger;
    }
    private static readonly List<Journal> _journals = new()
    {
        new Journal
        {
            Id = 1,
            Title = "Created Python project for image processing",
            Slug = "created-python-project-for-image-processing",
            Date = new DateTime(2023, 4, 5),
            Summary = "Made a Python project for image processing using OpenCV.",
            Tags = new List<string>
            {
                "Python",
                "Image Processing",
                "OpenCV"
            },
            ProjectSlug = "image-processing-application"
        },

        new Journal
        {
            Id = 2,
            Title = "Added UI elements to image processing application",
            Slug = "added-ui-elements-to-image-processing-application",
            Date = new DateTime(2023, 4, 6),
            Summary = "Added UI elements to the image processing application using PyQt5.",
            Tags = new List<string>
            {
                "Python",
                "Image Processing",
                "OpenCV"
            },
            ProjectSlug = "image-processing-application"
        },

        new Journal
        {
            Id = 3,
            Title = "Added image filtering feature to image processing application",
            Slug = "added-image-filtering-feature-to-image-processing-application",
            Date = new DateTime(2023, 4, 7),
            Summary = "Added image filtering feature to the image processing application using OpenCV and kernel algorithms.",
            Tags = new List<string>
            {
                "Python",
                "Image Processing",
                "OpenCV"
            },
            ProjectSlug = "image-processing-application"
        }
    };

    public IEnumerable<JournalDto> GetJournals()
    {
        return _journals.Select(JournalExtensions.ToDto);
    }
    public JournalDto? GetJournalBySlug(string slug)
    {
        var journal = _journals.FirstOrDefault(j => j.Slug.Equals(slug, StringComparison.OrdinalIgnoreCase));
        return journal is null ? null : JournalExtensions.ToDto(journal);
    }

    public JournalDto CreateJournal(CreateJournalDto createJournalDto)
    {
        var newId = _journals.Any() ? _journals.Max(j => j.Id) + 1 : 1;

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
        while (_journals.Any(j => j.Slug.Equals(slug, StringComparison.OrdinalIgnoreCase)))
        {
            suffix++;
            slug = $"{baseSlug}-{suffix}";
        }

        var journal = new Journal
        {
            Id = newId,
            Title = createJournalDto.Title,
            Slug = slug,
            Date = DateTime.UtcNow,
            Summary = createJournalDto.Summary,
            Tags = createJournalDto.Tags ?? new List<string>(),
            ProjectSlug = createJournalDto.ProjectSlug
        };

        _journals.Add(journal);
        _logger.LogInformation("Created journal {Id} (slug: {Slug})", journal.Id, journal.Slug);

        return JournalExtensions.ToDto(journal);
    }

    public JournalDto? UpdateJournal(string slug, UpdateJournalDto updateJournalDto)
    {
        var journal = _journals.FirstOrDefault(j => j.Slug.Equals(slug, StringComparison.OrdinalIgnoreCase));
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
            while (_journals.Any(j => j.Id != journal.Id && j.Slug.Equals(newSlug, StringComparison.OrdinalIgnoreCase)))
            {
                suffix2++;
                newSlug = $"{baseSlug2}-{suffix2}";
            }
            journal.Slug = newSlug;
        }

        _logger.LogInformation("Updated journal {Id} (slug: {Slug})", journal.Id, journal.Slug);

        return JournalExtensions.ToDto(journal);
    }

    public bool DeleteJournal(string slug)
    {
        var journal = _journals.FirstOrDefault(j => j.Slug.Equals(slug, StringComparison.OrdinalIgnoreCase));
        if (journal == null) return false;

        _journals.Remove(journal);
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