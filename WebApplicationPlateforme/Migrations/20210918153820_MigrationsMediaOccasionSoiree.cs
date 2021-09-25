using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplicationPlateforme.Migrations
{
    public partial class MigrationsMediaOccasionSoiree : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GuestSoiree_GuestSoiree_idGuestSoiree",
                table: "GuestSoiree");

            migrationBuilder.DropIndex(
                name: "IX_GuestSoiree_idGuestSoiree",
                table: "GuestSoiree");

            migrationBuilder.DropColumn(
                name: "idGuestSoiree",
                table: "GuestSoiree");

            migrationBuilder.AddColumn<int>(
                name: "idSoiree",
                table: "GuestSoiree",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_GuestSoiree_idSoiree",
                table: "GuestSoiree",
                column: "idSoiree");

            migrationBuilder.AddForeignKey(
                name: "FK_GuestSoiree_OccasionSoiree_idSoiree",
                table: "GuestSoiree",
                column: "idSoiree",
                principalTable: "OccasionSoiree",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GuestSoiree_OccasionSoiree_idSoiree",
                table: "GuestSoiree");

            migrationBuilder.DropIndex(
                name: "IX_GuestSoiree_idSoiree",
                table: "GuestSoiree");

            migrationBuilder.DropColumn(
                name: "idSoiree",
                table: "GuestSoiree");

            migrationBuilder.AddColumn<int>(
                name: "idGuestSoiree",
                table: "GuestSoiree",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_GuestSoiree_idGuestSoiree",
                table: "GuestSoiree",
                column: "idGuestSoiree");

            migrationBuilder.AddForeignKey(
                name: "FK_GuestSoiree_GuestSoiree_idGuestSoiree",
                table: "GuestSoiree",
                column: "idGuestSoiree",
                principalTable: "GuestSoiree",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
