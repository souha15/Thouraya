using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace WebApplicationPlateforme.Migrations
{
    public partial class MigrationVoiture001 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_voitureRepairs_voitures_idvoiture",
                table: "voitureRepairs");

            migrationBuilder.AlterColumn<int>(
                name: "idvoiture",
                table: "voitureRepairs",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.CreateTable(
                name: "notifCars",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    contenue = table.Column<string>(nullable: true),
                    dateTime = table.Column<string>(nullable: true),
                    dateenreg = table.Column<string>(nullable: true),
                    userNameCreator = table.Column<string>(nullable: true),
                    idUserCreator = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_notifCars", x => x.Id);
                    table.ForeignKey(
                        name: "FK_notifCars_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "organismeVoitures",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_organismeVoitures", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "typeVoitures",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_typeVoitures", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_notifCars_idUserCreator",
                table: "notifCars",
                column: "idUserCreator");

            migrationBuilder.AddForeignKey(
                name: "FK_voitureRepairs_voitures_idvoiture",
                table: "voitureRepairs",
                column: "idvoiture",
                principalTable: "voitures",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_voitureRepairs_voitures_idvoiture",
                table: "voitureRepairs");

            migrationBuilder.DropTable(
                name: "notifCars");

            migrationBuilder.DropTable(
                name: "organismeVoitures");

            migrationBuilder.DropTable(
                name: "typeVoitures");

            migrationBuilder.AlterColumn<int>(
                name: "idvoiture",
                table: "voitureRepairs",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_voitureRepairs_voitures_idvoiture",
                table: "voitureRepairs",
                column: "idvoiture",
                principalTable: "voitures",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
