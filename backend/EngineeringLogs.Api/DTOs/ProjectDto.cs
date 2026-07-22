namespace EngineeringLogs.Api.DTOs
{
    public class ProjectDto
    {
        public int Id { get; set; }

        public string Title { get; set; } = string.Empty;

        public string ShortDescription { get; set; } = string.Empty;

        public string Status { get; set; } = string.Empty;

        public string Category { get; set; } = string.Empty;

        public string Difficulty { get; set; } = string.Empty;

        public int ViewCount { get; set; }

        public string Slug { get; set; } = string.Empty;
    }
}
