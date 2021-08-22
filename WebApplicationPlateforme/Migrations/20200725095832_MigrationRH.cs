using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace WebApplicationPlateforme.Migrations
{
    public partial class MigrationRH : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "dateenreg",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "daterectrutement",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "etatuser",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "idUserCreator",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "soldeconge",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "userNameCreator",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "conges",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    datedebut = table.Column<string>(nullable: true),
                    datefin = table.Column<string>(nullable: true),
                    duree = table.Column<string>(nullable: true),
                    tel = table.Column<string>(nullable: true),
                    type = table.Column<string>(nullable: true),
                    adr = table.Column<string>(nullable: true),
                    idremplaçant = table.Column<string>(nullable: true),
                    nomremplacant = table.Column<string>(nullable: true),
                    etat = table.Column<string>(nullable: true),
                    etatd = table.Column<string>(nullable: true),
                    etatrh = table.Column<string>(nullable: true),
                    directeurid = table.Column<string>(nullable: true),
                    directeurnom = table.Column<string>(nullable: true),
                    rhid = table.Column<string>(nullable: true),
                    rhnom = table.Column<string>(nullable: true),
                    dated = table.Column<string>(nullable: true),
                    daterh = table.Column<string>(nullable: true),
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
                    table.PrimaryKey("PK_conges", x => x.Id);
                    table.ForeignKey(
                        name: "FK_conges_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "editingUsers",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    date = table.Column<string>(nullable: true),
                    type = table.Column<string>(nullable: true),
                    action = table.Column<string>(nullable: true),
                    userNameCreator = table.Column<string>(nullable: true),
                    idUserCreator = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_editingUsers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_editingUsers_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "permissions",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nbheure = table.Column<string>(nullable: true),
                    etatdir = table.Column<string>(nullable: true),
                    date = table.Column<string>(nullable: true),
                    datedir = table.Column<string>(nullable: true),
                    iddir = table.Column<string>(nullable: true),
                    nomdir = table.Column<string>(nullable: true),
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
                    table.PrimaryKey("PK_permissions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_permissions_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "recrutements",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    type = table.Column<string>(nullable: true),
                    datedebut = table.Column<string>(nullable: true),
                    datefin = table.Column<string>(nullable: true),
                    dure = table.Column<string>(nullable: true),
                    organisme = table.Column<string>(nullable: true),
                    idremplacant = table.Column<string>(nullable: true),
                    nomremplacant = table.Column<string>(nullable: true),
                    tache = table.Column<string>(nullable: true),
                    etatdir = table.Column<string>(nullable: true),
                    etatrh = table.Column<string>(nullable: true),
                    iddir = table.Column<string>(nullable: true),
                    idrh = table.Column<string>(nullable: true),
                    nomrh = table.Column<string>(nullable: true),
                    nomdir = table.Column<string>(nullable: true),
                    daterh = table.Column<string>(nullable: true),
                    dated = table.Column<string>(nullable: true),
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
                    table.PrimaryKey("PK_recrutements", x => x.Id);
                    table.ForeignKey(
                        name: "FK_recrutements_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "piecesJointesRcs",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    path = table.Column<string>(nullable: true),
                    type = table.Column<string>(nullable: true),
                    date = table.Column<string>(nullable: true),
                    CreatorName = table.Column<string>(nullable: true),
                    datenereg = table.Column<string>(nullable: true),
                    IdUserCreator = table.Column<string>(nullable: true),
                    Idrec = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_piecesJointesRcs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_piecesJointesRcs_AspNetUsers_IdUserCreator",
                        column: x => x.IdUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_piecesJointesRcs_recrutements_Idrec",
                        column: x => x.Idrec,
                        principalTable: "recrutements",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_conges_idUserCreator",
                table: "conges",
                column: "idUserCreator");

            migrationBuilder.CreateIndex(
                name: "IX_editingUsers_idUserCreator",
                table: "editingUsers",
                column: "idUserCreator");

            migrationBuilder.CreateIndex(
                name: "IX_permissions_idUserCreator",
                table: "permissions",
                column: "idUserCreator");

            migrationBuilder.CreateIndex(
                name: "IX_piecesJointesRcs_IdUserCreator",
                table: "piecesJointesRcs",
                column: "IdUserCreator");

            migrationBuilder.CreateIndex(
                name: "IX_piecesJointesRcs_Idrec",
                table: "piecesJointesRcs",
                column: "Idrec");

            migrationBuilder.CreateIndex(
                name: "IX_recrutements_idUserCreator",
                table: "recrutements",
                column: "idUserCreator");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "conges");

            migrationBuilder.DropTable(
                name: "editingUsers");

            migrationBuilder.DropTable(
                name: "permissions");

            migrationBuilder.DropTable(
                name: "piecesJointesRcs");

            migrationBuilder.DropTable(
                name: "recrutements");

            migrationBuilder.DropColumn(
                name: "dateenreg",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "daterectrutement",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "etatuser",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "idUserCreator",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "soldeconge",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "userNameCreator",
                table: "AspNetUsers");
        }
    }
}
