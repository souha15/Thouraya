using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace WebApplicationPlateforme.Migrations
{
    public partial class MigrationServiceFormation2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "newFormationRequests",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    titre = table.Column<string>(nullable: true),
                    specialite = table.Column<string>(nullable: true),
                    autreSpec = table.Column<string>(nullable: true),
                    org = table.Column<string>(nullable: true),
                    duree = table.Column<string>(nullable: true),
                    prix = table.Column<string>(nullable: true),
                    lien = table.Column<string>(nullable: true),
                    detail = table.Column<string>(nullable: true),
                    etat = table.Column<string>(nullable: true),
                    etatdir = table.Column<string>(nullable: true),
                    iddir = table.Column<string>(nullable: true),
                    nomdir = table.Column<string>(nullable: true),
                    datedir = table.Column<string>(nullable: true),
                    etatrh = table.Column<string>(nullable: true),
                    idrh = table.Column<string>(nullable: true),
                    nomrh = table.Column<string>(nullable: true),
                    daterh = table.Column<string>(nullable: true),
                    etatc = table.Column<string>(nullable: true),
                    idc = table.Column<string>(nullable: true),
                    nomc = table.Column<string>(nullable: true),
                    datec = table.Column<string>(nullable: true),
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
                    table.PrimaryKey("PK_newFormationRequests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_newFormationRequests_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_newFormationRequests_idUserCreator",
                table: "newFormationRequests",
                column: "idUserCreator");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "newFormationRequests");
        }
    }
}
