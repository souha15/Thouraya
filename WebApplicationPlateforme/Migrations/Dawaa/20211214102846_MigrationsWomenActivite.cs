using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace WebApplicationPlateforme.Migrations.Dawaa
{
    public partial class MigrationsWomenActivite : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ActiviteeWomens",
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
                    table.PrimaryKey("PK_ActiviteeWomens", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ActiviteeWomens_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "TypeActiviteeForWomens",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TypeActiviteeForWomens", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ActiviteeWomens_idUserCreator",
                table: "ActiviteeWomens",
                column: "idUserCreator");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ActiviteeWomens");

            migrationBuilder.DropTable(
                name: "TypeActiviteeForWomens");
        }
    }
}
