using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplicationPlateforme.Migrations
{
    public partial class MigrationstTransfertServices : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "soldemaladie",
                table: "soldeConges",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            
        }
    }
}
