using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace WebApplicationPlateforme.Migrations.Dawaa
{
    public partial class MigrationsServiceVente : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ServiceVentes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    type = table.Column<string>(nullable: true),
                    remarque = table.Column<string>(nullable: true),
                    adminId = table.Column<int>(nullable: false),
                    admin = table.Column<string>(nullable: true),
                    etat = table.Column<string>(nullable: true),
                    etatdot = table.Column<string>(nullable: true),
                    iddot = table.Column<string>(nullable: true),
                    nomdot = table.Column<string>(nullable: true),
                    datedot = table.Column<string>(nullable: true),
                    etatfin = table.Column<string>(nullable: true),
                    datefin = table.Column<string>(nullable: true),
                    nomfin = table.Column<string>(nullable: true),
                    idfin = table.Column<string>(nullable: true),
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
                    table.PrimaryKey("PK_ServiceVentes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ServiceVentes_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "TypeServiceVentes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TypeServiceVentes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "OffreVentes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    path = table.Column<string>(nullable: true),
                    type = table.Column<string>(nullable: true),
                    idVente = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OffreVentes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OffreVentes_ServiceVentes_idVente",
                        column: x => x.idVente,
                        principalTable: "ServiceVentes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OffreVentes_idVente",
                table: "OffreVentes",
                column: "idVente");

            migrationBuilder.CreateIndex(
                name: "IX_ServiceVentes_idUserCreator",
                table: "ServiceVentes",
                column: "idUserCreator");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OffreVentes");

            migrationBuilder.DropTable(
                name: "TypeServiceVentes");

            migrationBuilder.DropTable(
                name: "ServiceVentes");
        }
    }
}
