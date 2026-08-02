using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EngineeringLogs.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddViewCounts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ViewCount",
                table: "Journals",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ViewCount",
                table: "Journals");
        }
    }
}
