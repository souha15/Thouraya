using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace WebApplicationPlateforme.Migrations
{
    public partial class MigrationsPointageUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PointageUsers",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    code = table.Column<string>(nullable: true),
                    username = table.Column<string>(nullable: true),
                    email = table.Column<string>(nullable: true),
                    dateTimePresence = table.Column<string>(nullable: true),
                    datePresence = table.Column<string>(nullable: true),
                    timePresence = table.Column<string>(nullable: true),
                    dateTimeQuitter = table.Column<string>(nullable: true),
                    dateQuitter = table.Column<string>(nullable: true),
                    timeQuitter = table.Column<string>(nullable: true),
                    mois = table.Column<string>(nullable: true),
                    adresseMac = table.Column<string>(nullable: true),
                    adresseIP = table.Column<string>(nullable: true),
                    etatPc = table.Column<string>(nullable: true),
                    latePresence = table.Column<string>(nullable: true),
                    lateQuitter = table.Column<string>(nullable: true),
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
                    table.PrimaryKey("PK_PointageUsers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PointageUsers_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PointageUsers_idUserCreator",
                table: "PointageUsers",
                column: "idUserCreator");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PointageUsers");
        }
    }
}
