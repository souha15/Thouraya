using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace WebApplicationPlateforme.Migrations
{
    public partial class MigrationsFinanaceDemPayCheque : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
               name: "actionOnDemPayCheqs",
               columns: table => new
               {
                   Id = table.Column<int>(nullable: false)
                       .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                   nomUserFin = table.Column<string>(nullable: true),
                   nomUserCre = table.Column<string>(nullable: true),
                   idUserCre = table.Column<string>(nullable: true),
                   etat = table.Column<string>(nullable: true),
                   date = table.Column<string>(nullable: true),
                   nbetat = table.Column<string>(nullable: true),
                   userrole = table.Column<string>(nullable: true),
                   attibut1 = table.Column<string>(nullable: true),
                   attribut2 = table.Column<string>(nullable: true),
                   attribut3 = table.Column<string>(nullable: true),
                   attribut4 = table.Column<string>(nullable: true),
                   attribut5 = table.Column<string>(nullable: true),
                   attribut6 = table.Column<string>(nullable: true),
                   idDem = table.Column<int>(nullable: false),
                   idUserCreator = table.Column<string>(nullable: true)
               },
               constraints: table =>
               {
                   table.PrimaryKey("PK_actionOnDemPayCheqs", x => x.Id);
                   table.ForeignKey(
                       name: "FK_actionOnDemPayCheqs_demandePayCheques_idDem",
                       column: x => x.idDem,
                       principalTable: "demandePayCheques",
                       principalColumn: "Id",
                       onDelete: ReferentialAction.Cascade);
                   table.ForeignKey(
                       name: "FK_actionOnDemPayCheqs_AspNetUsers_idUserCreator",
                       column: x => x.idUserCreator,
                       principalTable: "AspNetUsers",
                       principalColumn: "Id",
                       onDelete: ReferentialAction.Restrict);
               });

            migrationBuilder.CreateTable(
                name: "demPayCheqNotifs",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nomUser = table.Column<string>(nullable: true),
                    topic = table.Column<string>(nullable: true),
                    nb = table.Column<string>(nullable: true),
                    date = table.Column<string>(nullable: true),
                    nbpartsfin = table.Column<int>(nullable: false),
                    idDem = table.Column<int>(nullable: false),
                    idUserCreator = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_demPayCheqNotifs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_demPayCheqNotifs_demandePayCheques_idDem",
                        column: x => x.idDem,
                        principalTable: "demandePayCheques",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_demPayCheqNotifs_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_a_idDem",
                table: "actionOnDemPayCheqs",
                column: "idDem");

            migrationBuilder.CreateIndex(
                name: "IX_actionOnDemPayCheqs_idUserCreator",
                table: "actionOnDemPayCheqs",
                column: "idUserCreator");

            migrationBuilder.CreateIndex(
                name: "IX_demPayCheqNotifs_idDem",
                table: "demPayCheqNotifs",
                column: "idDem");

            migrationBuilder.CreateIndex(
                name: "IX_demPayCheqNotifs_idUserCreator",
                table: "demPayCheqNotifs",
                column: "idUserCreator");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "actionOnDemPayCheqs");

            migrationBuilder.DropTable(
                name: "demPayCheqNotifs");
        }
    }
}

