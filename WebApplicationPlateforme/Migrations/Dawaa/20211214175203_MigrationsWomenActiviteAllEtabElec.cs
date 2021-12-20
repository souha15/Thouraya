using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace WebApplicationPlateforme.Migrations.Dawaa
{
    public partial class MigrationsWomenActiviteAllEtabElec : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ActiviteDawaElecs",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true),
                    type = table.Column<string>(nullable: true),
                    dateEnreg = table.Column<string>(nullable: true),
                    nbActivite = table.Column<string>(nullable: true),
                    nbBenef = table.Column<string>(nullable: true),
                    dateDeb = table.Column<string>(nullable: true),
                    datefin = table.Column<string>(nullable: true),
                    attribut1 = table.Column<string>(nullable: true),
                    attribut7 = table.Column<string>(nullable: true),
                    attribut2 = table.Column<string>(nullable: true),
                    attribut3 = table.Column<string>(nullable: true),
                    attribut4 = table.Column<string>(nullable: true),
                    attribut5 = table.Column<string>(nullable: true),
                    attribut6 = table.Column<string>(nullable: true),
                    userNameCreator = table.Column<string>(nullable: true),
                    idUserCreator = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActiviteDawaElecs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ActiviteDawaElecs_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "TypeActiviteDawaaElecs",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TypeActiviteDawaaElecs", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ActiviteDawaElecs_idUserCreator",
                table: "ActiviteDawaElecs",
                column: "idUserCreator");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ActiviteDawaElecs");

            migrationBuilder.DropTable(
                name: "TypeActiviteDawaaElecs");
        }
    }
}
