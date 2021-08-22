using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplicationPlateforme.Migrations
{
    public partial class MigrationServicesupp : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "idReception",
                table: "suppEquipements",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_suppEquipements_idReception",
                table: "suppEquipements",
                column: "idReception");

            migrationBuilder.AddForeignKey(
                name: "FK_suppEquipements_receptionEquipements_idReception",
                table: "suppEquipements",
                column: "idReception",
                principalTable: "receptionEquipements",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_suppEquipements_receptionEquipements_idReception",
                table: "suppEquipements");

            migrationBuilder.DropIndex(
                name: "IX_suppEquipements_idReception",
                table: "suppEquipements");

            migrationBuilder.DropColumn(
                name: "idReception",
                table: "suppEquipements");
        }
    }
}
