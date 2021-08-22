using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace WebApplicationPlateforme.Migrations
{
    public partial class MigrationsMsgInterne : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "msgInternes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    date = table.Column<string>(nullable: true),
                    titre = table.Column<string>(nullable: true),
                    message = table.Column<string>(nullable: true),
                    vu = table.Column<string>(nullable: true),
                    userIdSender = table.Column<string>(nullable: true),
                    userIdReceiver = table.Column<string>(nullable: true),
                    userNameSender = table.Column<string>(nullable: true),
                    userNameReceiver = table.Column<string>(nullable: true),
                    seen = table.Column<int>(nullable: false),
                    attribut1 = table.Column<int>(nullable: false),
                    attribut2 = table.Column<int>(nullable: false),
                    attribut3 = table.Column<int>(nullable: false),
                    attribut4 = table.Column<string>(nullable: true),
                    attribut5 = table.Column<string>(nullable: true),
                    attribut6 = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_msgInternes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "filesMsgInternes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    path = table.Column<string>(nullable: true),
                    type = table.Column<string>(nullable: true),
                    idMsg = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_filesMsgInternes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_filesMsgInternes_msgInternes_idMsg",
                        column: x => x.idMsg,
                        principalTable: "msgInternes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "notifMsgInternes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    date = table.Column<string>(nullable: true),
                    text = table.Column<string>(nullable: true),
                    vu = table.Column<string>(nullable: true),
                    userIdSender = table.Column<string>(nullable: true),
                    userIdReceiver = table.Column<string>(nullable: true),
                    userNameSender = table.Column<string>(nullable: true),
                    userNameReceiver = table.Column<string>(nullable: true),
                    seen = table.Column<int>(nullable: false),
                    idMsg = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_notifMsgInternes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_notifMsgInternes_msgInternes_idMsg",
                        column: x => x.idMsg,
                        principalTable: "msgInternes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_filesMsgInternes_idMsg",
                table: "filesMsgInternes",
                column: "idMsg");

            migrationBuilder.CreateIndex(
                name: "IX_notifMsgInternes_idMsg",
                table: "notifMsgInternes",
                column: "idMsg");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "filesMsgInternes");

            migrationBuilder.DropTable(
                name: "notifMsgInternes");

            migrationBuilder.DropTable(
                name: "msgInternes");
        }
    }
}
