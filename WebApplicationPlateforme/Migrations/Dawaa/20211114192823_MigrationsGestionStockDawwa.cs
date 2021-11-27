using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace WebApplicationPlateforme.Migrations.Dawaa
{
    public partial class MigrationsGestionStockDawwa : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "RetourStocks",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nomstock = table.Column<string>(nullable: true),
                    respId = table.Column<string>(nullable: true),
                    respnom = table.Column<string>(nullable: true),
                    type = table.Column<string>(nullable: true),
                    categorie = table.Column<string>(nullable: true),
                    quatite = table.Column<string>(nullable: true),
                    etat = table.Column<string>(nullable: true),
                    bennom = table.Column<string>(nullable: true),
                    dateRetour = table.Column<string>(nullable: true),
                    attribut1 = table.Column<int>(nullable: false),
                    attribut7 = table.Column<int>(nullable: false),
                    attribut2 = table.Column<string>(nullable: true),
                    attribut3 = table.Column<string>(nullable: true),
                    attribut4 = table.Column<string>(nullable: true),
                    attribut5 = table.Column<string>(nullable: true),
                    attribut6 = table.Column<string>(nullable: true),
                    dateenreg = table.Column<string>(nullable: true),
                    userNameCreator = table.Column<string>(nullable: true),
                    idUserCreator = table.Column<string>(nullable: true),
                    stockId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RetourStocks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RetourStocks_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RetourStocks_Stock_stockId",
                        column: x => x.stockId,
                        principalTable: "Stock",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RetourStocks_idUserCreator",
                table: "RetourStocks",
                column: "idUserCreator");

            migrationBuilder.CreateIndex(
                name: "IX_RetourStocks_stockId",
                table: "RetourStocks",
                column: "stockId");

    
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RetourStocks");

         
        }
    }
}
