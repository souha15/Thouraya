using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace WebApplicationPlateforme.Migrations.Dawaa
{
    public partial class MigrationsGestionTicket : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "GestionTickets",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    clientId = table.Column<string>(nullable: true),
                    clientName = table.Column<string>(nullable: true),
                    clientDate = table.Column<string>(nullable: true),
                    numTicket = table.Column<int>(nullable: false),
                    num = table.Column<string>(nullable: true),
                    path = table.Column<string>(nullable: true),
                    titre = table.Column<string>(nullable: true),
                    description = table.Column<string>(nullable: true),
                    details = table.Column<string>(nullable: true),
                    remarque = table.Column<string>(nullable: true),
                    etat = table.Column<string>(nullable: true),
                    agentId = table.Column<string>(nullable: true),
                    agentName = table.Column<string>(nullable: true),
                    dateAgent = table.Column<string>(nullable: true),
                    type = table.Column<string>(nullable: true),
                    priorite = table.Column<string>(nullable: true),
                    dateDeb = table.Column<string>(nullable: true),
                    dateFin = table.Column<string>(nullable: true),
                    dateEtat = table.Column<string>(nullable: true),
                    descriptionAgent = table.Column<string>(nullable: true),
                    detailAgent = table.Column<string>(nullable: true),
                    remarqueAgent = table.Column<string>(nullable: true),
                    attribut1 = table.Column<string>(nullable: true),
                    attribut2 = table.Column<string>(nullable: true),
                    attribut3 = table.Column<string>(nullable: true),
                    attribut4 = table.Column<string>(nullable: true),
                    attribut5 = table.Column<string>(nullable: true),
                    attribut6 = table.Column<string>(nullable: true),
                    attribut7 = table.Column<string>(nullable: true),
                    attribut8 = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GestionTickets", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CommentsTickets",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Text = table.Column<string>(nullable: true),
                    path = table.Column<string>(nullable: true),
                    userId = table.Column<string>(nullable: true),
                    userName = table.Column<string>(nullable: true),
                    dateTime = table.Column<string>(nullable: true),
                    attribut1 = table.Column<string>(nullable: true),
                    attribut2 = table.Column<string>(nullable: true),
                    attribut3 = table.Column<string>(nullable: true),
                    attribut4 = table.Column<string>(nullable: true),
                    attribut5 = table.Column<string>(nullable: true),
                    attribut6 = table.Column<string>(nullable: true),
                    attribut7 = table.Column<string>(nullable: true),
                    attribut8 = table.Column<string>(nullable: true),
                    idTicket = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CommentsTickets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CommentsTickets_GestionTickets_idTicket",
                        column: x => x.idTicket,
                        principalTable: "GestionTickets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FilesGestionTickets",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    type = table.Column<string>(nullable: true),
                    path = table.Column<string>(nullable: true),
                    idTicket = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FilesGestionTickets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FilesGestionTickets_GestionTickets_idTicket",
                        column: x => x.idTicket,
                        principalTable: "GestionTickets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CommentsTicketFiles",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Text = table.Column<string>(nullable: true),
                    path = table.Column<string>(nullable: true),
                    idComment = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CommentsTicketFiles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CommentsTicketFiles_CommentsTickets_idComment",
                        column: x => x.idComment,
                        principalTable: "CommentsTickets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CommentsTicketFiles_idComment",
                table: "CommentsTicketFiles",
                column: "idComment");

            migrationBuilder.CreateIndex(
                name: "IX_CommentsTickets_idTicket",
                table: "CommentsTickets",
                column: "idTicket");

            migrationBuilder.CreateIndex(
                name: "IX_FilesGestionTickets_idTicket",
                table: "FilesGestionTickets",
                column: "idTicket");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CommentsTicketFiles");

            migrationBuilder.DropTable(
                name: "FilesGestionTickets");

            migrationBuilder.DropTable(
                name: "CommentsTickets");

            migrationBuilder.DropTable(
                name: "GestionTickets");
        }
    }
}
