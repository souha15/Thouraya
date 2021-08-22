using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplicationPlateforme.Migrations
{
    public partial class MigrationFinanceEditBrancheTypes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
     

            migrationBuilder.AddColumn<int>(
                name: "idBOne",
                table: "brancheTwos",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_brancheTwos_idBOne",
                table: "brancheTwos",
                column: "idBOne");

            migrationBuilder.AddForeignKey(
                name: "FK_brancheTwos_brancheOnes_idBOne",
                table: "brancheTwos",
                column: "idBOne",
                principalTable: "brancheOnes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_brancheTwos_brancheOnes_idBOne",
                table: "brancheTwos");

            migrationBuilder.DropIndex(
                name: "IX_brancheTwos_idBOne",
                table: "brancheTwos");

            migrationBuilder.DropColumn(
                name: "idBOne",
                table: "brancheTwos");

            migrationBuilder.AddColumn<int>(
                name: "idTF",
                table: "brancheTwos",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_brancheTwos_idTF",
                table: "brancheTwos",
                column: "idTF");

            migrationBuilder.AddForeignKey(
                name: "FK_brancheTwos_brancheOnes_idTF",
                table: "brancheTwos",
                column: "idTF",
                principalTable: "brancheOnes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
