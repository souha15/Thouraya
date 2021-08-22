using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplicationPlateforme.Migrations
{
    public partial class MigrationProjet6 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_payementProjets_butProjets_idBut",
                table: "payementProjets");

            migrationBuilder.DropIndex(
                name: "IX_payementProjets_idBut",
                table: "payementProjets");

            migrationBuilder.DropColumn(
                name: "idBut",
                table: "payementProjets");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "idBut",
                table: "payementProjets",
                type: "integer",
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
    }
}
