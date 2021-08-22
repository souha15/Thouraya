using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace WebApplicationPlateforme.Migrations
{
    public partial class MigrationsGestionBen : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "gestionBenenficiaires",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    typeEnreg = table.Column<string>(nullable: true),
                    etat = table.Column<string>(nullable: true),
                    remarque = table.Column<string>(nullable: true),
                    etatdir = table.Column<string>(nullable: true),
                    datedir = table.Column<string>(nullable: true),
                    iddir = table.Column<string>(nullable: true),
                    nomdir = table.Column<string>(nullable: true),
                    idchercheur = table.Column<string>(nullable: true),
                    etatchercheur = table.Column<string>(nullable: true),
                    datechercheur = table.Column<string>(nullable: true),
                    nomchercheur = table.Column<string>(nullable: true),
                    nomprenom = table.Column<string>(nullable: true),
                    dateNais = table.Column<string>(nullable: true),
                    typeCin = table.Column<string>(nullable: true),
                    numCin = table.Column<string>(nullable: true),
                    natio = table.Column<string>(nullable: true),
                    tel = table.Column<string>(nullable: true),
                    sexe = table.Column<string>(nullable: true),
                    adr = table.Column<string>(nullable: true),
                    nbfamille = table.Column<string>(nullable: true),
                    dateenreg = table.Column<string>(nullable: true),
                    userNameCreator = table.Column<string>(nullable: true),
                    idUserCreator = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_gestionBenenficiaires", x => x.Id);
                    table.ForeignKey(
                        name: "FK_gestionBenenficiaires_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "typeBens",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_typeBens", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "typeDroits",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_typeDroits", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "typeMaisons",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_typeMaisons", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "typeRevBens",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_typeRevBens", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "compteBens",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nomBanque = table.Column<string>(nullable: true),
                    rib = table.Column<string>(nullable: true),
                    compteBen = table.Column<string>(nullable: true),
                    nomProp = table.Column<string>(nullable: true),
                    dateenreg = table.Column<string>(nullable: true),
                    userNameCreator = table.Column<string>(nullable: true),
                    idBen = table.Column<int>(nullable: false),
                    idUserCreator = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_compteBens", x => x.Id);
                    table.ForeignKey(
                        name: "FK_compteBens_gestionBenenficiaires_idBen",
                        column: x => x.idBen,
                        principalTable: "gestionBenenficiaires",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_compteBens_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "familles",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nb = table.Column<string>(nullable: true),
                    nom = table.Column<string>(nullable: true),
                    cin = table.Column<string>(nullable: true),
                    dateNais = table.Column<string>(nullable: true),
                    sexe = table.Column<string>(nullable: true),
                    relation = table.Column<string>(nullable: true),
                    req = table.Column<string>(nullable: true),
                    dateenreg = table.Column<string>(nullable: true),
                    userNameCreator = table.Column<string>(nullable: true),
                    idBen = table.Column<int>(nullable: false),
                    idUserCreator = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_familles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_familles_gestionBenenficiaires_idBen",
                        column: x => x.idBen,
                        principalTable: "gestionBenenficiaires",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_familles_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "filesBens",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    type = table.Column<string>(nullable: true),
                    path = table.Column<string>(nullable: true),
                    idBen = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_filesBens", x => x.Id);
                    table.ForeignKey(
                        name: "FK_filesBens_gestionBenenficiaires_idBen",
                        column: x => x.idBen,
                        principalTable: "gestionBenenficiaires",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "residances",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    typeResi = table.Column<string>(nullable: true),
                    typeMaison = table.Column<string>(nullable: true),
                    etat = table.Column<string>(nullable: true),
                    dateenreg = table.Column<string>(nullable: true),
                    userNameCreator = table.Column<string>(nullable: true),
                    idBen = table.Column<int>(nullable: false),
                    idUserCreator = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_residances", x => x.Id);
                    table.ForeignKey(
                        name: "FK_residances_gestionBenenficiaires_idBen",
                        column: x => x.idBen,
                        principalTable: "gestionBenenficiaires",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_residances_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "revenusBens",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    prix = table.Column<string>(nullable: true),
                    typeRev = table.Column<string>(nullable: true),
                    dateenreg = table.Column<string>(nullable: true),
                    userNameCreator = table.Column<string>(nullable: true),
                    idBen = table.Column<int>(nullable: false),
                    idUserCreator = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_revenusBens", x => x.Id);
                    table.ForeignKey(
                        name: "FK_revenusBens_gestionBenenficiaires_idBen",
                        column: x => x.idBen,
                        principalTable: "gestionBenenficiaires",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_revenusBens_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_compteBens_idBen",
                table: "compteBens",
                column: "idBen");

            migrationBuilder.CreateIndex(
                name: "IX_compteBens_idUserCreator",
                table: "compteBens",
                column: "idUserCreator");

            migrationBuilder.CreateIndex(
                name: "IX_familles_idBen",
                table: "familles",
                column: "idBen");

            migrationBuilder.CreateIndex(
                name: "IX_familles_idUserCreator",
                table: "familles",
                column: "idUserCreator");

            migrationBuilder.CreateIndex(
                name: "IX_filesBens_idBen",
                table: "filesBens",
                column: "idBen");

            migrationBuilder.CreateIndex(
                name: "IX_gestionBenenficiaires_idUserCreator",
                table: "gestionBenenficiaires",
                column: "idUserCreator");

            migrationBuilder.CreateIndex(
                name: "IX_residances_idBen",
                table: "residances",
                column: "idBen");

            migrationBuilder.CreateIndex(
                name: "IX_residances_idUserCreator",
                table: "residances",
                column: "idUserCreator");

            migrationBuilder.CreateIndex(
                name: "IX_revenusBens_idBen",
                table: "revenusBens",
                column: "idBen");

            migrationBuilder.CreateIndex(
                name: "IX_revenusBens_idUserCreator",
                table: "revenusBens",
                column: "idUserCreator");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "compteBens");

            migrationBuilder.DropTable(
                name: "familles");

            migrationBuilder.DropTable(
                name: "filesBens");

            migrationBuilder.DropTable(
                name: "residances");

            migrationBuilder.DropTable(
                name: "revenusBens");

            migrationBuilder.DropTable(
                name: "typeBens");

            migrationBuilder.DropTable(
                name: "typeDroits");

            migrationBuilder.DropTable(
                name: "typeMaisons");

            migrationBuilder.DropTable(
                name: "typeRevBens");

            migrationBuilder.DropTable(
                name: "gestionBenenficiaires");
        }
    }
}
