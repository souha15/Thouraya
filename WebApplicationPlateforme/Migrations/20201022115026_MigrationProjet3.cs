using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace WebApplicationPlateforme.Migrations
{
    public partial class MigrationProjet3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "dateFin",
                table: "Projets",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "butProjets",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    but = table.Column<string>(nullable: true),
                    nbbut = table.Column<string>(nullable: true),
                    prix = table.Column<string>(nullable: true),
                    tot = table.Column<string>(nullable: true),
                    benef = table.Column<string>(nullable: true),
                    nbbenef = table.Column<string>(nullable: true),
                    attibut1 = table.Column<string>(nullable: true),
                    attribut2 = table.Column<string>(nullable: true),
                    attribut3 = table.Column<string>(nullable: true),
                    datenereg = table.Column<string>(nullable: true),
                    idprojet = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_butProjets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_butProjets_Projets_idprojet",
                        column: x => x.idprojet,
                        principalTable: "Projets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_butProjets_idprojet",
                table: "butProjets",
                column: "idprojet");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "butProjets");

            migrationBuilder.DropColumn(
                name: "dateFin",
                table: "Projets");
        }
    }
}
