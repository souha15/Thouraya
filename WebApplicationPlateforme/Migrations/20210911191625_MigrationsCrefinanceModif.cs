using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplicationPlateforme.Migrations
{
    public partial class MigrationsCrefinanceModif : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "datedirg",
                table: "creanceFinancieres",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "datedirproj",
                table: "creanceFinancieres",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "daterh",
                table: "creanceFinancieres",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "etatdirg",
                table: "creanceFinancieres",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "etatdirproj",
                table: "creanceFinancieres",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "etatrh",
                table: "creanceFinancieres",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "iddirg",
                table: "creanceFinancieres",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "iddirproj",
                table: "creanceFinancieres",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "idrh",
                table: "creanceFinancieres",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "nomdirg",
                table: "creanceFinancieres",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "nomdirproj",
                table: "creanceFinancieres",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "nomrh",
                table: "creanceFinancieres",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "datedirg",
                table: "creanceFinancieres");

            migrationBuilder.DropColumn(
                name: "datedirproj",
                table: "creanceFinancieres");

            migrationBuilder.DropColumn(
                name: "daterh",
                table: "creanceFinancieres");

            migrationBuilder.DropColumn(
                name: "etatdirg",
                table: "creanceFinancieres");

            migrationBuilder.DropColumn(
                name: "etatdirproj",
                table: "creanceFinancieres");

            migrationBuilder.DropColumn(
                name: "etatrh",
                table: "creanceFinancieres");

            migrationBuilder.DropColumn(
                name: "iddirg",
                table: "creanceFinancieres");

            migrationBuilder.DropColumn(
                name: "iddirproj",
                table: "creanceFinancieres");

            migrationBuilder.DropColumn(
                name: "idrh",
                table: "creanceFinancieres");

            migrationBuilder.DropColumn(
                name: "nomdirg",
                table: "creanceFinancieres");

            migrationBuilder.DropColumn(
                name: "nomdirproj",
                table: "creanceFinancieres");

            migrationBuilder.DropColumn(
                name: "nomrh",
                table: "creanceFinancieres");
        }
    }
}
