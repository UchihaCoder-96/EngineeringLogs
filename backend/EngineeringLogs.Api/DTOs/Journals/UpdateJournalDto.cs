using System.ComponentModel.DataAnnotations;

namespace EngineeringLogs.Api.DTOs.Journals
{
    public class UpdateJournalDto
    {
        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = string.Empty;

        [Required]
        [MaxLength(1000)]
        public string Summary { get; set; } = string.Empty;

        [MinLength(1)]
        public List<string> Tags { get; set; } = new List<string>();

        public string? ProjectSlug { get; set; }
    }
}
