using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplicationPlateforme.Migrations
{
    public partial class MigrationServiceFormation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "datec",
                table: "demandeFormations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "etatc",
                table: "demandeFormations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "idc",
                table: "demandeFormations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "nomc",
                table: "demandeFormations",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "datec",
                table: "demandeFormations");

            migrationBuilder.DropColumn(
                name: "etatc",
                table: "demandeFormations");

            migrationBuilder.DropColumn(
                name: "idc",
                table: "demandeFormations");

            migrationBuilder.DropColumn(
                name: "nomc",
                table: "demandeFormations");
        }
    }
}
