using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace WebApplicationPlateforme.Migrations
{
    public partial class MigrationFinance : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "brancheOnes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_brancheOnes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "brancheTwos",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_brancheTwos", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "creanceFinancieres",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    date = table.Column<string>(nullable: true),
                    prix = table.Column<string>(nullable: true),
                    typePaymenet = table.Column<string>(nullable: true),
                    projet = table.Column<string>(nullable: true),
                    detail = table.Column<string>(nullable: true),
                    nomBeneficiaire = table.Column<string>(nullable: true),
                    etat = table.Column<string>(nullable: true),
                    etatuserId = table.Column<string>(nullable: true),
                    dateetatuser = table.Column<string>(nullable: true),
                    etatusernom = table.Column<string>(nullable: true),
                    etatdirectorid = table.Column<string>(nullable: true),
                    etatdirectornom = table.Column<string>(nullable: true),
                    etatdirectordate = table.Column<string>(nullable: true),
                    etatPayement = table.Column<string>(nullable: true),
                    etatPayUserId = table.Column<string>(nullable: true),
                    etatPayUsernom = table.Column<string>(nullable: true),
                    etatPayUserDate = table.Column<string>(nullable: true),
                    typePayement = table.Column<string>(nullable: true),
                    datesalaire = table.Column<string>(nullable: true),
                    editdate = table.Column<string>(nullable: true),
                    edituserId = table.Column<string>(nullable: true),
                    editUserNom = table.Column<string>(nullable: true),
                    attribut1 = table.Column<int>(nullable: false),
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
                    table.PrimaryKey("PK_creanceFinancieres", x => x.Id);
                    table.ForeignKey(
                        name: "FK_creanceFinancieres_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "depensesExploitations",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    type = table.Column<string>(nullable: true),
                    prix = table.Column<string>(nullable: true),
                    details = table.Column<string>(nullable: true),
                    typeB = table.Column<string>(nullable: true),
                    attribut1 = table.Column<int>(nullable: false),
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
                    table.PrimaryKey("PK_depensesExploitations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_depensesExploitations_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "factures",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    prix = table.Column<string>(nullable: true),
                    categorie = table.Column<string>(nullable: true),
                    brancheone = table.Column<string>(nullable: true),
                    branchetwo = table.Column<string>(nullable: true),
                    detail = table.Column<string>(nullable: true),
                    beneficiaire = table.Column<string>(nullable: true),
                    date = table.Column<string>(nullable: true),
                    usernamecreator = table.Column<string>(nullable: true),
                    type = table.Column<string>(nullable: true),
                    etat = table.Column<string>(nullable: true),
                    etatUserId = table.Column<string>(nullable: true),
                    etatUserNom = table.Column<string>(nullable: true),
                    etatdate = table.Column<string>(nullable: true),
                    etatdirector = table.Column<string>(nullable: true),
                    dateetatdirector = table.Column<string>(nullable: true),
                    directorid = table.Column<string>(nullable: true),
                    directornom = table.Column<string>(nullable: true),
                    etatPayemeent = table.Column<string>(nullable: true),
                    etatuseridPay = table.Column<string>(nullable: true),
                    etatusernomPay = table.Column<string>(nullable: true),
                    etatPaydate = table.Column<string>(nullable: true),
                    editdate = table.Column<string>(nullable: true),
                    edituserid = table.Column<string>(nullable: true),
                    editusernom = table.Column<string>(nullable: true),
                    attribut1 = table.Column<int>(nullable: false),
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
                    table.PrimaryKey("PK_factures", x => x.Id);
                    table.ForeignKey(
                        name: "FK_factures_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "projetProgs",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_projetProgs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "typeBeneficiaires",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_typeBeneficiaires", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "typeDepenses",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_typeDepenses", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "typeFactures",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_typeFactures", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "piecesJointesCfs",
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
                    idCF = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_piecesJointesCfs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_piecesJointesCfs_AspNetUsers_IdUserCreator",
                        column: x => x.IdUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_piecesJointesCfs_creanceFinancieres_idCF",
                        column: x => x.idCF,
                        principalTable: "creanceFinancieres",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "piecesJointesfs",
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
                    idCF = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_piecesJointesfs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_piecesJointesfs_AspNetUsers_IdUserCreator",
                        column: x => x.IdUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_piecesJointesfs_factures_idCF",
                        column: x => x.idCF,
                        principalTable: "factures",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_creanceFinancieres_idUserCreator",
                table: "creanceFinancieres",
                column: "idUserCreator");

            migrationBuilder.CreateIndex(
                name: "IX_depensesExploitations_idUserCreator",
                table: "depensesExploitations",
                column: "idUserCreator");

            migrationBuilder.CreateIndex(
                name: "IX_factures_idUserCreator",
                table: "factures",
                column: "idUserCreator");

            migrationBuilder.CreateIndex(
                name: "IX_piecesJointesCfs_IdUserCreator",
                table: "piecesJointesCfs",
                column: "IdUserCreator");

            migrationBuilder.CreateIndex(
                name: "IX_piecesJointesCfs_idCF",
                table: "piecesJointesCfs",
                column: "idCF");

            migrationBuilder.CreateIndex(
                name: "IX_piecesJointesfs_IdUserCreator",
                table: "piecesJointesfs",
                column: "IdUserCreator");

            migrationBuilder.CreateIndex(
                name: "IX_piecesJointesfs_idCF",
                table: "piecesJointesfs",
                column: "idCF");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "brancheOnes");

            migrationBuilder.DropTable(
                name: "brancheTwos");

            migrationBuilder.DropTable(
                name: "depensesExploitations");

            migrationBuilder.DropTable(
                name: "piecesJointesCfs");

            migrationBuilder.DropTable(
                name: "piecesJointesfs");

            migrationBuilder.DropTable(
                name: "projetProgs");

            migrationBuilder.DropTable(
                name: "typeBeneficiaires");

            migrationBuilder.DropTable(
                name: "typeDepenses");

            migrationBuilder.DropTable(
                name: "typeFactures");

            migrationBuilder.DropTable(
                name: "creanceFinancieres");

            migrationBuilder.DropTable(
                name: "factures");
        }
    }
}
