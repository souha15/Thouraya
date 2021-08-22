using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace WebApplicationPlateforme.Migrations
{
    public partial class MigrationsOrgPart : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "orgPartis",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true),
                    prenom = table.Column<string>(nullable: true),
                    cin = table.Column<string>(nullable: true),
                    email = table.Column<string>(nullable: true),
                    addresse = table.Column<string>(nullable: true),
                    tel = table.Column<string>(nullable: true),
                    nomcomplet = table.Column<string>(nullable: true),
                    shortnom = table.Column<string>(nullable: true),
                    fax = table.Column<string>(nullable: true),
                    attribut1 = table.Column<int>(nullable: false),
                    attribut2 = table.Column<string>(nullable: true),
                    attribut3 = table.Column<string>(nullable: true),
                    attribut4 = table.Column<string>(nullable: true),
                    attribut5 = table.Column<string>(nullable: true),
                    attribut6 = table.Column<string>(nullable: true),
                    CreatorName = table.Column<string>(nullable: true),
                    IdUserCreator = table.Column<string>(nullable: true),
                    datenereg = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_orgPartis", x => x.Id);
                    table.ForeignKey(
                        name: "FK_orgPartis_AspNetUsers_IdUserCreator",
                        column: x => x.IdUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_orgPartis_IdUserCreator",
                table: "orgPartis",
                column: "IdUserCreator");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "orgPartis");
        }
    }
}
