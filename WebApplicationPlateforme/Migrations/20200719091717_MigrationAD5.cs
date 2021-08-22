using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplicationPlateforme.Migrations
{
    public partial class MigrationAD5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Path",
                table: "mediasEvs",
                newName: "path");

            migrationBuilder.AddColumn<int>(
                name: "idEvent",
                table: "mediasEvs",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_mediasEvs_idEvent",
                table: "mediasEvs",
                column: "idEvent");

            migrationBuilder.AddForeignKey(
                name: "FK_mediasEvs_evenements_idEvent",
                table: "mediasEvs",
                column: "idEvent",
                principalTable: "evenements",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_mediasEvs_evenements_idEvent",
                table: "mediasEvs");

            migrationBuilder.DropIndex(
                name: "IX_mediasEvs_idEvent",
                table: "mediasEvs");

            migrationBuilder.DropColumn(
                name: "idEvent",
                table: "mediasEvs");

            migrationBuilder.RenameColumn(
                name: "path",
                table: "mediasEvs",
                newName: "Path");
        }
    }
}
