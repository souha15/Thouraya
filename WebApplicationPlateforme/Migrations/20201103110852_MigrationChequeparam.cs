using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace WebApplicationPlateforme.Migrations
{
    public partial class MigrationChequeparam : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_filesCheques_cheques_idCheque",
                table: "filesCheques");

            migrationBuilder.DropForeignKey(
                name: "FK_payCheques_cheques_idCheque",
                table: "payCheques");

            migrationBuilder.DropTable(
                name: "cheques");

            migrationBuilder.CreateTable(
                name: "chequeCs",
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
                    table.PrimaryKey("PK_chequeCs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_chequeCs_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_chequeCs_idUserCreator",
                table: "chequeCs",
                column: "idUserCreator");

            migrationBuilder.AddForeignKey(
                name: "FK_filesCheques_chequeCs_idCheque",
                table: "filesCheques",
                column: "idCheque",
                principalTable: "chequeCs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_payCheques_chequeCs_idCheque",
                table: "payCheques",
                column: "idCheque",
                principalTable: "chequeCs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_filesCheques_chequeCs_idCheque",
                table: "filesCheques");

            migrationBuilder.DropForeignKey(
                name: "FK_payCheques_chequeCs_idCheque",
                table: "payCheques");

            migrationBuilder.DropTable(
                name: "chequeCs");

            migrationBuilder.CreateTable(
                name: "cheques",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    attibut1 = table.Column<string>(type: "text", nullable: true),
                    attribut2 = table.Column<string>(type: "text", nullable: true),
                    attribut3 = table.Column<string>(type: "text", nullable: true),
                    attribut4 = table.Column<string>(type: "text", nullable: true),
                    attribut5 = table.Column<string>(type: "text", nullable: true),
                    attribut6 = table.Column<string>(type: "text", nullable: true),
                    classe = table.Column<string>(type: "text", nullable: true),
                    compte = table.Column<string>(type: "text", nullable: true),
                    creatorName = table.Column<string>(type: "text", nullable: true),
                    dateEcriture = table.Column<string>(type: "text", nullable: true),
                    dateEntre = table.Column<string>(type: "text", nullable: true),
                    datePay = table.Column<string>(type: "text", nullable: true),
                    dateenreg = table.Column<string>(type: "text", nullable: true),
                    etat = table.Column<string>(type: "text", nullable: true),
                    idCompte = table.Column<string>(type: "text", nullable: true),
                    idUserCreator = table.Column<string>(type: "text", nullable: true),
                    numDemande = table.Column<string>(type: "text", nullable: true),
                    numcheque = table.Column<string>(type: "text", nullable: true),
                    prix = table.Column<string>(type: "text", nullable: true),
                    raison = table.Column<string>(type: "text", nullable: true),
                    recepteur = table.Column<string>(type: "text", nullable: true)
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

            migrationBuilder.CreateIndex(
                name: "IX_cheques_idUserCreator",
                table: "cheques",
                column: "idUserCreator");

            migrationBuilder.AddForeignKey(
                name: "FK_filesCheques_cheques_idCheque",
                table: "filesCheques",
                column: "idCheque",
                principalTable: "cheques",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_payCheques_cheques_idCheque",
                table: "payCheques",
                column: "idCheque",
                principalTable: "cheques",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
