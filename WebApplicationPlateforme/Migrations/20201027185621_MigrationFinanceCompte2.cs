using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace WebApplicationPlateforme.Migrations
{
    public partial class MigrationFinanceCompte2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "etatComptes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    banque = table.Column<string>(nullable: true),
                    type = table.Column<string>(nullable: true),
                    numCompte = table.Column<string>(nullable: true),
                    date = table.Column<string>(nullable: true),
                    solde = table.Column<string>(nullable: true),
                    etat = table.Column<string>(nullable: true),
                    attibut1 = table.Column<string>(nullable: true),
                    attribut2 = table.Column<string>(nullable: true),
                    attribut3 = table.Column<string>(nullable: true),
                    attribut4 = table.Column<string>(nullable: true),
                    attribut5 = table.Column<string>(nullable: true),
                    attribut6 = table.Column<string>(nullable: true),
                    creatorName = table.Column<string>(nullable: true),
                    idUserCreator = table.Column<string>(nullable: true),
                    idCompte = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_etatComptes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_etatComptes_comptes_idCompte",
                        column: x => x.idCompte,
                        principalTable: "comptes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_etatComptes_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "etatListComptes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_etatListComptes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "serviceBanques",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    banque = table.Column<string>(nullable: true),
                    type = table.Column<string>(nullable: true),
                    numCompte = table.Column<string>(nullable: true),
                    datedeb = table.Column<string>(nullable: true),
                    datefin = table.Column<string>(nullable: true),
                    attibut1 = table.Column<string>(nullable: true),
                    attribut2 = table.Column<string>(nullable: true),
                    attribut3 = table.Column<string>(nullable: true),
                    attribut4 = table.Column<string>(nullable: true),
                    attribut5 = table.Column<string>(nullable: true),
                    attribut6 = table.Column<string>(nullable: true),
                    creatorName = table.Column<string>(nullable: true),
                    idUserCreator = table.Column<string>(nullable: true),
                    idCompte = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_serviceBanques", x => x.Id);
                    table.ForeignKey(
                        name: "FK_serviceBanques_comptes_idCompte",
                        column: x => x.idCompte,
                        principalTable: "comptes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_serviceBanques_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "filesEtatComptes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    path = table.Column<string>(nullable: true),
                    type = table.Column<string>(nullable: true),
                    idCompte = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_filesEtatComptes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_filesEtatComptes_etatComptes_idCompte",
                        column: x => x.idCompte,
                        principalTable: "etatComptes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_etatComptes_idCompte",
                table: "etatComptes",
                column: "idCompte");

            migrationBuilder.CreateIndex(
                name: "IX_etatComptes_idUserCreator",
                table: "etatComptes",
                column: "idUserCreator");

            migrationBuilder.CreateIndex(
                name: "IX_filesEtatComptes_idCompte",
                table: "filesEtatComptes",
                column: "idCompte");

            migrationBuilder.CreateIndex(
                name: "IX_serviceBanques_idCompte",
                table: "serviceBanques",
                column: "idCompte");

            migrationBuilder.CreateIndex(
                name: "IX_serviceBanques_idUserCreator",
                table: "serviceBanques",
                column: "idUserCreator");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "etatListComptes");

            migrationBuilder.DropTable(
                name: "filesEtatComptes");

            migrationBuilder.DropTable(
                name: "serviceBanques");

            migrationBuilder.DropTable(
                name: "etatComptes");
        }
    }
}
