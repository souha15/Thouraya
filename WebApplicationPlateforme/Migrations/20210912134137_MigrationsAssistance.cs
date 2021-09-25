using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace WebApplicationPlateforme.Migrations
{
    public partial class MigrationsAssistance : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "assistances",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    username = table.Column<string>(nullable: true),
                    dateTime = table.Column<string>(nullable: true),
                    position = table.Column<string>(nullable: true),
                    iddir = table.Column<string>(nullable: true),
                    nomdir = table.Column<string>(nullable: true),
                    datedir = table.Column<string>(nullable: true),
                    etatdir = table.Column<string>(nullable: true),
                    etat = table.Column<string>(nullable: true),
                    idrh = table.Column<string>(nullable: true),
                    etatrh = table.Column<string>(nullable: true),
                    nomrh = table.Column<string>(nullable: true),
                    daterh = table.Column<string>(nullable: true),
                    datefin = table.Column<string>(nullable: true),
                    etatfin = table.Column<string>(nullable: true),
                    idfin = table.Column<string>(nullable: true),
                    nomfin = table.Column<string>(nullable: true),
                    datefinetab = table.Column<string>(nullable: true),
                    etatfinetab = table.Column<string>(nullable: true),
                    idfinetab = table.Column<string>(nullable: true),
                    nomfinetab = table.Column<string>(nullable: true),
                    transfert = table.Column<string>(nullable: true),
                    transfert1 = table.Column<string>(nullable: true),
                    transfert2 = table.Column<string>(nullable: true),
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
                    table.PrimaryKey("PK_assistances", x => x.Id);
                    table.ForeignKey(
                        name: "FK_assistances_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_assistances_idUserCreator",
                table: "assistances",
                column: "idUserCreator");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "assistances");
        }
    }
}
