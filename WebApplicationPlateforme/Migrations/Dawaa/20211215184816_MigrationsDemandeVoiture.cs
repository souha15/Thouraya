using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace WebApplicationPlateforme.Migrations.Dawaa
{
    public partial class MigrationsDemandeVoiture : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DemandeVoitures",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    typeVoiture = table.Column<string>(nullable: true),
                    matricule = table.Column<string>(nullable: true),
                    marque = table.Column<string>(nullable: true),
                    model = table.Column<string>(nullable: true),
                    tel = table.Column<string>(nullable: true),
                    email = table.Column<string>(nullable: true),
                    remarque = table.Column<string>(nullable: true),
                    prix = table.Column<string>(nullable: true),
                    etat = table.Column<string>(nullable: true),
                    iddot = table.Column<string>(nullable: true),
                    namedot = table.Column<string>(nullable: true),
                    datedot = table.Column<string>(nullable: true),
                    dateenreg = table.Column<string>(nullable: true),
                    userNameCreator = table.Column<string>(nullable: true),
                    idUserCreator = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DemandeVoitures", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DemandeVoitures_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DemandeVoitures_idUserCreator",
                table: "DemandeVoitures",
                column: "idUserCreator");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DemandeVoitures");
        }
    }
}
