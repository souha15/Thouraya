using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace WebApplicationPlateforme.Migrations
{
    public partial class MigrationAD1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
           

            migrationBuilder.CreateTable(
                name: "beneficiaires",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_beneficiaires", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "classeEvs",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_classeEvs", x => x.Id);
                });

           

            migrationBuilder.CreateTable(
                name: "mediasEvs",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_mediasEvs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "outilsEvs",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_outilsEvs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "tacheEvs",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tacheEvs", x => x.Id);
                });

           
            migrationBuilder.CreateTable(
                name: "evenements",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    classe = table.Column<string>(nullable: true),
                    projet = table.Column<string>(nullable: true),
                    typeAct = table.Column<string>(nullable: true),
                    langue = table.Column<string>(nullable: true),
                    nombre = table.Column<string>(nullable: true),
                    beneficiaire = table.Column<string>(nullable: true),
                    tache = table.Column<string>(nullable: true),
                    outils = table.Column<string>(nullable: true),
                    nboutils = table.Column<string>(nullable: true),
                    media = table.Column<string>(nullable: true),
                    lienmedia = table.Column<string>(nullable: true),
                    prixtotdep = table.Column<string>(nullable: true),
                    nbtotdep = table.Column<string>(nullable: true),
                    stat = table.Column<string>(nullable: true),
                    recommandation = table.Column<string>(nullable: true),
                    datetime = table.Column<string>(nullable: true),
                    localisation = table.Column<string>(nullable: true),
                    duree = table.Column<string>(nullable: true),
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
                    table.PrimaryKey("PK_evenements", x => x.Id);
                    table.ForeignKey(
                        name: "FK_evenements_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

           
            migrationBuilder.CreateTable(
                name: "depensesEvs",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    type = table.Column<string>(nullable: true),
                    prix = table.Column<string>(nullable: true),
                    nombre = table.Column<string>(nullable: true),
                    attribut1 = table.Column<int>(nullable: false),
                    attribut2 = table.Column<string>(nullable: true),
                    attribut3 = table.Column<string>(nullable: true),
                    attribut4 = table.Column<int>(nullable: false),
                    idEvent = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_depensesEvs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_depensesEvs_evenements_idEvent",
                        column: x => x.idEvent,
                        principalTable: "evenements",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "participations",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true),
                    tache = table.Column<string>(nullable: true),
                    idevent = table.Column<string>(nullable: true),
                    attribut1 = table.Column<int>(nullable: false),
                    attribut2 = table.Column<string>(nullable: true),
                    attribut3 = table.Column<string>(nullable: true),
                    attribut4 = table.Column<int>(nullable: false),
                    idEvent = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_participations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_participations_evenements_idEvent",
                        column: x => x.idEvent,
                        principalTable: "evenements",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });        

            migrationBuilder.CreateIndex(
                name: "IX_depensesEvs_idEvent",
                table: "depensesEvs",
                column: "idEvent");

          

            migrationBuilder.CreateIndex(
                name: "IX_evenements_idUserCreator",
                table: "evenements",
                column: "idUserCreator");


            migrationBuilder.CreateIndex(
                name: "IX_participations_idEvent",
                table: "participations",
                column: "idEvent");





        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
