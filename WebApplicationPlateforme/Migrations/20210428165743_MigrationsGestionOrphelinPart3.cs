using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace WebApplicationPlateforme.Migrations
{
    public partial class MigrationsGestionOrphelinPart3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DotationOrphelins",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    typeDotation = table.Column<string>(nullable: true),
                    prix = table.Column<string>(nullable: true),
                    attribut1 = table.Column<int>(nullable: false),
                    attribut7 = table.Column<int>(nullable: false),
                    attribut2 = table.Column<string>(nullable: true),
                    attribut3 = table.Column<string>(nullable: true),
                    attribut4 = table.Column<string>(nullable: true),
                    attribut5 = table.Column<string>(nullable: true),
                    attribut6 = table.Column<string>(nullable: true),
                    dateenreg = table.Column<string>(nullable: true),
                    idOrph = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DotationOrphelins", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DotationOrphelins_Orphelins_idOrph",
                        column: x => x.idOrph,
                        principalTable: "Orphelins",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FinanceOrphelins",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    source = table.Column<string>(nullable: true),
                    salaire = table.Column<string>(nullable: true),
                    projetFinan = table.Column<string>(nullable: true),
                    sourceProjet = table.Column<string>(nullable: true),
                    prixProjet = table.Column<string>(nullable: true),
                    dotation = table.Column<string>(nullable: true),
                    typeDotation = table.Column<string>(nullable: true),
                    subvention = table.Column<string>(nullable: true),
                    attribut1 = table.Column<int>(nullable: false),
                    attribut7 = table.Column<int>(nullable: false),
                    attribut2 = table.Column<string>(nullable: true),
                    attribut3 = table.Column<string>(nullable: true),
                    attribut4 = table.Column<string>(nullable: true),
                    attribut5 = table.Column<string>(nullable: true),
                    attribut6 = table.Column<string>(nullable: true),
                    dateenreg = table.Column<string>(nullable: true),
                    idOrph = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FinanceOrphelins", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FinanceOrphelins_Orphelins_idOrph",
                        column: x => x.idOrph,
                        principalTable: "Orphelins",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MereOrphelins",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true),
                    cin = table.Column<string>(nullable: true),
                    dateNais = table.Column<string>(nullable: true),
                    alive = table.Column<string>(nullable: true),
                    datedeces = table.Column<string>(nullable: true),
                    raison = table.Column<string>(nullable: true),
                    lieudeces = table.Column<string>(nullable: true),
                    niveauScolaire = table.Column<string>(nullable: true),
                    travail = table.Column<string>(nullable: true),
                    lieuTravail = table.Column<string>(nullable: true),
                    salaire = table.Column<string>(nullable: true),
                    talent = table.Column<string>(nullable: true),
                    sante = table.Column<string>(nullable: true),
                    statutSociale = table.Column<string>(nullable: true),
                    soutientEnfant = table.Column<string>(nullable: true),
                    nbEnfant = table.Column<string>(nullable: true),
                    tel = table.Column<string>(nullable: true),
                    attribut1 = table.Column<int>(nullable: false),
                    attribut7 = table.Column<int>(nullable: false),
                    attribut2 = table.Column<string>(nullable: true),
                    attribut3 = table.Column<string>(nullable: true),
                    attribut4 = table.Column<string>(nullable: true),
                    attribut5 = table.Column<string>(nullable: true),
                    attribut6 = table.Column<string>(nullable: true),
                    dateenreg = table.Column<string>(nullable: true),
                    idOrph = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MereOrphelins", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MereOrphelins_Orphelins_idOrph",
                        column: x => x.idOrph,
                        principalTable: "Orphelins",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PereOrphelins",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true),
                    cin = table.Column<string>(nullable: true),
                    travail = table.Column<string>(nullable: true),
                    alive = table.Column<string>(nullable: true),
                    datedeces = table.Column<string>(nullable: true),
                    raison = table.Column<string>(nullable: true),
                    lieudeces = table.Column<string>(nullable: true),
                    salaire = table.Column<string>(nullable: true),
                    nbfemme = table.Column<string>(nullable: true),
                    req = table.Column<string>(nullable: true),
                    nbenfant = table.Column<string>(nullable: true),
                    dateNais = table.Column<string>(nullable: true),
                    attribut1 = table.Column<int>(nullable: false),
                    attribut7 = table.Column<int>(nullable: false),
                    attribut2 = table.Column<string>(nullable: true),
                    attribut3 = table.Column<string>(nullable: true),
                    attribut4 = table.Column<string>(nullable: true),
                    attribut5 = table.Column<string>(nullable: true),
                    attribut6 = table.Column<string>(nullable: true),
                    dateenreg = table.Column<string>(nullable: true),
                    idOrph = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PereOrphelins", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PereOrphelins_Orphelins_idOrph",
                        column: x => x.idOrph,
                        principalTable: "Orphelins",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PsyOrphelin",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    maladiePsy = table.Column<string>(nullable: true),
                    type = table.Column<string>(nullable: true),
                    docteur = table.Column<string>(nullable: true),
                    periode = table.Column<string>(nullable: true),
                    besoinsDoc = table.Column<string>(nullable: true),
                    periodeDod = table.Column<string>(nullable: true),
                    attribut1 = table.Column<int>(nullable: false),
                    attribut7 = table.Column<int>(nullable: false),
                    attribut2 = table.Column<string>(nullable: true),
                    attribut3 = table.Column<string>(nullable: true),
                    attribut4 = table.Column<string>(nullable: true),
                    attribut5 = table.Column<string>(nullable: true),
                    attribut6 = table.Column<string>(nullable: true),
                    dateenreg = table.Column<string>(nullable: true),
                    idOrph = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PsyOrphelin", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PsyOrphelin_Orphelins_idOrph",
                        column: x => x.idOrph,
                        principalTable: "Orphelins",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SubventionOrphelins",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    organisme = table.Column<string>(nullable: true),
                    type = table.Column<string>(nullable: true),
                    somme = table.Column<string>(nullable: true),
                    mecanisme = table.Column<string>(nullable: true),
                    attribut1 = table.Column<int>(nullable: false),
                    attribut7 = table.Column<int>(nullable: false),
                    attribut2 = table.Column<string>(nullable: true),
                    attribut3 = table.Column<string>(nullable: true),
                    attribut4 = table.Column<string>(nullable: true),
                    attribut5 = table.Column<string>(nullable: true),
                    attribut6 = table.Column<string>(nullable: true),
                    dateenreg = table.Column<string>(nullable: true),
                    idOrph = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubventionOrphelins", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SubventionOrphelins_Orphelins_idOrph",
                        column: x => x.idOrph,
                        principalTable: "Orphelins",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TuteurOrphelins",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    mere = table.Column<string>(nullable: true),
                    nom = table.Column<string>(nullable: true),
                    cin = table.Column<string>(nullable: true),
                    parente = table.Column<string>(nullable: true),
                    niveauScolaire = table.Column<string>(nullable: true),
                    travail = table.Column<string>(nullable: true),
                    lieuTravail = table.Column<string>(nullable: true),
                    salaire = table.Column<string>(nullable: true),
                    talent = table.Column<string>(nullable: true),
                    sante = table.Column<string>(nullable: true),
                    nbOrphelin = table.Column<string>(nullable: true),
                    tel = table.Column<string>(nullable: true),
                    attribut1 = table.Column<int>(nullable: false),
                    attribut7 = table.Column<int>(nullable: false),
                    attribut2 = table.Column<string>(nullable: true),
                    attribut3 = table.Column<string>(nullable: true),
                    attribut4 = table.Column<string>(nullable: true),
                    attribut5 = table.Column<string>(nullable: true),
                    attribut6 = table.Column<string>(nullable: true),
                    dateenreg = table.Column<string>(nullable: true),
                    idOrph = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TuteurOrphelins", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TuteurOrphelins_Orphelins_idOrph",
                        column: x => x.idOrph,
                        principalTable: "Orphelins",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DotationOrphelins_idOrph",
                table: "DotationOrphelins",
                column: "idOrph");

            migrationBuilder.CreateIndex(
                name: "IX_FinanceOrphelins_idOrph",
                table: "FinanceOrphelins",
                column: "idOrph");

            migrationBuilder.CreateIndex(
                name: "IX_MereOrphelins_idOrph",
                table: "MereOrphelins",
                column: "idOrph");

            migrationBuilder.CreateIndex(
                name: "IX_PereOrphelins_idOrph",
                table: "PereOrphelins",
                column: "idOrph");

            migrationBuilder.CreateIndex(
                name: "IX_PsyOrphelin_idOrph",
                table: "PsyOrphelin",
                column: "idOrph");

            migrationBuilder.CreateIndex(
                name: "IX_SubventionOrphelins_idOrph",
                table: "SubventionOrphelins",
                column: "idOrph");

            migrationBuilder.CreateIndex(
                name: "IX_TuteurOrphelins_idOrph",
                table: "TuteurOrphelins",
                column: "idOrph");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DotationOrphelins");

            migrationBuilder.DropTable(
                name: "FinanceOrphelins");

            migrationBuilder.DropTable(
                name: "MereOrphelins");

            migrationBuilder.DropTable(
                name: "PereOrphelins");

            migrationBuilder.DropTable(
                name: "PsyOrphelin");

            migrationBuilder.DropTable(
                name: "SubventionOrphelins");

            migrationBuilder.DropTable(
                name: "TuteurOrphelins");
        }
    }
}
