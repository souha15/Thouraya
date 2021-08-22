using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace WebApplicationPlateforme.Migrations
{
    public partial class MigrationAD2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "piecesJointesEvents",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    path = table.Column<string>(nullable: true),
                    type = table.Column<string>(nullable: true),
                    date = table.Column<string>(nullable: true),
                    CreatorName = table.Column<string>(nullable: true),
                    datenereg = table.Column<string>(nullable: true),
                    IdUserCreator = table.Column<string>(nullable: true),
                    idEvent = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_piecesJointesEvents", x => x.Id);
                    table.ForeignKey(
                        name: "FK_piecesJointesEvents_AspNetUsers_IdUserCreator",
                        column: x => x.IdUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_piecesJointesEvents_evenements_idEvent",
                        column: x => x.idEvent,
                        principalTable: "evenements",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_piecesJointesEvents_IdUserCreator",
                table: "piecesJointesEvents",
                column: "IdUserCreator");

            migrationBuilder.CreateIndex(
                name: "IX_piecesJointesEvents_idEvent",
                table: "piecesJointesEvents",
                column: "idEvent");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "piecesJointesEvents");
        }
    }
}
