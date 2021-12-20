using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace WebApplicationPlateforme.Migrations.Dawaa
{
    public partial class MigrationsWomenActiviteAllEtab : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ActiviteCompagnes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true),
                    type = table.Column<string>(nullable: true),
                    dateEnreg = table.Column<string>(nullable: true),
                    nbActivite = table.Column<string>(nullable: true),
                    nbBenef = table.Column<string>(nullable: true),
                    dateDeb = table.Column<string>(nullable: true),
                    datefin = table.Column<string>(nullable: true),
                    attribut1 = table.Column<string>(nullable: true),
                    attribut7 = table.Column<string>(nullable: true),
                    attribut2 = table.Column<string>(nullable: true),
                    attribut3 = table.Column<string>(nullable: true),
                    attribut4 = table.Column<string>(nullable: true),
                    attribut5 = table.Column<string>(nullable: true),
                    attribut6 = table.Column<string>(nullable: true),
                    userNameCreator = table.Column<string>(nullable: true),
                    idUserCreator = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActiviteCompagnes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ActiviteCompagnes_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "activiteDawas",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true),
                    type = table.Column<string>(nullable: true),
                    dateEnreg = table.Column<string>(nullable: true),
                    nbActivite = table.Column<string>(nullable: true),
                    nbBenef = table.Column<string>(nullable: true),
                    dateDeb = table.Column<string>(nullable: true),
                    datefin = table.Column<string>(nullable: true),
                    attribut1 = table.Column<string>(nullable: true),
                    attribut7 = table.Column<string>(nullable: true),
                    attribut2 = table.Column<string>(nullable: true),
                    attribut3 = table.Column<string>(nullable: true),
                    attribut4 = table.Column<string>(nullable: true),
                    attribut5 = table.Column<string>(nullable: true),
                    attribut6 = table.Column<string>(nullable: true),
                    userNameCreator = table.Column<string>(nullable: true),
                    idUserCreator = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_activiteDawas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_activiteDawas_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ActiviteEducations",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true),
                    type = table.Column<string>(nullable: true),
                    dateEnreg = table.Column<string>(nullable: true),
                    nbActivite = table.Column<string>(nullable: true),
                    nbBenef = table.Column<string>(nullable: true),
                    dateDeb = table.Column<string>(nullable: true),
                    datefin = table.Column<string>(nullable: true),
                    attribut1 = table.Column<string>(nullable: true),
                    attribut7 = table.Column<string>(nullable: true),
                    attribut2 = table.Column<string>(nullable: true),
                    attribut3 = table.Column<string>(nullable: true),
                    attribut4 = table.Column<string>(nullable: true),
                    attribut5 = table.Column<string>(nullable: true),
                    attribut6 = table.Column<string>(nullable: true),
                    userNameCreator = table.Column<string>(nullable: true),
                    idUserCreator = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActiviteEducations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ActiviteEducations_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ActiviteeImmigrants",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true),
                    type = table.Column<string>(nullable: true),
                    dateEnreg = table.Column<string>(nullable: true),
                    nbActivite = table.Column<string>(nullable: true),
                    nbBenef = table.Column<string>(nullable: true),
                    dateDeb = table.Column<string>(nullable: true),
                    datefin = table.Column<string>(nullable: true),
                    attribut1 = table.Column<string>(nullable: true),
                    attribut7 = table.Column<string>(nullable: true),
                    attribut2 = table.Column<string>(nullable: true),
                    attribut3 = table.Column<string>(nullable: true),
                    attribut4 = table.Column<string>(nullable: true),
                    attribut5 = table.Column<string>(nullable: true),
                    attribut6 = table.Column<string>(nullable: true),
                    userNameCreator = table.Column<string>(nullable: true),
                    idUserCreator = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActiviteeImmigrants", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ActiviteeImmigrants_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ActivitePrepas",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true),
                    type = table.Column<string>(nullable: true),
                    dateEnreg = table.Column<string>(nullable: true),
                    nbActivite = table.Column<string>(nullable: true),
                    nbBenef = table.Column<string>(nullable: true),
                    dateDeb = table.Column<string>(nullable: true),
                    datefin = table.Column<string>(nullable: true),
                    attribut1 = table.Column<string>(nullable: true),
                    attribut7 = table.Column<string>(nullable: true),
                    attribut2 = table.Column<string>(nullable: true),
                    attribut3 = table.Column<string>(nullable: true),
                    attribut4 = table.Column<string>(nullable: true),
                    attribut5 = table.Column<string>(nullable: true),
                    attribut6 = table.Column<string>(nullable: true),
                    userNameCreator = table.Column<string>(nullable: true),
                    idUserCreator = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActivitePrepas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ActivitePrepas_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "TypeActiviteCompagnes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TypeActiviteCompagnes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TypeActiviteDawas",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TypeActiviteDawas", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TypeActiviteEducation",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TypeActiviteEducation", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TypeActiviteeImmigrants",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TypeActiviteeImmigrants", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TypeActivitePrepas",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TypeActivitePrepas", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ActiviteCompagnes_idUserCreator",
                table: "ActiviteCompagnes",
                column: "idUserCreator");

            migrationBuilder.CreateIndex(
                name: "IX_activiteDawas_idUserCreator",
                table: "activiteDawas",
                column: "idUserCreator");

            migrationBuilder.CreateIndex(
                name: "IX_ActiviteEducations_idUserCreator",
                table: "ActiviteEducations",
                column: "idUserCreator");

            migrationBuilder.CreateIndex(
                name: "IX_ActiviteeImmigrants_idUserCreator",
                table: "ActiviteeImmigrants",
                column: "idUserCreator");

            migrationBuilder.CreateIndex(
                name: "IX_ActivitePrepas_idUserCreator",
                table: "ActivitePrepas",
                column: "idUserCreator");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ActiviteCompagnes");

            migrationBuilder.DropTable(
                name: "activiteDawas");

            migrationBuilder.DropTable(
                name: "ActiviteEducations");

            migrationBuilder.DropTable(
                name: "ActiviteeImmigrants");

            migrationBuilder.DropTable(
                name: "ActivitePrepas");

            migrationBuilder.DropTable(
                name: "TypeActiviteCompagnes");

            migrationBuilder.DropTable(
                name: "TypeActiviteDawas");

            migrationBuilder.DropTable(
                name: "TypeActiviteEducation");

            migrationBuilder.DropTable(
                name: "TypeActiviteeImmigrants");

            migrationBuilder.DropTable(
                name: "TypeActivitePrepas");
        }
    }
}
