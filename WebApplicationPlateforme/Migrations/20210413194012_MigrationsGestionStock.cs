using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace WebApplicationPlateforme.Migrations
{
    public partial class MigrationsGestionStock : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Stock",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true),
                    respId = table.Column<string>(nullable: true),
                    respNom = table.Column<string>(nullable: true),
                    attribut1 = table.Column<int>(nullable: false),
                    attribut7 = table.Column<int>(nullable: false),
                    attribut2 = table.Column<string>(nullable: true),
                    attribut3 = table.Column<string>(nullable: true),
                    attribut4 = table.Column<string>(nullable: true),
                    attribut5 = table.Column<string>(nullable: true),
                    attribut6 = table.Column<string>(nullable: true),
                    dateenreg = table.Column<string>(nullable: true),
                    userNameCreator = table.Column<string>(nullable: true),
                    idUserCreator = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stock", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Stock_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "TypeStocks",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true),
                    unite = table.Column<string>(nullable: true),
                    num = table.Column<string>(nullable: true),
                    prix = table.Column<string>(nullable: true),
                    tot = table.Column<string>(nullable: true),
                    attribut1 = table.Column<int>(nullable: false),
                    attribut7 = table.Column<int>(nullable: false),
                    attribut2 = table.Column<string>(nullable: true),
                    attribut3 = table.Column<string>(nullable: true),
                    attribut4 = table.Column<string>(nullable: true),
                    attribut5 = table.Column<string>(nullable: true),
                    attribut6 = table.Column<string>(nullable: true),
                    dateenreg = table.Column<string>(nullable: true),
                    userNameCreator = table.Column<string>(nullable: true),
                    idUserCreator = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TypeStocks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TypeStocks_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UniteTypeStocks",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UniteTypeStocks", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "OrdrePayStockages",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    respId = table.Column<string>(nullable: true),
                    respNom = table.Column<string>(nullable: true),
                    respEtat = table.Column<string>(nullable: true),
                    respDate = table.Column<string>(nullable: true),
                    nomStock = table.Column<string>(nullable: true),
                    typeOrdre = table.Column<string>(nullable: true),
                    etatDir = table.Column<string>(nullable: true),
                    idDir = table.Column<string>(nullable: true),
                    nomDir = table.Column<string>(nullable: true),
                    dateDir = table.Column<string>(nullable: true),
                    nomOrdre = table.Column<string>(nullable: true),
                    typePay = table.Column<string>(nullable: true),
                    typeBen = table.Column<string>(nullable: true),
                    nbFamille = table.Column<string>(nullable: true),
                    dateFin = table.Column<string>(nullable: true),
                    etatBen = table.Column<string>(nullable: true),
                    etatOrdre = table.Column<string>(nullable: true),
                    quantite = table.Column<string>(nullable: true),
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
                    idstock = table.Column<int>(nullable: false),
                    idBen = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrdrePayStockages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrdrePayStockages_gestionBenenficiaires_idBen",
                        column: x => x.idBen,
                        principalTable: "gestionBenenficiaires",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrdrePayStockages_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_OrdrePayStockages_Stock_idstock",
                        column: x => x.idstock,
                        principalTable: "Stock",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PayDirecteStockages",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    typeBen = table.Column<string>(nullable: true),
                    nomBen = table.Column<string>(nullable: true),
                    nomStock = table.Column<string>(nullable: true),
                    type = table.Column<string>(nullable: true),
                    quantite = table.Column<string>(nullable: true),
                    cin = table.Column<string>(nullable: true),
                    numBen = table.Column<string>(nullable: true),
                    nom = table.Column<string>(nullable: true),
                    nat = table.Column<string>(nullable: true),
                    tel = table.Column<string>(nullable: true),
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
                    idstock = table.Column<int>(nullable: false),
                    idBen = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PayDirecteStockages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PayDirecteStockages_gestionBenenficiaires_idBen",
                        column: x => x.idBen,
                        principalTable: "gestionBenenficiaires",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PayDirecteStockages_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PayDirecteStockages_Stock_idstock",
                        column: x => x.idstock,
                        principalTable: "Stock",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Stockages",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nomstock = table.Column<string>(nullable: true),
                    respId = table.Column<string>(nullable: true),
                    respnom = table.Column<string>(nullable: true),
                    type = table.Column<string>(nullable: true),
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
                    table.PrimaryKey("PK_Stockages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Stockages_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Stockages_Stock_stockId",
                        column: x => x.stockId,
                        principalTable: "Stock",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BenPayStockageOrdres",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nomBen = table.Column<string>(nullable: true),
                    cin = table.Column<string>(nullable: true),
                    nomStock = table.Column<string>(nullable: true),
                    typeBen = table.Column<string>(nullable: true),
                    typeStock = table.Column<string>(nullable: true),
                    quatite = table.Column<string>(nullable: true),
                    attribut1 = table.Column<int>(nullable: false),
                    attribut7 = table.Column<int>(nullable: false),
                    attribut2 = table.Column<string>(nullable: true),
                    attribut3 = table.Column<string>(nullable: true),
                    attribut4 = table.Column<string>(nullable: true),
                    attribut5 = table.Column<string>(nullable: true),
                    attribut6 = table.Column<string>(nullable: true),
                    dateenreg = table.Column<string>(nullable: true),
                    userNameCreator = table.Column<string>(nullable: true),
                    idstock = table.Column<int>(nullable: false),
                    idBen = table.Column<int>(nullable: false),
                    idUserCreator = table.Column<string>(nullable: true),
                    idOrdrePayStockage = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BenPayStockageOrdres", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BenPayStockageOrdres_gestionBenenficiaires_idBen",
                        column: x => x.idBen,
                        principalTable: "gestionBenenficiaires",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BenPayStockageOrdres_OrdrePayStockages_idOrdrePayStockage",
                        column: x => x.idOrdrePayStockage,
                        principalTable: "OrdrePayStockages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BenPayStockageOrdres_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_BenPayStockageOrdres_Stock_idstock",
                        column: x => x.idstock,
                        principalTable: "Stock",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TypeStockages",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nomstock = table.Column<string>(nullable: true),
                    type = table.Column<string>(nullable: true),
                    unite = table.Column<string>(nullable: true),
                    quantite = table.Column<string>(nullable: true),
                    prix = table.Column<string>(nullable: true),
                    tot = table.Column<string>(nullable: true),
                    attribut1 = table.Column<int>(nullable: false),
                    attribut7 = table.Column<int>(nullable: false),
                    attribut2 = table.Column<string>(nullable: true),
                    attribut3 = table.Column<string>(nullable: true),
                    attribut4 = table.Column<string>(nullable: true),
                    attribut5 = table.Column<string>(nullable: true),
                    attribut6 = table.Column<string>(nullable: true),
                    dateenreg = table.Column<string>(nullable: true),
                    userNameCreator = table.Column<string>(nullable: true),
                    idstock = table.Column<int>(nullable: false),
                    idstockage = table.Column<int>(nullable: false),
                    idUserCreator = table.Column<string>(nullable: true),
                    idOrdrePayStockage = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TypeStockages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TypeStockages_OrdrePayStockages_idOrdrePayStockage",
                        column: x => x.idOrdrePayStockage,
                        principalTable: "OrdrePayStockages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TypeStockages_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TypeStockages_Stock_idstock",
                        column: x => x.idstock,
                        principalTable: "Stock",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TypeStockages_Stockages_idstockage",
                        column: x => x.idstockage,
                        principalTable: "Stockages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BenPayStockageOrdres_idBen",
                table: "BenPayStockageOrdres",
                column: "idBen");

            migrationBuilder.CreateIndex(
                name: "IX_BenPayStockageOrdres_idOrdrePayStockage",
                table: "BenPayStockageOrdres",
                column: "idOrdrePayStockage");

            migrationBuilder.CreateIndex(
                name: "IX_BenPayStockageOrdres_idUserCreator",
                table: "BenPayStockageOrdres",
                column: "idUserCreator");

            migrationBuilder.CreateIndex(
                name: "IX_BenPayStockageOrdres_idstock",
                table: "BenPayStockageOrdres",
                column: "idstock");

            migrationBuilder.CreateIndex(
                name: "IX_OrdrePayStockages_idBen",
                table: "OrdrePayStockages",
                column: "idBen");

            migrationBuilder.CreateIndex(
                name: "IX_OrdrePayStockages_idUserCreator",
                table: "OrdrePayStockages",
                column: "idUserCreator");

            migrationBuilder.CreateIndex(
                name: "IX_OrdrePayStockages_idstock",
                table: "OrdrePayStockages",
                column: "idstock");

            migrationBuilder.CreateIndex(
                name: "IX_PayDirecteStockages_idBen",
                table: "PayDirecteStockages",
                column: "idBen");

            migrationBuilder.CreateIndex(
                name: "IX_PayDirecteStockages_idUserCreator",
                table: "PayDirecteStockages",
                column: "idUserCreator");

            migrationBuilder.CreateIndex(
                name: "IX_PayDirecteStockages_idstock",
                table: "PayDirecteStockages",
                column: "idstock");

            migrationBuilder.CreateIndex(
                name: "IX_Stock_idUserCreator",
                table: "Stock",
                column: "idUserCreator");

            migrationBuilder.CreateIndex(
                name: "IX_Stockages_idUserCreator",
                table: "Stockages",
                column: "idUserCreator");

            migrationBuilder.CreateIndex(
                name: "IX_Stockages_stockId",
                table: "Stockages",
                column: "stockId");

            migrationBuilder.CreateIndex(
                name: "IX_TypeStockages_idOrdrePayStockage",
                table: "TypeStockages",
                column: "idOrdrePayStockage");

            migrationBuilder.CreateIndex(
                name: "IX_TypeStockages_idUserCreator",
                table: "TypeStockages",
                column: "idUserCreator");

            migrationBuilder.CreateIndex(
                name: "IX_TypeStockages_idstock",
                table: "TypeStockages",
                column: "idstock");

            migrationBuilder.CreateIndex(
                name: "IX_TypeStockages_idstockage",
                table: "TypeStockages",
                column: "idstockage");

            migrationBuilder.CreateIndex(
                name: "IX_TypeStocks_idUserCreator",
                table: "TypeStocks",
                column: "idUserCreator");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BenPayStockageOrdres");

            migrationBuilder.DropTable(
                name: "PayDirecteStockages");

            migrationBuilder.DropTable(
                name: "TypeStockages");

            migrationBuilder.DropTable(
                name: "TypeStocks");

            migrationBuilder.DropTable(
                name: "UniteTypeStocks");

            migrationBuilder.DropTable(
                name: "OrdrePayStockages");

            migrationBuilder.DropTable(
                name: "Stockages");

            migrationBuilder.DropTable(
                name: "Stock");
        }
    }
}
