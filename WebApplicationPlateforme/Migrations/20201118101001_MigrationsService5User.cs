using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace WebApplicationPlateforme.Migrations
{
    public partial class MigrationsService5User : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "demissions",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    date = table.Column<string>(nullable: true),
                    raison = table.Column<string>(nullable: true),
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
                    table.PrimaryKey("PK_demissions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_demissions_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "permissionUs",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    date = table.Column<string>(nullable: true),
                    type = table.Column<string>(nullable: true),
                    autre = table.Column<string>(nullable: true),
                    heuredeb = table.Column<string>(nullable: true),
                    heurefin = table.Column<string>(nullable: true),
                    raison = table.Column<string>(nullable: true),
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
                    table.PrimaryKey("PK_permissionUs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_permissionUs_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "plaints",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    dateprob = table.Column<string>(nullable: true),
                    dateplaint = table.Column<string>(nullable: true),
                    partieB = table.Column<string>(nullable: true),
                    raison = table.Column<string>(nullable: true),
                    description = table.Column<string>(nullable: true),
                    affecter = table.Column<string>(nullable: true),
                    etataffecter = table.Column<string>(nullable: true),
                    idaffecter = table.Column<string>(nullable: true),
                    nomaffecter = table.Column<string>(nullable: true),
                    dateaffecter = table.Column<string>(nullable: true),
                    etat = table.Column<string>(nullable: true),
                    iddir = table.Column<string>(nullable: true),
                    nomdir = table.Column<string>(nullable: true),
                    datedir = table.Column<string>(nullable: true),
                    etatdir = table.Column<string>(nullable: true),
                    idrh = table.Column<string>(nullable: true),
                    nomrh = table.Column<string>(nullable: true),
                    etatrh = table.Column<string>(nullable: true),
                    daterh = table.Column<string>(nullable: true),
                    decision = table.Column<string>(nullable: true),
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
                    table.PrimaryKey("PK_plaints", x => x.Id);
                    table.ForeignKey(
                        name: "FK_plaints_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "filesPlaints",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    type = table.Column<string>(nullable: true),
                    path = table.Column<string>(nullable: true),
                    idPlaint = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_filesPlaints", x => x.Id);
                    table.ForeignKey(
                        name: "FK_filesPlaints_plaints_idPlaint",
                        column: x => x.idPlaint,
                        principalTable: "plaints",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_demissions_idUserCreator",
                table: "demissions",
                column: "idUserCreator");

            migrationBuilder.CreateIndex(
                name: "IX_filesPlaints_idPlaint",
                table: "filesPlaints",
                column: "idPlaint");

            migrationBuilder.CreateIndex(
                name: "IX_permissionUs_idUserCreator",
                table: "permissionUs",
                column: "idUserCreator");

            migrationBuilder.CreateIndex(
                name: "IX_plaints_idUserCreator",
                table: "plaints",
                column: "idUserCreator");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "demissions");

            migrationBuilder.DropTable(
                name: "filesPlaints");

            migrationBuilder.DropTable(
                name: "permissionUs");

            migrationBuilder.DropTable(
                name: "plaints");
        }
    }
}
