using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace WebApplicationPlateforme.Migrations
{
    public partial class MigrationRHS : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "demandeSalariales",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    type = table.Column<string>(nullable: true),
                    date = table.Column<string>(nullable: true),
                    langue = table.Column<string>(nullable: true),
                    organisme = table.Column<string>(nullable: true),
                    attribut1 = table.Column<string>(nullable: true),
                    attribut2 = table.Column<string>(nullable: true),
                    dateenreg = table.Column<string>(nullable: true),
                    userNameCreator = table.Column<string>(nullable: true),
                    idUserCreator = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_demandeSalariales", x => x.Id);
                    table.ForeignKey(
                        name: "FK_demandeSalariales_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "demandeTickets",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true),
                    titre = table.Column<string>(nullable: true),
                    regcivil = table.Column<string>(nullable: true),
                    num = table.Column<string>(nullable: true),
                    place = table.Column<string>(nullable: true),
                    photosPath = table.Column<string>(nullable: true),
                    dateenreg = table.Column<string>(nullable: true),
                    userNameCreator = table.Column<string>(nullable: true),
                    idUserCreator = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_demandeTickets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_demandeTickets_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "soldeConges",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    type = table.Column<string>(nullable: true),
                    mois = table.Column<string>(nullable: true),
                    annee = table.Column<string>(nullable: true),
                    number = table.Column<string>(nullable: true),
                    dateenreg = table.Column<string>(nullable: true),
                    userNameCreator = table.Column<string>(nullable: true),
                    idUserCreator = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_soldeConges", x => x.Id);
                    table.ForeignKey(
                        name: "FK_soldeConges_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PiecesJointesDts",
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
                    IdTic = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PiecesJointesDts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PiecesJointesDts_demandeTickets_IdTic",
                        column: x => x.IdTic,
                        principalTable: "demandeTickets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PiecesJointesDts_AspNetUsers_IdUserCreator",
                        column: x => x.IdUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_demandeSalariales_idUserCreator",
                table: "demandeSalariales",
                column: "idUserCreator");

            migrationBuilder.CreateIndex(
                name: "IX_demandeTickets_idUserCreator",
                table: "demandeTickets",
                column: "idUserCreator");

            migrationBuilder.CreateIndex(
                name: "IX_PiecesJointesDts_IdTic",
                table: "PiecesJointesDts",
                column: "IdTic");

            migrationBuilder.CreateIndex(
                name: "IX_PiecesJointesDts_IdUserCreator",
                table: "PiecesJointesDts",
                column: "IdUserCreator");

            migrationBuilder.CreateIndex(
                name: "IX_soldeConges_idUserCreator",
                table: "soldeConges",
                column: "idUserCreator");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "demandeSalariales");

            migrationBuilder.DropTable(
                name: "PiecesJointesDts");

            migrationBuilder.DropTable(
                name: "soldeConges");

            migrationBuilder.DropTable(
                name: "demandeTickets");
        }
    }
}
