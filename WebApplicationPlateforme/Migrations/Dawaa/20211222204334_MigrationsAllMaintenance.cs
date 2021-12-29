using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace WebApplicationPlateforme.Migrations.Dawaa
{
    public partial class MigrationsAllMaintenance : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AllMaintenanceTypes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AllMaintenanceTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AllTypeOfMaintenance",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    detail = table.Column<string>(nullable: true),
                    type = table.Column<string>(nullable: true),
                    autre = table.Column<string>(nullable: true),
                    req = table.Column<string>(nullable: true),
                    iddir = table.Column<string>(nullable: true),
                    nomdir = table.Column<string>(nullable: true),
                    etadir = table.Column<string>(nullable: true),
                    datedir = table.Column<string>(nullable: true),
                    employeeid = table.Column<string>(nullable: true),
                    employeenom = table.Column<string>(nullable: true),
                    dateemployee = table.Column<string>(nullable: true),
                    etatemployee = table.Column<string>(nullable: true),
                    attribut1 = table.Column<string>(nullable: true),
                    attribut7 = table.Column<string>(nullable: true),
                    attribut2 = table.Column<string>(nullable: true),
                    attribut3 = table.Column<string>(nullable: true),
                    attribut4 = table.Column<string>(nullable: true),
                    attribut5 = table.Column<string>(nullable: true),
                    attribut6 = table.Column<string>(nullable: true),
                    userNameCreator = table.Column<string>(nullable: true),
                    idUserCreator = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AllTypeOfMaintenance", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AllTypeOfMaintenance_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AllTypeOfMaintenance_idUserCreator",
                table: "AllTypeOfMaintenance",
                column: "idUserCreator");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AllMaintenanceTypes");

            migrationBuilder.DropTable(
                name: "AllTypeOfMaintenance");
        }
    }
}
