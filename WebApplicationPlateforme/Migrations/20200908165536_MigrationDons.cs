using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace WebApplicationPlateforme.Migrations
{
    public partial class MigrationDons : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "doneurs",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    type = table.Column<string>(nullable: true),
                    nom = table.Column<string>(nullable: true),
                    prenom = table.Column<string>(nullable: true),
                    tel = table.Column<string>(nullable: true),
                    email = table.Column<string>(nullable: true),
                    cin = table.Column<string>(nullable: true),
                    nationalite = table.Column<string>(nullable: true),
                    nomOrg = table.Column<string>(nullable: true),
                    nomDir = table.Column<string>(nullable: true),
                    phone = table.Column<string>(nullable: true),
                    fax = table.Column<string>(nullable: true),
                    emailOrg = table.Column<string>(nullable: true),
                    employee = table.Column<string>(nullable: true),
                    telEmp = table.Column<string>(nullable: true),
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
                    table.PrimaryKey("PK_doneurs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_doneurs_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "projetDons",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_projetDons", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "recueDons",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    numMachine = table.Column<string>(nullable: true),
                    numOperation = table.Column<string>(nullable: true),
                    dateOperation = table.Column<string>(nullable: true),
                    projet = table.Column<string>(nullable: true),
                    req = table.Column<string>(nullable: true),
                    photoRecue = table.Column<string>(nullable: true),
                    prix = table.Column<string>(nullable: true),
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
                    table.PrimaryKey("PK_recueDons", x => x.Id);
                    table.ForeignKey(
                        name: "FK_recueDons_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "payemeentReceptions",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    typeDons = table.Column<string>(nullable: true),
                    projet = table.Column<string>(nullable: true),
                    doneurNom = table.Column<string>(nullable: true),
                    prixDons = table.Column<string>(nullable: true),
                    delegueNom = table.Column<string>(nullable: true),
                    prixDonsEcriture = table.Column<string>(nullable: true),
                    dateDons = table.Column<string>(nullable: true),
                    req = table.Column<string>(nullable: true),
                    tel = table.Column<string>(nullable: true),
                    cin = table.Column<string>(nullable: true),
                    numOperation = table.Column<string>(nullable: true),
                    dateTransfert = table.Column<string>(nullable: true),
                    banqueEmis = table.Column<string>(nullable: true),
                    banqueRecep = table.Column<string>(nullable: true),
                    numOpBanque = table.Column<string>(nullable: true),
                    photoBanque = table.Column<string>(nullable: true),
                    dateCheque = table.Column<string>(nullable: true),
                    numCheque = table.Column<string>(nullable: true),
                    nomBanqueCheque = table.Column<string>(nullable: true),
                    propCheque = table.Column<string>(nullable: true),
                    photoCheque = table.Column<string>(nullable: true),
                    dateOperation = table.Column<string>(nullable: true),
                    numMachine = table.Column<string>(nullable: true),
                    photoDab = table.Column<string>(nullable: true),
                    operationDab = table.Column<string>(nullable: true),
                    attribut1 = table.Column<int>(nullable: false),
                    attribut2 = table.Column<string>(nullable: true),
                    attribut3 = table.Column<string>(nullable: true),
                    attribut4 = table.Column<string>(nullable: true),
                    attribut5 = table.Column<string>(nullable: true),
                    attribut6 = table.Column<string>(nullable: true),
                    dateenreg = table.Column<string>(nullable: true),
                    userNameCreator = table.Column<string>(nullable: true),
                    idDonneur = table.Column<int>(nullable: false),
                    idUserCreator = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_payemeentReceptions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_payemeentReceptions_doneurs_idDonneur",
                        column: x => x.idDonneur,
                        principalTable: "doneurs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_payemeentReceptions_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_doneurs_idUserCreator",
                table: "doneurs",
                column: "idUserCreator");

            migrationBuilder.CreateIndex(
                name: "IX_payemeentReceptions_idDonneur",
                table: "payemeentReceptions",
                column: "idDonneur");

            migrationBuilder.CreateIndex(
                name: "IX_payemeentReceptions_idUserCreator",
                table: "payemeentReceptions",
                column: "idUserCreator");

            migrationBuilder.CreateIndex(
                name: "IX_recueDons_idUserCreator",
                table: "recueDons",
                column: "idUserCreator");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "payemeentReceptions");

            migrationBuilder.DropTable(
                name: "projetDons");

            migrationBuilder.DropTable(
                name: "recueDons");

            migrationBuilder.DropTable(
                name: "doneurs");
        }
    }
}
