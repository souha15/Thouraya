using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace WebApplicationPlateforme.Migrations
{
    public partial class MigrationForEvenets : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "beneficiaireEvents",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    categ = table.Column<string>(nullable: true),
                    nombre = table.Column<string>(nullable: true),
                    langue = table.Column<string>(nullable: true),
                    attribut1 = table.Column<int>(nullable: false),
                    attribut2 = table.Column<string>(nullable: true),
                    attribut3 = table.Column<string>(nullable: true),
                    attribut4 = table.Column<int>(nullable: false),
                    idEvent = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_beneficiaireEvents", x => x.Id);
                    table.ForeignKey(
                        name: "FK_beneficiaireEvents_evenements_idEvent",
                        column: x => x.idEvent,
                        principalTable: "evenements",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "depenseEvents",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_depenseEvents", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "outilsEvents",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    categ = table.Column<string>(nullable: true),
                    nombre = table.Column<string>(nullable: true),
                    attribut1 = table.Column<int>(nullable: false),
                    attribut2 = table.Column<string>(nullable: true),
                    attribut3 = table.Column<string>(nullable: true),
                    attribut4 = table.Column<int>(nullable: false),
                    idEvent = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_outilsEvents", x => x.Id);
                    table.ForeignKey(
                        name: "FK_outilsEvents_evenements_idEvent",
                        column: x => x.idEvent,
                        principalTable: "evenements",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_beneficiaireEvents_idEvent",
                table: "beneficiaireEvents",
                column: "idEvent");

            migrationBuilder.CreateIndex(
                name: "IX_outilsEvents_idEvent",
                table: "outilsEvents",
                column: "idEvent");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "beneficiaireEvents");

            migrationBuilder.DropTable(
                name: "depenseEvents");

            migrationBuilder.DropTable(
                name: "outilsEvents");
        }
    }
}
