using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace WebApplicationPlateforme.Migrations
{
    public partial class MigrationVoi : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "voitures",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    matricule = table.Column<string>(nullable: true),
                    type = table.Column<string>(nullable: true),
                    nbcle = table.Column<string>(nullable: true),
                    nbplace = table.Column<string>(nullable: true),
                    dateachat = table.Column<string>(nullable: true),
                    org = table.Column<string>(nullable: true),
                    datepermis = table.Column<string>(nullable: true),
                    taxerv = table.Column<string>(nullable: true),
                    dateassurance = table.Column<string>(nullable: true),
                    dateservice = table.Column<string>(nullable: true),
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
                    table.PrimaryKey("PK_voitures", x => x.Id);
                    table.ForeignKey(
                        name: "FK_voitures_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "voitureRepairs",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    matricule = table.Column<string>(nullable: true),
                    type = table.Column<string>(nullable: true),
                    daterepair = table.Column<string>(nullable: true),
                    prix1 = table.Column<string>(nullable: true),
                    prix2 = table.Column<string>(nullable: true),
                    prix3 = table.Column<string>(nullable: true),
                    panne = table.Column<string>(nullable: true),
                    iddir = table.Column<string>(nullable: true),
                    idrh = table.Column<string>(nullable: true),
                    nomdir = table.Column<string>(nullable: true),
                    nomrh = table.Column<string>(nullable: true),
                    datedir = table.Column<string>(nullable: true),
                    daterh = table.Column<string>(nullable: true),
                    etat = table.Column<string>(nullable: true),
                    etatdir = table.Column<string>(nullable: true),
                    etatrh = table.Column<string>(nullable: true),
                    req = table.Column<string>(nullable: true),
                    attribut1 = table.Column<int>(nullable: false),
                    attribut2 = table.Column<string>(nullable: true),
                    attribut3 = table.Column<string>(nullable: true),
                    attribut4 = table.Column<string>(nullable: true),
                    attribut5 = table.Column<string>(nullable: true),
                    attribut6 = table.Column<string>(nullable: true),
                    dateenreg = table.Column<string>(nullable: true),
                    userNameCreator = table.Column<string>(nullable: true),
                    idvoiture = table.Column<int>(nullable: false),
                    idUserCreator = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_voitureRepairs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_voitureRepairs_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_voitureRepairs_voitures_idvoiture",
                        column: x => x.idvoiture,
                        principalTable: "voitures",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_voitureRepairs_idUserCreator",
                table: "voitureRepairs",
                column: "idUserCreator");

            migrationBuilder.CreateIndex(
                name: "IX_voitureRepairs_idvoiture",
                table: "voitureRepairs",
                column: "idvoiture");

            migrationBuilder.CreateIndex(
                name: "IX_voitures_idUserCreator",
                table: "voitures",
                column: "idUserCreator");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "voitureRepairs");

            migrationBuilder.DropTable(
                name: "voitures");
        }
    }
}
