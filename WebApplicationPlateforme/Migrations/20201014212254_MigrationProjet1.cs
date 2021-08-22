using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplicationPlateforme.Migrations
{
    public partial class MigrationProjet1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_organismeSupps_AspNetUsers_idUserCreator",
                table: "organismeSupps");

            migrationBuilder.DropIndex(
                name: "IX_organismeSupps_idUserCreator",
                table: "organismeSupps");

            migrationBuilder.DropColumn(
                name: "idUserCreator",
                table: "organismeSupps");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "idUserCreator",
                table: "organismeSupps",
                type: "text",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_organismeSupps_idUserCreator",
                table: "organismeSupps",
                column: "idUserCreator");

            migrationBuilder.AddForeignKey(
                name: "FK_organismeSupps_AspNetUsers_idUserCreator",
                table: "organismeSupps",
                column: "idUserCreator",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
