using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace WebApplicationPlateforme.Migrations
{
    public partial class MigrationSalaire1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "salaires",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    mois = table.Column<string>(nullable: true),
                    annee = table.Column<string>(nullable: true),
                    salaire = table.Column<string>(nullable: true),
                    assurance = table.Column<string>(nullable: true),
                    indemnite = table.Column<string>(nullable: true),
                    autreIndemnite = table.Column<string>(nullable: true),
                    totIndemnite = table.Column<string>(nullable: true),
                    retrait = table.Column<string>(nullable: true),
                    raisonRetrait = table.Column<string>(nullable: true),
                    leplus = table.Column<string>(nullable: true),
                    reisonPlus = table.Column<string>(nullable: true),
                    tot = table.Column<string>(nullable: true),
                    sailairenet = table.Column<string>(nullable: true),
                    totUser = table.Column<string>(nullable: true),
                    totG = table.Column<string>(nullable: true),
                    salaireG = table.Column<string>(nullable: true),
                    moisG = table.Column<string>(nullable: true),
                    anneeG = table.Column<string>(nullable: true),
                    assuranceG = table.Column<string>(nullable: true),
                    retraitG = table.Column<string>(nullable: true),
                    indemniteG = table.Column<string>(nullable: true),
                    attribut1 = table.Column<int>(nullable: false),
                    attribut2 = table.Column<string>(nullable: true),
                    attribut3 = table.Column<string>(nullable: true),
                    attribut4 = table.Column<string>(nullable: true),
                    attribut5 = table.Column<string>(nullable: true),
                    attribut6 = table.Column<string>(nullable: true),
                    dateenreg = table.Column<string>(nullable: true),
                    userName = table.Column<string>(nullable: true),
                    userNameCreator = table.Column<string>(nullable: true),
                    idUserCreator = table.Column<string>(nullable: true),
                    idUser = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_salaires", x => x.Id);
                    table.ForeignKey(
                        name: "FK_salaires_AspNetUsers_idUser",
                        column: x => x.idUser,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_salaires_idUser",
                table: "salaires",
                column: "idUser");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "salaires");
        }
    }
}
