using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplicationPlateforme.Migrations
{
    public partial class MigrationRHS1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "dirid",
                table: "demandeTickets",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "dirnom",
                table: "demandeTickets",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "etat",
                table: "demandeTickets",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "etatdate",
                table: "demandeTickets",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "dirid",
                table: "demandeSalariales",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "dirnom",
                table: "demandeSalariales",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "etat",
                table: "demandeSalariales",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "etatdate",
                table: "demandeSalariales",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "dirid",
                table: "demandeTickets");

            migrationBuilder.DropColumn(
                name: "dirnom",
                table: "demandeTickets");

            migrationBuilder.DropColumn(
                name: "etat",
                table: "demandeTickets");

            migrationBuilder.DropColumn(
                name: "etatdate",
                table: "demandeTickets");

            migrationBuilder.DropColumn(
                name: "dirid",
                table: "demandeSalariales");

            migrationBuilder.DropColumn(
                name: "dirnom",
                table: "demandeSalariales");

            migrationBuilder.DropColumn(
                name: "etat",
                table: "demandeSalariales");

            migrationBuilder.DropColumn(
                name: "etatdate",
                table: "demandeSalariales");
        }
    }
}
