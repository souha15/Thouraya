using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace WebApplicationPlateforme.Migrations.Dawaa
{
    public partial class MigrationsCongeFiles : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            

            migrationBuilder.CreateTable(
                name: "congeFiles",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    path = table.Column<string>(nullable: true),
                    typeConges = table.Column<string>(nullable: true),
                    nomConges = table.Column<string>(nullable: true),
                    idConge = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_congeFiles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_congeFiles_Conge_idConge",
                        column: x => x.idConge,
                        principalTable: "Conge",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

     

            migrationBuilder.CreateIndex(
                name: "IX_congeFiles_idConge",
                table: "congeFiles",
                column: "idConge");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "congeFiles");

        
        }
    }
}
