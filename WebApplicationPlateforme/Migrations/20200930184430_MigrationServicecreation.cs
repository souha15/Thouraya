using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplicationPlateforme.Migrations
{
    public partial class MigrationServicecreation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "datedg",
                table: "creationTravailDemandes",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "etatdg",
                table: "creationTravailDemandes",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "iddg",
                table: "creationTravailDemandes",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "nomdg",
                table: "creationTravailDemandes",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "datedg",
                table: "creationTravailDemandes");

            migrationBuilder.DropColumn(
                name: "etatdg",
                table: "creationTravailDemandes");

            migrationBuilder.DropColumn(
                name: "iddg",
                table: "creationTravailDemandes");

            migrationBuilder.DropColumn(
                name: "nomdg",
                table: "creationTravailDemandes");
        }
    }
}
