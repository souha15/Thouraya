using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace WebApplicationPlateforme.Migrations.Dawaa
{
    public partial class MigrationsTxtNotifAndMsgSend : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
           

            migrationBuilder.CreateTable(
                name: "NotifTexts",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    type = table.Column<string>(nullable: true),
                    text = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NotifTexts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AddresseMacs",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    adresseMac = table.Column<string>(nullable: true),
                    date = table.Column<string>(nullable: true),
                    pcInfos = table.Column<string>(nullable: true),
                    attribut1 = table.Column<int>(nullable: false),
                    attribut2 = table.Column<string>(nullable: true),
                    attribut3 = table.Column<string>(nullable: true),
                    attribut4 = table.Column<string>(nullable: true),
                    attribut5 = table.Column<string>(nullable: true),
                    attribut6 = table.Column<string>(nullable: true),
                    dateenreg = table.Column<string>(nullable: true),
                    userName = table.Column<string>(nullable: true),
                    etabName = table.Column<string>(nullable: true),
                    adminName = table.Column<string>(nullable: true),
                    userId = table.Column<string>(nullable: true),
                    etabId = table.Column<int>(nullable: false),
                    adminId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AddresseMacs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AddresseMacs_AspNetUsers_userId",
                        column: x => x.userId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });




            migrationBuilder.CreateIndex(
                name: "IX_AddresseMacs_userId",
                table: "AddresseMacs",
                column: "userId");

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AddresseMacs");

            migrationBuilder.DropTable(
                name: "NotifTexts");

        }
    }
}
