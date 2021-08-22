using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplicationPlateforme.Migrations
{
    public partial class MigrationProjet4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
         

            migrationBuilder.AddColumn<string>(
                name: "but",
                table: "payementProjets",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "butprojet",
                table: "payementProjets",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "idBut",
                table: "payementProjets",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_payementProjets_idBut",
                table: "payementProjets",
                column: "idBut");

            migrationBuilder.AddForeignKey(
                name: "FK_payementProjets_butProjets_idBut",
                table: "payementProjets",
                column: "idBut",
                principalTable: "butProjets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_payementProjets_butProjets_idBut",
                table: "payementProjets");

            migrationBuilder.DropIndex(
                name: "IX_payementProjets_idBut",
                table: "payementProjets");

            migrationBuilder.DropColumn(
                name: "but",
                table: "payementProjets");

            migrationBuilder.DropColumn(
                name: "butprojet",
                table: "payementProjets");

            migrationBuilder.DropColumn(
                name: "idBut",
                table: "payementProjets");

  
        }
    }
}
