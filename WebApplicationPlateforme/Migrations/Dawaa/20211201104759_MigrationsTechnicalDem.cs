using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace WebApplicationPlateforme.Migrations.Dawaa
{
    public partial class MigrationsTechnicalDem : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
          

            migrationBuilder.CreateTable(
                name: "demTeches",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    typedem = table.Column<string>(nullable: true),
                    idadmin = table.Column<int>(nullable: false),
                    nomadmin = table.Column<string>(nullable: true),
                    marque = table.Column<string>(nullable: true),
                    modele = table.Column<string>(nullable: true),
                    nomprog = table.Column<string>(nullable: true),
                    numsalle = table.Column<string>(nullable: true),
                    numorg = table.Column<string>(nullable: true),
                    numvideo = table.Column<string>(nullable: true),
                    etat = table.Column<string>(nullable: true),
                    techid = table.Column<string>(nullable: true),
                    technnom = table.Column<string>(nullable: true),
                    etatdate = table.Column<string>(nullable: true),
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
                    table.PrimaryKey("PK_demTeches", x => x.Id);
                    table.ForeignKey(
                        name: "FK_demTeches_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "TypeTechDems",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TypeTechDems", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_demTeches_idUserCreator",
                table: "demTeches",
                column: "idUserCreator");


        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.DropTable(
                name: "demTeches");

            migrationBuilder.DropTable(
                name: "TypeTechDems");         
        }
    }
}
