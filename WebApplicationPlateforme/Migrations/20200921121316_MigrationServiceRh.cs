using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace WebApplicationPlateforme.Migrations
{
    public partial class MigrationServiceRh : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "creationTravailDemandes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    username = table.Column<string>(nullable: true),
                    titreposte = table.Column<string>(nullable: true),
                    selection = table.Column<string>(nullable: true),
                    tacheTravail = table.Column<string>(nullable: true),
                    competence = table.Column<string>(nullable: true),
                    diplome = table.Column<string>(nullable: true),
                    datedebut = table.Column<string>(nullable: true),
                    iddir = table.Column<string>(nullable: true),
                    nomdir = table.Column<string>(nullable: true),
                    datedir = table.Column<string>(nullable: true),
                    etatdir = table.Column<string>(nullable: true),
                    etat = table.Column<string>(nullable: true),
                    idrh = table.Column<string>(nullable: true),
                    etatrh = table.Column<string>(nullable: true),
                    nomrh = table.Column<string>(nullable: true),
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
                    table.PrimaryKey("PK_creationTravailDemandes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_creationTravailDemandes_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "decisionTwos",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    type = table.Column<string>(nullable: true),
                    decision = table.Column<string>(nullable: true),
                    titre = table.Column<string>(nullable: true),
                    detail = table.Column<string>(nullable: true),
                    org = table.Column<string>(nullable: true),
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
                    table.PrimaryKey("PK_decisionTwos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_decisionTwos_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "demandeAttestationTravails",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    langue = table.Column<string>(nullable: true),
                    org = table.Column<string>(nullable: true),
                    userInfo = table.Column<string>(nullable: true),
                    etat = table.Column<string>(nullable: true),
                    etatrh = table.Column<string>(nullable: true),
                    idrh = table.Column<string>(nullable: true),
                    nomrh = table.Column<string>(nullable: true),
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
                    table.PrimaryKey("PK_demandeAttestationTravails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_demandeAttestationTravails_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "demandeSupHeures",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    date = table.Column<string>(nullable: true),
                    detail = table.Column<string>(nullable: true),
                    nbheure = table.Column<string>(nullable: true),
                    username = table.Column<string>(nullable: true),
                    idusername = table.Column<string>(nullable: true),
                    etat = table.Column<string>(nullable: true),
                    etatdir = table.Column<string>(nullable: true),
                    datedir = table.Column<string>(nullable: true),
                    nomdir = table.Column<string>(nullable: true),
                    iddir = table.Column<string>(nullable: true),
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
                    table.PrimaryKey("PK_demandeSupHeures", x => x.Id);
                    table.ForeignKey(
                        name: "FK_demandeSupHeures_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "filesOrgs",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nomfile = table.Column<string>(nullable: true),
                    dateExpiration = table.Column<string>(nullable: true),
                    path = table.Column<string>(nullable: true),
                    dateenreg = table.Column<string>(nullable: true),
                    userNameCreator = table.Column<string>(nullable: true),
                    idUserCreator = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_filesOrgs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_filesOrgs_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "filesUserCins",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    date = table.Column<string>(nullable: true),
                    userName = table.Column<string>(nullable: true),
                    path = table.Column<string>(nullable: true),
                    attribut1 = table.Column<int>(nullable: false),
                    attribut2 = table.Column<string>(nullable: true),
                    attribut3 = table.Column<string>(nullable: true),
                    attribut4 = table.Column<string>(nullable: true),
                    attribut5 = table.Column<string>(nullable: true),
                    attribut6 = table.Column<string>(nullable: true),
                    dateenreg = table.Column<string>(nullable: true),
                    idUserCreator = table.Column<string>(nullable: true),
                    userNameCreator = table.Column<string>(nullable: true),
                    idUser = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_filesUserCins", x => x.Id);
                    table.ForeignKey(
                        name: "FK_filesUserCins_AspNetUsers_idUser",
                        column: x => x.idUser,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "filesUserContrats",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    date = table.Column<string>(nullable: true),
                    userName = table.Column<string>(nullable: true),
                    path = table.Column<string>(nullable: true),
                    attribut1 = table.Column<int>(nullable: false),
                    attribut2 = table.Column<string>(nullable: true),
                    attribut3 = table.Column<string>(nullable: true),
                    attribut4 = table.Column<string>(nullable: true),
                    attribut5 = table.Column<string>(nullable: true),
                    attribut6 = table.Column<string>(nullable: true),
                    dateenreg = table.Column<string>(nullable: true),
                    idUserCreator = table.Column<string>(nullable: true),
                    userNameCreator = table.Column<string>(nullable: true),
                    idUser = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_filesUserContrats", x => x.Id);
                    table.ForeignKey(
                        name: "FK_filesUserContrats_AspNetUsers_idUser",
                        column: x => x.idUser,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "filesUserPasseports",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    date = table.Column<string>(nullable: true),
                    userName = table.Column<string>(nullable: true),
                    path = table.Column<string>(nullable: true),
                    attribut1 = table.Column<int>(nullable: false),
                    attribut2 = table.Column<string>(nullable: true),
                    attribut3 = table.Column<string>(nullable: true),
                    attribut4 = table.Column<string>(nullable: true),
                    attribut5 = table.Column<string>(nullable: true),
                    attribut6 = table.Column<string>(nullable: true),
                    dateenreg = table.Column<string>(nullable: true),
                    idUserCreator = table.Column<string>(nullable: true),
                    userNameCreator = table.Column<string>(nullable: true),
                    idUser = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_filesUserPasseports", x => x.Id);
                    table.ForeignKey(
                        name: "FK_filesUserPasseports_AspNetUsers_idUser",
                        column: x => x.idUser,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "formations",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    titre = table.Column<string>(nullable: true),
                    specialite = table.Column<string>(nullable: true),
                    org = table.Column<string>(nullable: true),
                    duree = table.Column<string>(nullable: true),
                    datedebut = table.Column<string>(nullable: true),
                    datefin = table.Column<string>(nullable: true),
                    detail = table.Column<string>(nullable: true),
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
                    table.PrimaryKey("PK_formations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_formations_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "maintenanceRequests",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    typePanne = table.Column<string>(nullable: true),
                    panne = table.Column<string>(nullable: true),
                    categoriePanne = table.Column<string>(nullable: true),
                    detail = table.Column<string>(nullable: true),
                    photoPanne = table.Column<string>(nullable: true),
                    idmec = table.Column<string>(nullable: true),
                    nommec = table.Column<string>(nullable: true),
                    etatmec = table.Column<string>(nullable: true),
                    datemec = table.Column<string>(nullable: true),
                    etat = table.Column<string>(nullable: true),
                    tarnsid = table.Column<string>(nullable: true),
                    transnom = table.Column<string>(nullable: true),
                    datetrans = table.Column<string>(nullable: true),
                    etattrans = table.Column<string>(nullable: true),
                    typedemande = table.Column<string>(nullable: true),
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
                    table.PrimaryKey("PK_maintenanceRequests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_maintenanceRequests_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "nomFiles",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_nomFiles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "pannes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_pannes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "receptionEquipements",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    username = table.Column<string>(nullable: true),
                    userId = table.Column<string>(nullable: true),
                    admin = table.Column<string>(nullable: true),
                    daterecep = table.Column<string>(nullable: true),
                    equi = table.Column<string>(nullable: true),
                    quantite = table.Column<string>(nullable: true),
                    typeEqui = table.Column<string>(nullable: true),
                    etatEqui = table.Column<string>(nullable: true),
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
                    table.PrimaryKey("PK_receptionEquipements", x => x.Id);
                    table.ForeignKey(
                        name: "FK_receptionEquipements_AspNetUsers_userId",
                        column: x => x.userId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "specialites",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_specialites", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "supHeures",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    username = table.Column<string>(nullable: true),
                    userId = table.Column<string>(nullable: true),
                    numUser = table.Column<string>(nullable: true),
                    nbHeure = table.Column<string>(nullable: true),
                    date = table.Column<string>(nullable: true),
                    valeur = table.Column<string>(nullable: true),
                    moisPay = table.Column<string>(nullable: true),
                    detail = table.Column<string>(nullable: true),
                    photo = table.Column<string>(nullable: true),
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
                    table.PrimaryKey("PK_supHeures", x => x.Id);
                    table.ForeignKey(
                        name: "FK_supHeures_AspNetUsers_userId",
                        column: x => x.userId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "suppEquipements",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    daterecep = table.Column<string>(nullable: true),
                    etat = table.Column<string>(nullable: true),
                    nomUser = table.Column<string>(nullable: true),
                    detail = table.Column<string>(nullable: true),
                    userId = table.Column<string>(nullable: true),
                    dateEqui = table.Column<string>(nullable: true),
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
                    table.PrimaryKey("PK_suppEquipements", x => x.Id);
                    table.ForeignKey(
                        name: "FK_suppEquipements_AspNetUsers_userId",
                        column: x => x.userId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "transfertInternes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    administration = table.Column<string>(nullable: true),
                    numtransafert = table.Column<string>(nullable: true),
                    employe = table.Column<string>(nullable: true),
                    bureau = table.Column<string>(nullable: true),
                    idadmin = table.Column<string>(nullable: true),
                    nomadmin = table.Column<string>(nullable: true),
                    idemploye = table.Column<string>(nullable: true),
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
                    table.PrimaryKey("PK_transfertInternes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_transfertInternes_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "demandeFormations",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    titre = table.Column<string>(nullable: true),
                    specialite = table.Column<string>(nullable: true),
                    autreSpec = table.Column<string>(nullable: true),
                    org = table.Column<string>(nullable: true),
                    duree = table.Column<string>(nullable: true),
                    prix = table.Column<string>(nullable: true),
                    lien = table.Column<string>(nullable: true),
                    detail = table.Column<string>(nullable: true),
                    etat = table.Column<string>(nullable: true),
                    etatdir = table.Column<string>(nullable: true),
                    iddir = table.Column<string>(nullable: true),
                    nomdir = table.Column<string>(nullable: true),
                    datedir = table.Column<string>(nullable: true),
                    etatrh = table.Column<string>(nullable: true),
                    idrh = table.Column<string>(nullable: true),
                    nomrh = table.Column<string>(nullable: true),
                    daterh = table.Column<string>(nullable: true),
                    idFormation = table.Column<int>(nullable: true),
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
                    table.PrimaryKey("PK_demandeFormations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_demandeFormations_formations_idFormation",
                        column: x => x.idFormation,
                        principalTable: "formations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_demandeFormations_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_creationTravailDemandes_idUserCreator",
                table: "creationTravailDemandes",
                column: "idUserCreator");

            migrationBuilder.CreateIndex(
                name: "IX_decisionTwos_idUserCreator",
                table: "decisionTwos",
                column: "idUserCreator");

            migrationBuilder.CreateIndex(
                name: "IX_demandeAttestationTravails_idUserCreator",
                table: "demandeAttestationTravails",
                column: "idUserCreator");

            migrationBuilder.CreateIndex(
                name: "IX_demandeFormations_idFormation",
                table: "demandeFormations",
                column: "idFormation");

            migrationBuilder.CreateIndex(
                name: "IX_demandeFormations_idUserCreator",
                table: "demandeFormations",
                column: "idUserCreator");

            migrationBuilder.CreateIndex(
                name: "IX_demandeSupHeures_idUserCreator",
                table: "demandeSupHeures",
                column: "idUserCreator");

            migrationBuilder.CreateIndex(
                name: "IX_filesOrgs_idUserCreator",
                table: "filesOrgs",
                column: "idUserCreator");

            migrationBuilder.CreateIndex(
                name: "IX_filesUserCins_idUser",
                table: "filesUserCins",
                column: "idUser");

            migrationBuilder.CreateIndex(
                name: "IX_filesUserContrats_idUser",
                table: "filesUserContrats",
                column: "idUser");

            migrationBuilder.CreateIndex(
                name: "IX_filesUserPasseports_idUser",
                table: "filesUserPasseports",
                column: "idUser");

            migrationBuilder.CreateIndex(
                name: "IX_formations_idUserCreator",
                table: "formations",
                column: "idUserCreator");

            migrationBuilder.CreateIndex(
                name: "IX_maintenanceRequests_idUserCreator",
                table: "maintenanceRequests",
                column: "idUserCreator");

            migrationBuilder.CreateIndex(
                name: "IX_receptionEquipements_userId",
                table: "receptionEquipements",
                column: "userId");

            migrationBuilder.CreateIndex(
                name: "IX_supHeures_userId",
                table: "supHeures",
                column: "userId");

            migrationBuilder.CreateIndex(
                name: "IX_suppEquipements_userId",
                table: "suppEquipements",
                column: "userId");

            migrationBuilder.CreateIndex(
                name: "IX_transfertInternes_idUserCreator",
                table: "transfertInternes",
                column: "idUserCreator");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "creationTravailDemandes");

            migrationBuilder.DropTable(
                name: "decisionTwos");

            migrationBuilder.DropTable(
                name: "demandeAttestationTravails");

            migrationBuilder.DropTable(
                name: "demandeFormations");

            migrationBuilder.DropTable(
                name: "demandeSupHeures");

            migrationBuilder.DropTable(
                name: "filesOrgs");

            migrationBuilder.DropTable(
                name: "filesUserCins");

            migrationBuilder.DropTable(
                name: "filesUserContrats");

            migrationBuilder.DropTable(
                name: "filesUserPasseports");

            migrationBuilder.DropTable(
                name: "maintenanceRequests");

            migrationBuilder.DropTable(
                name: "nomFiles");

            migrationBuilder.DropTable(
                name: "pannes");

            migrationBuilder.DropTable(
                name: "receptionEquipements");

            migrationBuilder.DropTable(
                name: "specialites");

            migrationBuilder.DropTable(
                name: "supHeures");

            migrationBuilder.DropTable(
                name: "suppEquipements");

            migrationBuilder.DropTable(
                name: "transfertInternes");

            migrationBuilder.DropTable(
                name: "formations");
        }
    }
}
