using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace WebApplicationPlateforme.Migrations.Dawaa
{
    public partial class MigrationsVisite : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "visite",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    type = table.Column<string>(nullable: true),
                    but = table.Column<string>(nullable: true),
                    nb = table.Column<string>(nullable: true),
                    budget = table.Column<string>(nullable: true),
                    detail = table.Column<string>(nullable: true),
                    dirid = table.Column<string>(nullable: true),
                    dirnom = table.Column<string>(nullable: true),
                    diretat = table.Column<string>(nullable: true),
                    dirdate = table.Column<string>(nullable: true),
                    adminid = table.Column<string>(nullable: true),
                    adminom = table.Column<string>(nullable: true),
                    admietat = table.Column<string>(nullable: true),
                    admidate = table.Column<string>(nullable: true),
                    etabnom = table.Column<string>(nullable: true),
                    etabid = table.Column<string>(nullable: true),
                    etabetat = table.Column<string>(nullable: true),
                    etabdate = table.Column<string>(nullable: true),
                    attribut1 = table.Column<string>(nullable: true),
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
                    table.PrimaryKey("PK_visite", x => x.Id);
                    table.ForeignKey(
                        name: "FK_visite_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "offreImpression",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true),
                    idvisite = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_offreImpression", x => x.Id);
                    table.ForeignKey(
                        name: "FK_offreImpression_visite_idvisite",
                        column: x => x.idvisite,
                        principalTable: "visite",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_offreImpression_idvisite",
                table: "offreImpression",
                column: "idvisite");

            migrationBuilder.CreateIndex(
                name: "IX_visite_idUserCreator",
                table: "visite",
                column: "idUserCreator");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "offreImpression");

            migrationBuilder.DropTable(
                name: "visite");
        }
    }
}
