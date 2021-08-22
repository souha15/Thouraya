using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace WebApplicationPlateforme.Migrations
{
    public partial class MigrationsGestionOrphelin : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "LivesWiths",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LivesWiths", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Maladies",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Maladies", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Matieres",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Matieres", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Orphelins",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true),
                    dateNais = table.Column<string>(nullable: true),
                    lieuNais = table.Column<string>(nullable: true),
                    nat = table.Column<string>(nullable: true),
                    cin = table.Column<string>(nullable: true),
                    sexe = table.Column<string>(nullable: true),
                    tel = table.Column<string>(nullable: true),
                    propNumTel = table.Column<string>(nullable: true),
                    lose = table.Column<string>(nullable: true),
                    liveWith = table.Column<string>(nullable: true),
                    quartier = table.Column<string>(nullable: true),
                    cite = table.Column<string>(nullable: true),
                    ville = table.Column<string>(nullable: true),
                    mosquee = table.Column<string>(nullable: true),
                    req = table.Column<string>(nullable: true),
                    attribut1 = table.Column<int>(nullable: false),
                    attribut7 = table.Column<int>(nullable: false),
                    attribut2 = table.Column<string>(nullable: true),
                    attribut3 = table.Column<string>(nullable: true),
                    attribut4 = table.Column<string>(nullable: true),
                    attribut5 = table.Column<string>(nullable: true),
                    attribut6 = table.Column<string>(nullable: true),
                    dateenreg = table.Column<string>(nullable: true),
                    userNameCreator = table.Column<string>(nullable: true),
                    idUserCreator = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orphelins", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Orphelins_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Talents",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Talents", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EducationOrphelins",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    education = table.Column<string>(nullable: true),
                    raisonedu = table.Column<string>(nullable: true),
                    niveau = table.Column<string>(nullable: true),
                    classe = table.Column<string>(nullable: true),
                    Autorite = table.Column<string>(nullable: true),
                    typeAutorite = table.Column<string>(nullable: true),
                    nomOrph = table.Column<string>(nullable: true),
                    tel = table.Column<string>(nullable: true),
                    conseillerSocialNom = table.Column<string>(nullable: true),
                    conseillerSocialNumTel = table.Column<string>(nullable: true),
                    mention = table.Column<string>(nullable: true),
                    periode = table.Column<string>(nullable: true),
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
                    table.PrimaryKey("PK_EducationOrphelins", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EducationOrphelins_Orphelins_idOrph",
                        column: x => x.idOrph,
                        principalTable: "Orphelins",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FilesOrphelins",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    type = table.Column<string>(nullable: true),
                    path = table.Column<string>(nullable: true),
                    dateEnreg = table.Column<string>(nullable: true),
                    nomOrph = table.Column<string>(nullable: true),
                    idOrph = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FilesOrphelins", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FilesOrphelins_Orphelins_idOrph",
                        column: x => x.idOrph,
                        principalTable: "Orphelins",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MatieresOrphelins",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true),
                    attribut1 = table.Column<int>(nullable: false),
                    attribut7 = table.Column<int>(nullable: false),
                    attribut2 = table.Column<string>(nullable: true),
                    attribut3 = table.Column<string>(nullable: true),
                    attribut4 = table.Column<string>(nullable: true),
                    attribut5 = table.Column<string>(nullable: true),
                    attribut6 = table.Column<string>(nullable: true),
                    dateenreg = table.Column<string>(nullable: true),
                    nomOrph = table.Column<string>(nullable: true),
                    idOrph = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MatieresOrphelins", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MatieresOrphelins_Orphelins_idOrph",
                        column: x => x.idOrph,
                        principalTable: "Orphelins",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SanteOrphelins",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    malade = table.Column<string>(nullable: true),
                    typeMaladie = table.Column<string>(nullable: true),
                    maladie = table.Column<string>(nullable: true),
                    natureMaladie = table.Column<string>(nullable: true),
                    prix = table.Column<string>(nullable: true),
                    attribut1 = table.Column<int>(nullable: false),
                    attribut7 = table.Column<int>(nullable: false),
                    attribut2 = table.Column<string>(nullable: true),
                    attribut3 = table.Column<string>(nullable: true),
                    attribut4 = table.Column<string>(nullable: true),
                    attribut5 = table.Column<string>(nullable: true),
                    attribut6 = table.Column<string>(nullable: true),
                    dateenreg = table.Column<string>(nullable: true),
                    nomOrph = table.Column<string>(nullable: true),
                    idOrph = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SanteOrphelins", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SanteOrphelins_Orphelins_idOrph",
                        column: x => x.idOrph,
                        principalTable: "Orphelins",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TalentOrphelins",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true),
                    nomOrph = table.Column<string>(nullable: true),
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
                    table.PrimaryKey("PK_TalentOrphelins", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TalentOrphelins_Orphelins_idOrph",
                        column: x => x.idOrph,
                        principalTable: "Orphelins",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_EducationOrphelins_idOrph",
                table: "EducationOrphelins",
                column: "idOrph");

            migrationBuilder.CreateIndex(
                name: "IX_FilesOrphelins_idOrph",
                table: "FilesOrphelins",
                column: "idOrph");

            migrationBuilder.CreateIndex(
                name: "IX_MatieresOrphelins_idOrph",
                table: "MatieresOrphelins",
                column: "idOrph");

            migrationBuilder.CreateIndex(
                name: "IX_Orphelins_idUserCreator",
                table: "Orphelins",
                column: "idUserCreator");

            migrationBuilder.CreateIndex(
                name: "IX_SanteOrphelins_idOrph",
                table: "SanteOrphelins",
                column: "idOrph");

            migrationBuilder.CreateIndex(
                name: "IX_TalentOrphelins_idOrph",
                table: "TalentOrphelins",
                column: "idOrph");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EducationOrphelins");

            migrationBuilder.DropTable(
                name: "FilesOrphelins");

            migrationBuilder.DropTable(
                name: "LivesWiths");

            migrationBuilder.DropTable(
                name: "Maladies");

            migrationBuilder.DropTable(
                name: "Matieres");

            migrationBuilder.DropTable(
                name: "MatieresOrphelins");

            migrationBuilder.DropTable(
                name: "SanteOrphelins");

            migrationBuilder.DropTable(
                name: "TalentOrphelins");

            migrationBuilder.DropTable(
                name: "Talents");

            migrationBuilder.DropTable(
                name: "Orphelins");
        }
    }
}
