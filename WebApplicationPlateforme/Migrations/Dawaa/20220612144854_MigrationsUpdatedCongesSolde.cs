using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace WebApplicationPlateforme.Migrations.Dawaa
{
    public partial class MigrationsUpdatedCongesSolde : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
         

            migrationBuilder.CreateTable(
                name: "soldeCongesInfosUpdates",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    date = table.Column<DateTime>(nullable: false),
                    day = table.Column<int>(nullable: false),
                    month = table.Column<int>(nullable: false),
                    year = table.Column<int>(nullable: false),
                    updated = table.Column<string>(nullable: true),
                    cuurentdate = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_soldeCongesInfosUpdates", x => x.Id);
                });

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
           
            migrationBuilder.DropTable(
                name: "soldeCongesInfosUpdates");

        }
    }
}
