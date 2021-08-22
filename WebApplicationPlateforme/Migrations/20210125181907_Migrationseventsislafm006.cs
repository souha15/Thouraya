using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace WebApplicationPlateforme.Migrations
{
    public partial class Migrationseventsislafm006 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
           

            migrationBuilder.CreateTable(
                name: "entrerDansIslams",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nat = table.Column<string>(nullable: true),
                    langue = table.Column<string>(nullable: true),
                    nb = table.Column<string>(nullable: true),
                    attribut1 = table.Column<string>(nullable: true),
                    attribut2 = table.Column<string>(nullable: true),
                    attribut3 = table.Column<string>(nullable: true),
                    attribut4 = table.Column<int>(nullable: false),
                    idEvent = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_entrerDansIslams", x => x.Id);
                    table.ForeignKey(
                        name: "FK_entrerDansIslams_evenements_idEvent",
                        column: x => x.idEvent,
                        principalTable: "evenements",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_entrerDansIslams_idEvent",
                table: "entrerDansIslams",
                column: "idEvent");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "entrerDansIslams");

    
        }
    }
}
