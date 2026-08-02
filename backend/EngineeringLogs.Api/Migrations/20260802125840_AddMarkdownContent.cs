using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EngineeringLogs.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddMarkdownContent : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Content",
                table: "Projects",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Content",
                table: "Journals",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Content",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "Content",
                table: "Journals");
        }
    }
}
