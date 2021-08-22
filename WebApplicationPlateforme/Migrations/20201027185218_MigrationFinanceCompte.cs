using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplicationPlateforme.Migrations
{
    public partial class MigrationFinanceCompte : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "numCompte",
                table: "comptes",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "type",
                table: "comptes",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "numCompte",
                table: "comptes");

            migrationBuilder.DropColumn(
                name: "type",
                table: "comptes");
        }
    }
}
