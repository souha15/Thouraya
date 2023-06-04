using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace WebApplicationPlateforme.Migrations.Main
{
    public partial class MigrationsMainContext : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.CreateTable(
                name: "SideMenuMain",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true),
                    path = table.Column<string>(nullable: true),
                    idAdmin = table.Column<int>(nullable: false),
                    nomAdmin = table.Column<string>(nullable: true),
                    icon = table.Column<string>(nullable: true),
                    nbUnderMain = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SideMenuMain", x => x.Id);
                });

           
            migrationBuilder.CreateTable(
                name: "SideMenuUnderMain",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true),
                    path = table.Column<string>(nullable: true),
                    idDep = table.Column<int>(nullable: false),
                    nomDep = table.Column<string>(nullable: true),
                    idMain = table.Column<int>(nullable: false),
                    nomMain = table.Column<string>(nullable: true),
                    nbModules = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SideMenuUnderMain", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SideMenuUnderMain_SideMenuMain_idMain",
                        column: x => x.idMain,
                        principalTable: "SideMenuMain",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ModuleSideMenu",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true),
                    path = table.Column<string>(nullable: true),
                    idUnderMain = table.Column<int>(nullable: false),
                    nomUnderMain = table.Column<string>(nullable: true),
                    icon = table.Column<string>(nullable: true),
                    nbModules = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ModuleSideMenu", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ModuleSideMenu_SideMenuUnderMain_idUnderMain",
                        column: x => x.idUnderMain,
                        principalTable: "SideMenuUnderMain",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });



            migrationBuilder.CreateIndex(
                name: "IX_ModuleSideMenu_idUnderMain",
                table: "ModuleSideMenu",
                column: "idUnderMain");

            migrationBuilder.CreateIndex(
                name: "IX_SideMenuUnderMain_idMain",
                table: "SideMenuUnderMain",
                column: "idMain");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
          

            migrationBuilder.DropTable(
                name: "ModuleSideMenu");

            migrationBuilder.DropTable(
                name: "SideMenuUnderMain");

            migrationBuilder.DropTable(
                name: "SideMenuMain");
        }
    }
}
