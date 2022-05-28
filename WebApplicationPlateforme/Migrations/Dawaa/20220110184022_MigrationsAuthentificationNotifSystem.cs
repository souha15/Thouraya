using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace WebApplicationPlateforme.Migrations.Dawaa
{
    public partial class MigrationsAuthentificationNotifSystem : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Notifs",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    userReceiverId = table.Column<string>(nullable: true),
                    userReceiverName = table.Column<string>(nullable: true),
                    userTransmitterId = table.Column<string>(nullable: true),
                    userTransmitterName = table.Column<string>(nullable: true),
                    serviceId = table.Column<int>(nullable: false),
                    serviceName = table.Column<string>(nullable: true),
                    TextNotification = table.Column<string>(nullable: true),
                    date = table.Column<string>(nullable: true),
                    time = table.Column<string>(nullable: true),
                    dateTime = table.Column<string>(nullable: true),
                    readUnread = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notifs", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Notifs");
        }
    }
}
