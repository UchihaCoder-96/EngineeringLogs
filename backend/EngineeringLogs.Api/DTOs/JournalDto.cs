namespace EngineeringLogs.Api.DTOs
{
    public class JournalDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Summary { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public List<string> Tags { get; set; } = new List<string>();
        public string? ProjectSlug { get; set; } = string.Empty;
        public string Slug { get; set; } = string.Empty;
    }
}
