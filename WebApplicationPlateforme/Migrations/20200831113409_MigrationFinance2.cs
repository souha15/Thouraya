using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace WebApplicationPlateforme.Migrations
{
    public partial class MigrationFinance2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "chequeReceptions",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    datecheque = table.Column<string>(nullable: true),
                    dateAjout = table.Column<string>(nullable: true),
                    numCheque = table.Column<string>(nullable: true),
                    propCheque = table.Column<string>(nullable: true),
                    livreur = table.Column<string>(nullable: true),
                    prix = table.Column<string>(nullable: true),
                    prixEcriture = table.Column<string>(nullable: true),
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
                    table.PrimaryKey("PK_chequeReceptions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_chequeReceptions_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "evenementTwos",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    adr = table.Column<string>(nullable: true),
                    date = table.Column<string>(nullable: true),
                    bref = table.Column<string>(nullable: true),
                    detail = table.Column<string>(nullable: true),
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
                    table.PrimaryKey("PK_evenementTwos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_evenementTwos_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "piecesJointesReceptionCs",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    path = table.Column<string>(nullable: true),
                    type = table.Column<string>(nullable: true),
                    date = table.Column<string>(nullable: true),
                    creatorName = table.Column<string>(nullable: true),
                    datenereg = table.Column<string>(nullable: true),
                    idUserCreator = table.Column<string>(nullable: true),
                    idRC = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_piecesJointesReceptionCs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_piecesJointesReceptionCs_chequeReceptions_idRC",
                        column: x => x.idRC,
                        principalTable: "chequeReceptions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_piecesJointesReceptionCs_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "piecesJointesEvTzos",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    path = table.Column<string>(nullable: true),
                    type = table.Column<string>(nullable: true),
                    date = table.Column<string>(nullable: true),
                    creatorName = table.Column<string>(nullable: true),
                    datenereg = table.Column<string>(nullable: true),
                    idUserCreator = table.Column<string>(nullable: true),
                    idEv = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_piecesJointesEvTzos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_piecesJointesEvTzos_evenementTwos_idEv",
                        column: x => x.idEv,
                        principalTable: "evenementTwos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_piecesJointesEvTzos_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_chequeReceptions_idUserCreator",
                table: "chequeReceptions",
                column: "idUserCreator");

            migrationBuilder.CreateIndex(
                name: "IX_evenementTwos_idUserCreator",
                table: "evenementTwos",
                column: "idUserCreator");

            migrationBuilder.CreateIndex(
                name: "IX_piecesJointesEvTzos_idEv",
                table: "piecesJointesEvTzos",
                column: "idEv");

            migrationBuilder.CreateIndex(
                name: "IX_piecesJointesEvTzos_idUserCreator",
                table: "piecesJointesEvTzos",
                column: "idUserCreator");

            migrationBuilder.CreateIndex(
                name: "IX_piecesJointesReceptionCs_idRC",
                table: "piecesJointesReceptionCs",
                column: "idRC");

            migrationBuilder.CreateIndex(
                name: "IX_piecesJointesReceptionCs_idUserCreator",
                table: "piecesJointesReceptionCs",
                column: "idUserCreator");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "piecesJointesEvTzos");

            migrationBuilder.DropTable(
                name: "piecesJointesReceptionCs");

            migrationBuilder.DropTable(
                name: "evenementTwos");

            migrationBuilder.DropTable(
                name: "chequeReceptions");
        }
    }
}
