namespace EngineeringLogs.Api.Models;

public class Journal
{
    public int Id { get; set; }

    public string Title { get; set; } = string.Empty;

    public string Slug { get; set; } = string.Empty;

    public DateTime Date { get; set; }

    public string Summary { get; set; } = string.Empty;

    public List<string> Tags { get; set; } = [];

    public string? ProjectSlug { get; set; }
}