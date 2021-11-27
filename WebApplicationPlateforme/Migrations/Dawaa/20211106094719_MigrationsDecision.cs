using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace WebApplicationPlateforme.Migrations.Dawaa
{
    public partial class MigrationsDecision : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DecisionDecisifs",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    userId = table.Column<string>(nullable: true),
                    userName = table.Column<string>(nullable: true),
                    infraction = table.Column<string>(nullable: true),
                    dateHijMil = table.Column<int>(nullable: false),
                    typeDecstr = table.Column<int>(nullable: false),
                    datehijmil = table.Column<string>(nullable: true),
                    moisHij = table.Column<string>(nullable: true),
                    joursHij = table.Column<string>(nullable: true),
                    anneeHij = table.Column<string>(nullable: true),
                    moisMil = table.Column<string>(nullable: true),
                    joursMil = table.Column<string>(nullable: true),
                    anneeMil = table.Column<string>(nullable: true),
                    periode = table.Column<string>(nullable: true),
                    repetion = table.Column<string>(nullable: true),
                    decisionNb = table.Column<string>(nullable: true),
                    typeDec = table.Column<string>(nullable: true),
                    moisDecHij = table.Column<string>(nullable: true),
                    moisDecMil = table.Column<string>(nullable: true),
                    anneeDecHij = table.Column<string>(nullable: true),
                    anneeDecMil = table.Column<string>(nullable: true),
                    attribut1 = table.Column<int>(nullable: false),
                    attribut2 = table.Column<string>(nullable: true),
                    attribut3 = table.Column<string>(nullable: true),
                    attribut4 = table.Column<string>(nullable: true),
                    attribut5 = table.Column<string>(nullable: true),
                    attribut6 = table.Column<string>(nullable: true),
                    dateenreg = table.Column<string>(nullable: true),
                    UserNameCreator = table.Column<string>(nullable: true),
                    IdUserCreator = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DecisionDecisifs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DecisionDecisifs_AspNetUsers_IdUserCreator",
                        column: x => x.IdUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "DecissionCommuns",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    adminId = table.Column<int>(nullable: false),
                    etabId = table.Column<int>(nullable: false),
                    typeDecint = table.Column<int>(nullable: false),
                    typeDecstr = table.Column<string>(nullable: true),
                    userName = table.Column<string>(nullable: true),
                    userId = table.Column<string>(nullable: true),
                    adminName = table.Column<string>(nullable: true),
                    etabName = table.Column<string>(nullable: true),
                    num = table.Column<string>(nullable: true),
                    position = table.Column<string>(nullable: true),
                    emploi = table.Column<string>(nullable: true),
                    dateTravail = table.Column<string>(nullable: true),
                    infraction = table.Column<string>(nullable: true),
                    dateFinContratHij = table.Column<string>(nullable: true),
                    dateFinContratMil = table.Column<string>(nullable: true),
                    raison = table.Column<string>(nullable: true),
                    autre = table.Column<string>(nullable: true),
                    attribut1 = table.Column<int>(nullable: false),
                    attribut2 = table.Column<string>(nullable: true),
                    attribut3 = table.Column<string>(nullable: true),
                    attribut4 = table.Column<string>(nullable: true),
                    attribut5 = table.Column<string>(nullable: true),
                    attribut6 = table.Column<string>(nullable: true),
                    dateenreg = table.Column<string>(nullable: true),
                    UserNameCreator = table.Column<string>(nullable: true),
                    IdUserCreator = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DecissionCommuns", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DecissionCommuns_AspNetUsers_IdUserCreator",
                        column: x => x.IdUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DecisionDecisifs_IdUserCreator",
                table: "DecisionDecisifs",
                column: "IdUserCreator");

            migrationBuilder.CreateIndex(
                name: "IX_DecissionCommuns_IdUserCreator",
                table: "DecissionCommuns",
                column: "IdUserCreator");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DecisionDecisifs");

            migrationBuilder.DropTable(
                name: "DecissionCommuns");
        }
    }
}
