using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace WebApplicationPlateforme.Migrations.Dawaa
{
    public partial class MigrationsDemChangerRib : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DemChangeRib",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nomBanque = table.Column<string>(nullable: true),
                    rib = table.Column<string>(nullable: true),
                    idrh = table.Column<string>(nullable: true),
                    daterh = table.Column<string>(nullable: true),
                    nomrh = table.Column<string>(nullable: true),
                    etatrh = table.Column<string>(nullable: true),
                    etat = table.Column<string>(nullable: true),
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
                    table.PrimaryKey("PK_DemChangeRib", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DemChangeRib_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "FilesDemChangeRib",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    path = table.Column<string>(nullable: true),
                    type = table.Column<string>(nullable: true),
                    idDem = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FilesDemChangeRib", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FilesDemChangeRib_DemChangeRib_idDem",
                        column: x => x.idDem,
                        principalTable: "DemChangeRib",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DemChangeRib_idUserCreator",
                table: "DemChangeRib",
                column: "idUserCreator");

            migrationBuilder.CreateIndex(
                name: "IX_FilesDemChangeRib_idDem",
                table: "FilesDemChangeRib",
                column: "idDem");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FilesDemChangeRib");

            migrationBuilder.DropTable(
                name: "DemChangeRib");
        }
    }
}
