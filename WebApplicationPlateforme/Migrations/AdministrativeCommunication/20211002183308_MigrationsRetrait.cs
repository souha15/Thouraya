using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace WebApplicationPlateforme.Migrations.AdministrativeCommunication
{
    public partial class MigrationsRetrait : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            
            migrationBuilder.CreateTable(
                name: "TypeDonsRetraits",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TypeDonsRetraits", x => x.Id);
                });

        

            migrationBuilder.CreateTable(
                name: "RetraitPersonnes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true),
                    tel = table.Column<string>(nullable: true),
                    organisme = table.Column<string>(nullable: true),
                    rib = table.Column<string>(nullable: true),
                    banque = table.Column<string>(nullable: true),
                    idbanque = table.Column<int>(nullable: false),
                    typedate = table.Column<string>(nullable: true),
                    datedebuthij = table.Column<string>(nullable: true),
                    datefinhij = table.Column<string>(nullable: true),
                    datedebutmiledi = table.Column<string>(nullable: true),
                    datefinmiledi = table.Column<string>(nullable: true),
                    nombanque = table.Column<string>(nullable: true),
                    nomben = table.Column<string>(nullable: true),
                    ribben = table.Column<string>(nullable: true),
                    idben = table.Column<int>(nullable: false),
                    typedons = table.Column<string>(nullable: true),
                    prix = table.Column<string>(nullable: true),
                    delegues = table.Column<string>(nullable: true),
                    etat = table.Column<string>(nullable: true),
                    resultat = table.Column<string>(nullable: true),
                    typeRetrait = table.Column<string>(nullable: true),
                    janvier = table.Column<string>(nullable: true),
                    fevrier = table.Column<string>(nullable: true),
                    mars = table.Column<string>(nullable: true),
                    avril = table.Column<string>(nullable: true),
                    mai = table.Column<string>(nullable: true),
                    juin = table.Column<string>(nullable: true),
                    juillet = table.Column<string>(nullable: true),
                    aout = table.Column<string>(nullable: true),
                    septembre = table.Column<string>(nullable: true),
                    octobre = table.Column<string>(nullable: true),
                    novembre = table.Column<string>(nullable: true),
                    decembre = table.Column<string>(nullable: true),
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
                    table.PrimaryKey("PK_RetraitPersonnes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RetraitPersonnes_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });


            migrationBuilder.CreateIndex(
                name: "IX_RetraitPersonnes_idUserCreator",
                table: "RetraitPersonnes",
                column: "idUserCreator");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
          

            
            migrationBuilder.DropTable(
                name: "RetraitPersonnes");

            migrationBuilder.DropTable(
                name: "TypeDonsRetraits");
        }
    }
}
