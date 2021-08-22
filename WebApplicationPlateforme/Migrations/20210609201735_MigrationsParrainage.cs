using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace WebApplicationPlateforme.Migrations
{
    public partial class MigrationsParrainage : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Parriners",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nomTuteur = table.Column<string>(nullable: true),
                    cinTuteur = table.Column<string>(nullable: true),
                    numTuteur = table.Column<string>(nullable: true),
                    nomOrph = table.Column<string>(nullable: true),
                    cinOrph = table.Column<string>(nullable: true),
                    numOrph = table.Column<string>(nullable: true),
                    nomBen = table.Column<string>(nullable: true),
                    cinBen = table.Column<string>(nullable: true),
                    numBen = table.Column<string>(nullable: true),
                    solde = table.Column<string>(nullable: true),
                    nbParrainage = table.Column<string>(nullable: true),
                    type = table.Column<string>(nullable: true),
                    attribut1 = table.Column<int>(nullable: false),
                    attribut7 = table.Column<int>(nullable: false),
                    attribut2 = table.Column<string>(nullable: true),
                    attribut3 = table.Column<string>(nullable: true),
                    attribut4 = table.Column<string>(nullable: true),
                    attribut5 = table.Column<string>(nullable: true),
                    attribut6 = table.Column<string>(nullable: true),
                    idOrph = table.Column<int>(nullable: false),
                    idTut = table.Column<int>(nullable: false),
                    idUserCreator = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Parriners", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Parriners_gestionBenenficiaires_idTut",
                        column: x => x.idTut,
                        principalTable: "gestionBenenficiaires",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Parriners_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "TuteurParrainages",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    tel = table.Column<string>(nullable: true),
                    nom = table.Column<string>(nullable: true),
                    cin = table.Column<string>(nullable: true),
                    email = table.Column<string>(nullable: true),
                    pays = table.Column<string>(nullable: true),
                    ville = table.Column<string>(nullable: true),
                    nat = table.Column<string>(nullable: true),
                    otherDetails = table.Column<string>(nullable: true),
                    numTut = table.Column<string>(nullable: true),
                    nbParrainage = table.Column<string>(nullable: true),
                    attribut1 = table.Column<int>(nullable: false),
                    attribut7 = table.Column<int>(nullable: false),
                    attribut2 = table.Column<string>(nullable: true),
                    attribut3 = table.Column<string>(nullable: true),
                    attribut4 = table.Column<string>(nullable: true),
                    attribut5 = table.Column<string>(nullable: true),
                    attribut6 = table.Column<string>(nullable: true),
                    dateenreg = table.Column<string>(nullable: true),
                    idUserCreator = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TuteurParrainages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TuteurParrainages_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "SoldeTuteurs",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nomTuteur = table.Column<string>(nullable: true),
                    cinTuteur = table.Column<string>(nullable: true),
                    numTuteur = table.Column<string>(nullable: true),
                    prix = table.Column<string>(nullable: true),
                    date = table.Column<string>(nullable: true),
                    type = table.Column<string>(nullable: true),
                    solde = table.Column<string>(nullable: true),
                    attribut1 = table.Column<int>(nullable: false),
                    attribut7 = table.Column<int>(nullable: false),
                    attribut2 = table.Column<string>(nullable: true),
                    attribut3 = table.Column<string>(nullable: true),
                    attribut4 = table.Column<string>(nullable: true),
                    attribut5 = table.Column<string>(nullable: true),
                    attribut6 = table.Column<string>(nullable: true),
                    idTut = table.Column<int>(nullable: false),
                    idUserCreator = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SoldeTuteurs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SoldeTuteurs_TuteurParrainages_idTut",
                        column: x => x.idTut,
                        principalTable: "TuteurParrainages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SoldeTuteurs_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Parriners_idTut",
                table: "Parriners",
                column: "idTut");

            migrationBuilder.CreateIndex(
                name: "IX_Parriners_idUserCreator",
                table: "Parriners",
                column: "idUserCreator");

            migrationBuilder.CreateIndex(
                name: "IX_SoldeTuteurs_idTut",
                table: "SoldeTuteurs",
                column: "idTut");

            migrationBuilder.CreateIndex(
                name: "IX_SoldeTuteurs_idUserCreator",
                table: "SoldeTuteurs",
                column: "idUserCreator");

            migrationBuilder.CreateIndex(
                name: "IX_TuteurParrainages_idUserCreator",
                table: "TuteurParrainages",
                column: "idUserCreator");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Parriners");

            migrationBuilder.DropTable(
                name: "SoldeTuteurs");

            migrationBuilder.DropTable(
                name: "TuteurParrainages");
        }
    }
}
