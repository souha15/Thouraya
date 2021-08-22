using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace WebApplicationPlateforme.Migrations
{
    public partial class MigrationsUserService12 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "residences",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    user = table.Column<string>(nullable: true),
                    num = table.Column<string>(nullable: true),
                    numBureau = table.Column<string>(nullable: true),
                    numfrontiere = table.Column<string>(nullable: true),
                    datefin = table.Column<string>(nullable: true),
                    permistravail = table.Column<string>(nullable: true),
                    renouvler = table.Column<string>(nullable: true),
                    assurance = table.Column<string>(nullable: true),
                    raison = table.Column<string>(nullable: true),
                    payer = table.Column<string>(nullable: true),
                    etat = table.Column<string>(nullable: true),
                    etatdir = table.Column<string>(nullable: true),
                    etatrh = table.Column<string>(nullable: true),
                    iddir = table.Column<string>(nullable: true),
                    idrh = table.Column<string>(nullable: true),
                    nomrh = table.Column<string>(nullable: true),
                    nomdir = table.Column<string>(nullable: true),
                    datedir = table.Column<string>(nullable: true),
                    daterh = table.Column<string>(nullable: true),
                    creatorName = table.Column<string>(nullable: true),
                    datenereg = table.Column<string>(nullable: true),
                    attibut1 = table.Column<string>(nullable: true),
                    attribut2 = table.Column<string>(nullable: true),
                    attribut3 = table.Column<string>(nullable: true),
                    attribut4 = table.Column<string>(nullable: true),
                    attribut5 = table.Column<string>(nullable: true),
                    attribut6 = table.Column<string>(nullable: true),
                    idUserCreator = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_residences", x => x.Id);
                    table.ForeignKey(
                        name: "FK_residences_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_residences_idUserCreator",
                table: "residences",
                column: "idUserCreator");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "residences");
        }
    }
}
