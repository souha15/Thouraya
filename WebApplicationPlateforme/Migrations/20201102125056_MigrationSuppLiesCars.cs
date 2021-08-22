using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace WebApplicationPlateforme.Migrations
{
    public partial class MigrationSuppLiesCars : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "dateachat",
                table: "voitures");

            migrationBuilder.DropColumn(
                name: "dateassurance",
                table: "voitures");

            migrationBuilder.DropColumn(
                name: "datepermis",
                table: "voitures");

            migrationBuilder.DropColumn(
                name: "dateservice",
                table: "voitures");

            migrationBuilder.DropColumn(
                name: "nbcle",
                table: "voitures");

            migrationBuilder.DropColumn(
                name: "nbplace",
                table: "voitures");

            migrationBuilder.DropColumn(
                name: "org",
                table: "voitures");

            migrationBuilder.DropColumn(
                name: "taxerv",
                table: "voitures");

            migrationBuilder.DropColumn(
                name: "type",
                table: "voitures");

            migrationBuilder.AddColumn<string>(
                name: "datefinassurance",
                table: "voitures",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "datefinforme",
                table: "voitures",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "genre",
                table: "voitures",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "idrecepteur",
                table: "voitures",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "marque",
                table: "voitures",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "model",
                table: "voitures",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "num",
                table: "voitures",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "recepeteur",
                table: "voitures",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "filesVoitures",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    path = table.Column<string>(nullable: true),
                    type = table.Column<string>(nullable: true),
                    idVoiture = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_filesVoitures", x => x.Id);
                    table.ForeignKey(
                        name: "FK_filesVoitures_voitures_idVoiture",
                        column: x => x.idVoiture,
                        principalTable: "voitures",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "supplies",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    num = table.Column<string>(nullable: true),
                    categ = table.Column<string>(nullable: true),
                    classe = table.Column<string>(nullable: true),
                    quanitite = table.Column<string>(nullable: true),
                    etat = table.Column<string>(nullable: true),
                    datereception = table.Column<string>(nullable: true),
                    recepteur = table.Column<string>(nullable: true),
                    idrecepteur = table.Column<string>(nullable: true),
                    attribut1 = table.Column<int>(nullable: false),
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
                    table.PrimaryKey("PK_supplies", x => x.Id);
                    table.ForeignKey(
                        name: "FK_supplies_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "filesSupplies",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    path = table.Column<string>(nullable: true),
                    type = table.Column<string>(nullable: true),
                    idSupplie = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_filesSupplies", x => x.Id);
                    table.ForeignKey(
                        name: "FK_filesSupplies_supplies_idSupplie",
                        column: x => x.idSupplie,
                        principalTable: "supplies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_filesSupplies_idSupplie",
                table: "filesSupplies",
                column: "idSupplie");

            migrationBuilder.CreateIndex(
                name: "IX_filesVoitures_idVoiture",
                table: "filesVoitures",
                column: "idVoiture");

            migrationBuilder.CreateIndex(
                name: "IX_supplies_idUserCreator",
                table: "supplies",
                column: "idUserCreator");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "filesSupplies");

            migrationBuilder.DropTable(
                name: "filesVoitures");

            migrationBuilder.DropTable(
                name: "supplies");

            migrationBuilder.DropColumn(
                name: "datefinassurance",
                table: "voitures");

            migrationBuilder.DropColumn(
                name: "datefinforme",
                table: "voitures");

            migrationBuilder.DropColumn(
                name: "genre",
                table: "voitures");

            migrationBuilder.DropColumn(
                name: "idrecepteur",
                table: "voitures");

            migrationBuilder.DropColumn(
                name: "marque",
                table: "voitures");

            migrationBuilder.DropColumn(
                name: "model",
                table: "voitures");

            migrationBuilder.DropColumn(
                name: "num",
                table: "voitures");

            migrationBuilder.DropColumn(
                name: "recepeteur",
                table: "voitures");

            migrationBuilder.AddColumn<string>(
                name: "dateachat",
                table: "voitures",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "dateassurance",
                table: "voitures",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "datepermis",
                table: "voitures",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "dateservice",
                table: "voitures",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "nbcle",
                table: "voitures",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "nbplace",
                table: "voitures",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "org",
                table: "voitures",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "taxerv",
                table: "voitures",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "type",
                table: "voitures",
                type: "text",
                nullable: true);
        }
    }
}
