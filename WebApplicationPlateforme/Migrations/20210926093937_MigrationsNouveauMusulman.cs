using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace WebApplicationPlateforme.Migrations
{
    public partial class MigrationsNouveauMusulman : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
        
            migrationBuilder.CreateTable(
                name: "musulmans",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    numdos = table.Column<string>(nullable: true),
                    predicateur = table.Column<string>(nullable: true),
                    prevnom = table.Column<string>(nullable: true),
                    nvnom = table.Column<string>(nullable: true),
                    engnom = table.Column<string>(nullable: true),
                    datehij = table.Column<string>(nullable: true),
                    datemil = table.Column<string>(nullable: true),
                    jours = table.Column<string>(nullable: true),
                    nat = table.Column<string>(nullable: true),
                    langue = table.Column<string>(nullable: true),
                    residence = table.Column<string>(nullable: true),
                    dateresidence = table.Column<string>(nullable: true),
                    sourceres = table.Column<string>(nullable: true),
                    religion = table.Column<string>(nullable: true),
                    numpass = table.Column<string>(nullable: true),
                    datepass = table.Column<string>(nullable: true),
                    sourcepass = table.Column<string>(nullable: true),
                    datenais = table.Column<string>(nullable: true),
                    travail = table.Column<string>(nullable: true),
                    cite = table.Column<string>(nullable: true),
                    adr = table.Column<string>(nullable: true),
                    telmus = table.Column<string>(nullable: true),
                    urlsm = table.Column<string>(nullable: true),
                    garantnom = table.Column<string>(nullable: true),
                    garanttype = table.Column<string>(nullable: true),
                    registre = table.Column<string>(nullable: true),
                    telgarant = table.Column<string>(nullable: true),
                    file = table.Column<string>(nullable: true),
                    pub = table.Column<string>(nullable: true),
                    scene = table.Column<string>(nullable: true),
                    test = table.Column<string>(nullable: true),
                    cadeauxtest = table.Column<string>(nullable: true),
                    recep = table.Column<string>(nullable: true),
                    change = table.Column<string>(nullable: true),
                    soiree = table.Column<string>(nullable: true),
                    circonsion = table.Column<string>(nullable: true),
                    omra = table.Column<string>(nullable: true),
                    city = table.Column<string>(nullable: true),
                    walking = table.Column<string>(nullable: true),
                    haj = table.Column<string>(nullable: true),
                    depart = table.Column<string>(nullable: true),
                    chatdep = table.Column<string>(nullable: true),
                    req = table.Column<string>(nullable: true),
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
                    table.PrimaryKey("PK_musulmans", x => x.Id);
                    table.ForeignKey(
                        name: "FK_musulmans_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "filesmusulmans",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    path = table.Column<string>(nullable: true),
                    type = table.Column<string>(nullable: true),
                    idmusulman = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_filesmusulmans", x => x.Id);
                    table.ForeignKey(
                        name: "FK_filesmusulmans_musulmans_idmusulman",
                        column: x => x.idmusulman,
                        principalTable: "musulmans",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_filesmusulmans_idmusulman",
                table: "filesmusulmans",
                column: "idmusulman");

            migrationBuilder.CreateIndex(
                name: "IX_musulmans_idUserCreator",
                table: "musulmans",
                column: "idUserCreator");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "filesmusulmans");

            migrationBuilder.DropTable(
                name: "musulmans");

           
        }
    }
}
