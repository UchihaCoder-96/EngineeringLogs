using EngineeringLogs.Api.Models;

namespace EngineeringLogs.Api.Services;

public class JournalService : IJournalService
{
    private static readonly List<Journal> _journals =
    [
        new Journal
        {
            Id = 1,
            Title = "Created Python project for image processing",
            Slug = "created-python-project-for-image-processing",
            Date = new DateTime(2023, 4, 5),
            Summary = "Made a Python project for image processing using OpenCV.",
            Tags =
            [
                "Python",
                "Image Processing",
                "OpenCV"
            ],
            ProjectSlug = "image-processing-application"
        },

        new Journal
        {
            Id = 2,
            Title = "Added UI elements to image processing application",
            Slug = "added-ui-elements-to-image-processing-application",
            Date = new DateTime(2023, 4, 6),
            Summary = "Added UI elements to the image processing application using PyQt5.",
            Tags =
            [
                "Python",
                "Image Processing",
                "OpenCV"
            ],
            ProjectSlug = "image-processing-application"
        },

        new Journal
        {
            Id = 3,
            Title = "Added image filtering feature to image processing application",
            Slug = "added-image-filtering-feature-to-image-processing-application",
            Date = new DateTime(2023, 4, 7),
            Summary = "Added image filtering feature to the image processing application using OpenCV and kernel algorithms.",
            Tags =
            [
                "Python",
                "Image Processing",
                "OpenCV"
            ],
            ProjectSlug = "image-processing-application"
        }
    ];

    public IEnumerable<Journal> GetJournals()
    {
        return _journals;
    }
    public Journal? GetJournalBySlug(string slug)
    {
        return _journals.FirstOrDefault(j => j.Slug.Equals(slug, StringComparison.OrdinalIgnoreCase));
    }
}