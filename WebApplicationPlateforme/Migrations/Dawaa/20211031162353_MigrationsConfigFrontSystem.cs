using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace WebApplicationPlateforme.Migrations.Dawaa
{
    public partial class MigrationsConfigFrontSystem : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ConfigSystemFront",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    footerIcon = table.Column<string>(nullable: true),
                    footerText = table.Column<string>(nullable: true),
                    loginBackground = table.Column<string>(nullable: true),
                    loginIcon = table.Column<string>(nullable: true),
                    loginText = table.Column<string>(nullable: true),
                    navIcon = table.Column<string>(nullable: true),
                    homeBackground = table.Column<string>(nullable: true),
                    reportLeftIcon = table.Column<string>(nullable: true),
                    reportRightIcon = table.Column<string>(nullable: true),
                    reportSignature = table.Column<string>(nullable: true),
                    icon1 = table.Column<string>(nullable: true),
                    icon2 = table.Column<string>(nullable: true),
                    icon3 = table.Column<string>(nullable: true),
                    icon4 = table.Column<string>(nullable: true),
                    icon5 = table.Column<string>(nullable: true),
                    icon6 = table.Column<string>(nullable: true),
                    icon7 = table.Column<string>(nullable: true),
                    icon8 = table.Column<string>(nullable: true),
                    icon9 = table.Column<string>(nullable: true),
                    icon10 = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConfigSystemFront", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ConfigSystemFront");
        }
    }
}
