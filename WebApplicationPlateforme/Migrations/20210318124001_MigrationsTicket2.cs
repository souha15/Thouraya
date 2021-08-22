using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace WebApplicationPlateforme.Migrations
{
    public partial class MigrationsTicket2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_filesTickets_tickets_idTic",
                table: "filesTickets");

            migrationBuilder.DropPrimaryKey(
                name: "PK_filesTickets",
                table: "filesTickets");

            migrationBuilder.DropIndex(
                name: "IX_filesTickets_idTic",
                table: "filesTickets");

            migrationBuilder.DropColumn(
                name: "idTic",
                table: "filesTickets");

            migrationBuilder.DropColumn(
                name: "type",
                table: "filesTickets");

            migrationBuilder.RenameTable(
                name: "filesTickets",
                newName: "FilesTickets");

            migrationBuilder.AddColumn<string>(
                name: "date",
                table: "FilesTickets",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "idTicket",
                table: "FilesTickets",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_FilesTickets",
                table: "FilesTickets",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "filesTickets",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    path = table.Column<string>(nullable: true),
                    type = table.Column<string>(nullable: true),
                    idTic = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_filesTickets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_filesTickets_tickets_idTic",
                        column: x => x.idTic,
                        principalTable: "tickets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Ticket2s",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    date = table.Column<string>(nullable: true),
                    titre = table.Column<string>(nullable: true),
                    detail = table.Column<string>(nullable: true),
                    etat = table.Column<string>(nullable: true),
                    idetab = table.Column<int>(nullable: false),
                    idadmin = table.Column<int>(nullable: false),
                    iduser = table.Column<string>(nullable: true),
                    nomadmin = table.Column<string>(nullable: true),
                    nomuser = table.Column<string>(nullable: true),
                    nometab = table.Column<string>(nullable: true),
                    etatuser = table.Column<string>(nullable: true),
                    etatetab = table.Column<string>(nullable: true),
                    etatadmin = table.Column<string>(nullable: true),
                    etatuserid = table.Column<string>(nullable: true),
                    etatusernom = table.Column<string>(nullable: true),
                    etatuserdate = table.Column<string>(nullable: true),
                    Attribut1 = table.Column<string>(nullable: true),
                    Attribut2 = table.Column<string>(nullable: true),
                    Attribut3 = table.Column<string>(nullable: true),
                    Attribut5 = table.Column<string>(nullable: true),
                    Attribut6 = table.Column<string>(nullable: true),
                    Attribut7 = table.Column<string>(nullable: true),
                    Attribut8 = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ticket2s", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "NotifTickets",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    path = table.Column<string>(nullable: true),
                    date = table.Column<string>(nullable: true),
                    iduser = table.Column<string>(nullable: true),
                    idadmin = table.Column<int>(nullable: false),
                    idetab = table.Column<int>(nullable: false),
                    idTicket = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NotifTickets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NotifTickets_Ticket2s_idTicket",
                        column: x => x.idTicket,
                        principalTable: "Ticket2s",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FilesTickets_idTicket",
                table: "FilesTickets",
                column: "idTicket");

            migrationBuilder.CreateIndex(
                name: "IX_filesTickets_idTic",
                table: "filesTickets",
                column: "idTic");

            migrationBuilder.CreateIndex(
                name: "IX_NotifTickets_idTicket",
                table: "NotifTickets",
                column: "idTicket");

            migrationBuilder.AddForeignKey(
                name: "FK_FilesTickets_Ticket2s_idTicket",
                table: "FilesTickets",
                column: "idTicket",
                principalTable: "Ticket2s",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FilesTickets_Ticket2s_idTicket",
                table: "FilesTickets");

            migrationBuilder.DropTable(
                name: "filesTickets");

            migrationBuilder.DropTable(
                name: "NotifTickets");

            migrationBuilder.DropTable(
                name: "Ticket2s");

            migrationBuilder.DropPrimaryKey(
                name: "PK_FilesTickets",
                table: "FilesTickets");

            migrationBuilder.DropIndex(
                name: "IX_FilesTickets_idTicket",
                table: "FilesTickets");

            migrationBuilder.DropColumn(
                name: "date",
                table: "FilesTickets");

            migrationBuilder.DropColumn(
                name: "idTicket",
                table: "FilesTickets");

            migrationBuilder.RenameTable(
                name: "FilesTickets",
                newName: "filesTickets");

            migrationBuilder.AddColumn<int>(
                name: "idTic",
                table: "filesTickets",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "type",
                table: "filesTickets",
                type: "text",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_filesTickets",
                table: "filesTickets",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_filesTickets_idTic",
                table: "filesTickets",
                column: "idTic");

            migrationBuilder.AddForeignKey(
                name: "FK_filesTickets_tickets_idTic",
                table: "filesTickets",
                column: "idTic",
                principalTable: "tickets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
