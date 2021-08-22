using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace WebApplicationPlateforme.Migrations
{
    public partial class MigrationCheque : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "cheques",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    classe = table.Column<string>(nullable: true),
                    dateEntre = table.Column<string>(nullable: true),
                    numcheque = table.Column<string>(nullable: true),
                    prix = table.Column<string>(nullable: true),
                    raison = table.Column<string>(nullable: true),
                    dateEcriture = table.Column<string>(nullable: true),
                    numDemande = table.Column<string>(nullable: true),
                    compte = table.Column<string>(nullable: true),
                    idCompte = table.Column<string>(nullable: true),
                    datePay = table.Column<string>(nullable: true),
                    recepteur = table.Column<string>(nullable: true),
                    etat = table.Column<string>(nullable: true),
                    attibut1 = table.Column<string>(nullable: true),
                    attribut2 = table.Column<string>(nullable: true),
                    attribut3 = table.Column<string>(nullable: true),
                    attribut4 = table.Column<string>(nullable: true),
                    attribut5 = table.Column<string>(nullable: true),
                    attribut6 = table.Column<string>(nullable: true),
                    creatorName = table.Column<string>(nullable: true),
                    dateenreg = table.Column<string>(nullable: true),
                    idUserCreator = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_cheques", x => x.Id);
                    table.ForeignKey(
                        name: "FK_cheques_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "demandePayCheques",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    calsse = table.Column<string>(nullable: true),
                    dateEntre = table.Column<string>(nullable: true),
                    demandeur = table.Column<string>(nullable: true),
                    numdem = table.Column<int>(nullable: false),
                    numdemnb = table.Column<string>(nullable: true),
                    iddemandeur = table.Column<string>(nullable: true),
                    description = table.Column<string>(nullable: true),
                    sujet = table.Column<string>(nullable: true),
                    prixnb = table.Column<string>(nullable: true),
                    prixlettre = table.Column<string>(nullable: true),
                    prixaccepte = table.Column<string>(nullable: true),
                    etatnum = table.Column<string>(nullable: true),
                    etatgeneral = table.Column<string>(nullable: true),
                    etatadmin = table.Column<string>(nullable: true),
                    etatdirecteur = table.Column<string>(nullable: true),
                    etatfinacier = table.Column<string>(nullable: true),
                    etatparfinancier = table.Column<string>(nullable: true),
                    etatpart = table.Column<string>(nullable: true),
                    idadmin = table.Column<string>(nullable: true),
                    iddir = table.Column<string>(nullable: true),
                    idfinancier = table.Column<string>(nullable: true),
                    idparfinancier = table.Column<string>(nullable: true),
                    idpart = table.Column<string>(nullable: true),
                    nomadmin = table.Column<string>(nullable: true),
                    nomdir = table.Column<string>(nullable: true),
                    nomfinancier = table.Column<string>(nullable: true),
                    nomparfinancier = table.Column<string>(nullable: true),
                    nompart = table.Column<string>(nullable: true),
                    dateadmin = table.Column<string>(nullable: true),
                    datedir = table.Column<string>(nullable: true),
                    datefinancier = table.Column<string>(nullable: true),
                    dateparfinancier = table.Column<string>(nullable: true),
                    datepart = table.Column<string>(nullable: true),
                    payetat = table.Column<string>(nullable: true),
                    idpayUser = table.Column<string>(nullable: true),
                    payUsernom = table.Column<string>(nullable: true),
                    attibut1 = table.Column<string>(nullable: true),
                    attribut2 = table.Column<string>(nullable: true),
                    attribut3 = table.Column<string>(nullable: true),
                    attribut4 = table.Column<string>(nullable: true),
                    attribut5 = table.Column<string>(nullable: true),
                    attribut6 = table.Column<string>(nullable: true),
                    creatorName = table.Column<string>(nullable: true),
                    dateenreg = table.Column<string>(nullable: true),
                    idUserCreator = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_demandePayCheques", x => x.Id);
                    table.ForeignKey(
                        name: "FK_demandePayCheques_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "filesCheques",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    path = table.Column<string>(nullable: true),
                    type = table.Column<string>(nullable: true),
                    idCheque = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_filesCheques", x => x.Id);
                    table.ForeignKey(
                        name: "FK_filesCheques_cheques_idCheque",
                        column: x => x.idCheque,
                        principalTable: "cheques",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "payCheques",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    type = table.Column<string>(nullable: true),
                    num = table.Column<string>(nullable: true),
                    date = table.Column<string>(nullable: true),
                    prix = table.Column<string>(nullable: true),
                    attibut1 = table.Column<string>(nullable: true),
                    attribut2 = table.Column<string>(nullable: true),
                    attribut3 = table.Column<string>(nullable: true),
                    attribut4 = table.Column<string>(nullable: true),
                    attribut5 = table.Column<string>(nullable: true),
                    attribut6 = table.Column<string>(nullable: true),
                    creatorName = table.Column<string>(nullable: true),
                    dateenreg = table.Column<string>(nullable: true),
                    idUserCreator = table.Column<string>(nullable: true),
                    idCheque = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_payCheques", x => x.Id);
                    table.ForeignKey(
                        name: "FK_payCheques_cheques_idCheque",
                        column: x => x.idCheque,
                        principalTable: "cheques",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_payCheques_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "articlePayCheques",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    article = table.Column<string>(nullable: true),
                    prix = table.Column<string>(nullable: true),
                    detail = table.Column<string>(nullable: true),
                    idDem = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_articlePayCheques", x => x.Id);
                    table.ForeignKey(
                        name: "FK_articlePayCheques_demandePayCheques_idDem",
                        column: x => x.idDem,
                        principalTable: "demandePayCheques",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "filesPays",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    path = table.Column<string>(nullable: true),
                    type = table.Column<string>(nullable: true),
                    idDemCheque = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_filesPays", x => x.Id);
                    table.ForeignKey(
                        name: "FK_filesPays_demandePayCheques_idDemCheque",
                        column: x => x.idDemCheque,
                        principalTable: "demandePayCheques",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_articlePayCheques_idDem",
                table: "articlePayCheques",
                column: "idDem");

            migrationBuilder.CreateIndex(
                name: "IX_cheques_idUserCreator",
                table: "cheques",
                column: "idUserCreator");

            migrationBuilder.CreateIndex(
                name: "IX_demandePayCheques_idUserCreator",
                table: "demandePayCheques",
                column: "idUserCreator");

            migrationBuilder.CreateIndex(
                name: "IX_filesCheques_idCheque",
                table: "filesCheques",
                column: "idCheque");

            migrationBuilder.CreateIndex(
                name: "IX_filesPays_idDemCheque",
                table: "filesPays",
                column: "idDemCheque");

            migrationBuilder.CreateIndex(
                name: "IX_payCheques_idCheque",
                table: "payCheques",
                column: "idCheque");

            migrationBuilder.CreateIndex(
                name: "IX_payCheques_idUserCreator",
                table: "payCheques",
                column: "idUserCreator");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "articlePayCheques");

            migrationBuilder.DropTable(
                name: "filesCheques");

            migrationBuilder.DropTable(
                name: "filesPays");

            migrationBuilder.DropTable(
                name: "payCheques");

            migrationBuilder.DropTable(
                name: "demandePayCheques");

            migrationBuilder.DropTable(
                name: "cheques");
        }
    }
}
