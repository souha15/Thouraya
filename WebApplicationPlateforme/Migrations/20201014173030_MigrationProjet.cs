using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace WebApplicationPlateforme.Migrations
{
    public partial class MigrationProjet : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "classProjets",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_classProjets", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "comptes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_comptes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "organismeSupps",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true),
                    tel = table.Column<string>(nullable: true),
                    email = table.Column<string>(nullable: true),
                    fax = table.Column<string>(nullable: true),
                    nomResp = table.Column<string>(nullable: true),
                    jobResp = table.Column<string>(nullable: true),
                    numTel = table.Column<string>(nullable: true),
                    attibut1 = table.Column<string>(nullable: true),
                    attribut2 = table.Column<string>(nullable: true),
                    attribut3 = table.Column<string>(nullable: true),
                    attribut4 = table.Column<string>(nullable: true),
                    attribut5 = table.Column<string>(nullable: true),
                    creatorName = table.Column<string>(nullable: true),
                    datenereg = table.Column<string>(nullable: true),
                    idUserCreator = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_organismeSupps", x => x.Id);
                    table.ForeignKey(
                        name: "FK_organismeSupps_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "payementActivites",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_payementActivites", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "payementTypes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_payementTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Projets",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    classe = table.Column<string>(nullable: true),
                    dirid = table.Column<string>(nullable: true),
                    dirnom = table.Column<string>(nullable: true),
                    descriptiondir = table.Column<string>(nullable: true),
                    titre = table.Column<string>(nullable: true),
                    duree = table.Column<string>(nullable: true),
                    date = table.Column<string>(nullable: true),
                    moisjours = table.Column<string>(nullable: true),
                    orgnom = table.Column<string>(nullable: true),
                    orgid = table.Column<int>(nullable: true),
                    prix = table.Column<string>(nullable: true),
                    typeRembourssement = table.Column<string>(nullable: true),
                    numcheque = table.Column<string>(nullable: true),
                    compte = table.Column<string>(nullable: true),
                    datesupport = table.Column<string>(nullable: true),
                    numReception = table.Column<string>(nullable: true),
                    activite = table.Column<string>(nullable: true),
                    etat = table.Column<string>(nullable: true),
                    rapport = table.Column<string>(nullable: true),
                    dateupload = table.Column<string>(nullable: true),
                    evaluation = table.Column<string>(nullable: true),
                    remarque = table.Column<string>(nullable: true),
                    attibut1 = table.Column<string>(nullable: true),
                    attribut2 = table.Column<string>(nullable: true),
                    attribut3 = table.Column<string>(nullable: true),
                    attribut4 = table.Column<string>(nullable: true),
                    attribut5 = table.Column<string>(nullable: true),
                    attribut6 = table.Column<string>(nullable: true),
                    creatorName = table.Column<string>(nullable: true),
                    datenereg = table.Column<string>(nullable: true),
                    idUserCreator = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Projets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Projets_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Projets_organismeSupps_orgid",
                        column: x => x.orgid,
                        principalTable: "organismeSupps",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "filesProjets",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    type = table.Column<string>(nullable: true),
                    path = table.Column<string>(nullable: true),
                    date = table.Column<string>(nullable: true),
                    creatorName = table.Column<string>(nullable: true),
                    datenereg = table.Column<string>(nullable: true),
                    idUserCreator = table.Column<string>(nullable: true),
                    idprojet = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_filesProjets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_filesProjets_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_filesProjets_Projets_idprojet",
                        column: x => x.idprojet,
                        principalTable: "Projets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "payementProjets",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    activite = table.Column<string>(nullable: true),
                    categ = table.Column<string>(nullable: true),
                    nb = table.Column<string>(nullable: true),
                    prix = table.Column<string>(nullable: true),
                    attibut1 = table.Column<string>(nullable: true),
                    attribut2 = table.Column<string>(nullable: true),
                    attribut3 = table.Column<string>(nullable: true),
                    creatorName = table.Column<string>(nullable: true),
                    datenereg = table.Column<string>(nullable: true),
                    idUserCreator = table.Column<string>(nullable: true),
                    idprojet = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_payementProjets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_payementProjets_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_payementProjets_Projets_idprojet",
                        column: x => x.idprojet,
                        principalTable: "Projets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "rapportProjets",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    type = table.Column<string>(nullable: true),
                    path = table.Column<string>(nullable: true),
                    date = table.Column<string>(nullable: true),
                    creatorName = table.Column<string>(nullable: true),
                    datenereg = table.Column<string>(nullable: true),
                    idUserCreator = table.Column<string>(nullable: true),
                    idprojet = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_rapportProjets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_rapportProjets_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_rapportProjets_Projets_idprojet",
                        column: x => x.idprojet,
                        principalTable: "Projets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_filesProjets_idUserCreator",
                table: "filesProjets",
                column: "idUserCreator");

            migrationBuilder.CreateIndex(
                name: "IX_filesProjets_idprojet",
                table: "filesProjets",
                column: "idprojet");

            migrationBuilder.CreateIndex(
                name: "IX_organismeSupps_idUserCreator",
                table: "organismeSupps",
                column: "idUserCreator");

            migrationBuilder.CreateIndex(
                name: "IX_payementProjets_idUserCreator",
                table: "payementProjets",
                column: "idUserCreator");

            migrationBuilder.CreateIndex(
                name: "IX_payementProjets_idprojet",
                table: "payementProjets",
                column: "idprojet");

            migrationBuilder.CreateIndex(
                name: "IX_Projets_idUserCreator",
                table: "Projets",
                column: "idUserCreator");

            migrationBuilder.CreateIndex(
                name: "IX_Projets_orgid",
                table: "Projets",
                column: "orgid");

            migrationBuilder.CreateIndex(
                name: "IX_rapportProjets_idUserCreator",
                table: "rapportProjets",
                column: "idUserCreator");

            migrationBuilder.CreateIndex(
                name: "IX_rapportProjets_idprojet",
                table: "rapportProjets",
                column: "idprojet");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "classProjets");

            migrationBuilder.DropTable(
                name: "comptes");

            migrationBuilder.DropTable(
                name: "filesProjets");

            migrationBuilder.DropTable(
                name: "payementActivites");

            migrationBuilder.DropTable(
                name: "payementProjets");

            migrationBuilder.DropTable(
                name: "payementTypes");

            migrationBuilder.DropTable(
                name: "rapportProjets");

            migrationBuilder.DropTable(
                name: "Projets");

            migrationBuilder.DropTable(
                name: "organismeSupps");
        }
    }
}
