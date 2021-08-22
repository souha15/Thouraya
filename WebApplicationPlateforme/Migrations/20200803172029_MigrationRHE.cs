using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace WebApplicationPlateforme.Migrations
{
    public partial class MigrationRHE : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
           

            migrationBuilder.CreateTable(
                name: "equipements",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    type = table.Column<string>(nullable: true),
                    nom = table.Column<string>(nullable: true),
                    email = table.Column<string>(nullable: true),
                    tel = table.Column<string>(nullable: true),
                    transfert = table.Column<string>(nullable: true),
                    remarque = table.Column<string>(nullable: true),
                    etatdir = table.Column<string>(nullable: true),
                    date = table.Column<string>(nullable: true),
                    datedir = table.Column<string>(nullable: true),
                    iddir = table.Column<string>(nullable: true),
                    nomdir = table.Column<string>(nullable: true),
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
                    table.PrimaryKey("PK_equipements", x => x.Id);
                    table.ForeignKey(
                        name: "FK_equipements_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "nomEquipements",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_nomEquipements", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "typeEquipements",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_typeEquipements", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_equipements_idUserCreator",
                table: "equipements",
                column: "idUserCreator");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "equipements");

            migrationBuilder.DropTable(
                name: "nomEquipements");

            migrationBuilder.DropTable(
                name: "typeEquipements");

            migrationBuilder.DropColumn(
                name: "idremplacant",
                table: "conges");

            migrationBuilder.AddColumn<string>(
                name: "idremplaçant",
                table: "conges",
                type: "text",
                nullable: true);
        }
    }
}
