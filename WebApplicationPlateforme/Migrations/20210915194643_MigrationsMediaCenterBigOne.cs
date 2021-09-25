using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace WebApplicationPlateforme.Migrations
{
    public partial class MigrationsMediaCenterBigOne : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "admidate",
                table: "Interviews",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "admietat",
                table: "Interviews",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "adminid",
                table: "Interviews",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "adminom",
                table: "Interviews",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "dirdate",
                table: "Interviews",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "diretat",
                table: "Interviews",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "dirid",
                table: "Interviews",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "dirnom",
                table: "Interviews",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "etabdate",
                table: "Interviews",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "etabetat",
                table: "Interviews",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "etabid",
                table: "Interviews",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "etabnom",
                table: "Interviews",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Cadeaux",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    occasion = table.Column<string>(nullable: true),
                    autre = table.Column<string>(nullable: true),
                    localisation = table.Column<string>(nullable: true),
                    dateTime = table.Column<string>(nullable: true),
                    PartieHonor = table.Column<string>(nullable: true),
                    nom = table.Column<string>(nullable: true),
                    emploi = table.Column<string>(nullable: true),
                    budget = table.Column<string>(nullable: true),
                    detail = table.Column<string>(nullable: true),
                    dirid = table.Column<string>(nullable: true),
                    dirnom = table.Column<string>(nullable: true),
                    diretat = table.Column<string>(nullable: true),
                    dirdate = table.Column<string>(nullable: true),
                    adminid = table.Column<string>(nullable: true),
                    adminom = table.Column<string>(nullable: true),
                    admietat = table.Column<string>(nullable: true),
                    admidate = table.Column<string>(nullable: true),
                    etabnom = table.Column<string>(nullable: true),
                    etabid = table.Column<string>(nullable: true),
                    etabetat = table.Column<string>(nullable: true),
                    etabdate = table.Column<string>(nullable: true),
                    attribut1 = table.Column<string>(nullable: true),
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
                    table.PrimaryKey("PK_Cadeaux", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Cadeaux_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "DesignImpression",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nomdesign = table.Column<string>(nullable: true),
                    etat = table.Column<string>(nullable: true),
                    iddir = table.Column<string>(nullable: true),
                    nomdir = table.Column<string>(nullable: true),
                    datedir = table.Column<string>(nullable: true),
                    transfertA = table.Column<string>(nullable: true),
                    transfertAdmin = table.Column<string>(nullable: true),
                    transfertEmployee = table.Column<string>(nullable: true),
                    datetransfertAdmin = table.Column<string>(nullable: true),
                    dattransfertEmployee = table.Column<string>(nullable: true),
                    idadminEmp = table.Column<string>(nullable: true),
                    nomadminEmp = table.Column<string>(nullable: true),
                    dateadminEmp = table.Column<string>(nullable: true),
                    etatidadminEmp = table.Column<string>(nullable: true),
                    dateDebadminEmp = table.Column<string>(nullable: true),
                    dateFinadminEmp = table.Column<string>(nullable: true),
                    dateRecepadminEmp = table.Column<string>(nullable: true),
                    dateDoneadminEmp = table.Column<string>(nullable: true),
                    transfertdminEmp = table.Column<string>(nullable: true),
                    idEmp = table.Column<string>(nullable: true),
                    nomEmp = table.Column<string>(nullable: true),
                    dateEmp = table.Column<string>(nullable: true),
                    etatEmp = table.Column<string>(nullable: true),
                    tranfertEmp = table.Column<string>(nullable: true),
                    dateDebutEmp = table.Column<string>(nullable: true),
                    dateFinEmp = table.Column<string>(nullable: true),
                    dateReceptiondateEmp = table.Column<string>(nullable: true),
                    dateTransfertEmp = table.Column<string>(nullable: true),
                    tavailfait = table.Column<string>(nullable: true),
                    adminid = table.Column<string>(nullable: true),
                    adminom = table.Column<string>(nullable: true),
                    admietat = table.Column<string>(nullable: true),
                    admidate = table.Column<string>(nullable: true),
                    etabnom = table.Column<string>(nullable: true),
                    etabid = table.Column<string>(nullable: true),
                    etabetat = table.Column<string>(nullable: true),
                    etabdate = table.Column<string>(nullable: true),
                    attribut1 = table.Column<string>(nullable: true),
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
                    table.PrimaryKey("PK_DesignImpression", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DesignImpression_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Exthechnique",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    type = table.Column<string>(nullable: true),
                    but = table.Column<string>(nullable: true),
                    localisation = table.Column<string>(nullable: true),
                    dateTime = table.Column<string>(nullable: true),
                    budget = table.Column<string>(nullable: true),
                    detail = table.Column<string>(nullable: true),
                    dirid = table.Column<string>(nullable: true),
                    dirnom = table.Column<string>(nullable: true),
                    diretat = table.Column<string>(nullable: true),
                    dirdate = table.Column<string>(nullable: true),
                    adminid = table.Column<string>(nullable: true),
                    adminom = table.Column<string>(nullable: true),
                    admietat = table.Column<string>(nullable: true),
                    admidate = table.Column<string>(nullable: true),
                    etabnom = table.Column<string>(nullable: true),
                    etabid = table.Column<string>(nullable: true),
                    etabetat = table.Column<string>(nullable: true),
                    etabdate = table.Column<string>(nullable: true),
                    attribut1 = table.Column<string>(nullable: true),
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
                    table.PrimaryKey("PK_Exthechnique", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Exthechnique_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ExthechniqueType",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExthechniqueType", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Film",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    typefilm = table.Column<string>(nullable: true),
                    autretype = table.Column<string>(nullable: true),
                    budget = table.Column<string>(nullable: true),
                    duree = table.Column<string>(nullable: true),
                    but = table.Column<string>(nullable: true),
                    url = table.Column<string>(nullable: true),
                    dirid = table.Column<string>(nullable: true),
                    dirnom = table.Column<string>(nullable: true),
                    diretat = table.Column<string>(nullable: true),
                    dirdate = table.Column<string>(nullable: true),
                    adminid = table.Column<string>(nullable: true),
                    adminom = table.Column<string>(nullable: true),
                    admietat = table.Column<string>(nullable: true),
                    admidate = table.Column<string>(nullable: true),
                    etabnom = table.Column<string>(nullable: true),
                    etabid = table.Column<string>(nullable: true),
                    etabetat = table.Column<string>(nullable: true),
                    etabdate = table.Column<string>(nullable: true),
                    attribut1 = table.Column<string>(nullable: true),
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
                    table.PrimaryKey("PK_Film", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Film_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "FilmsType",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FilmsType", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "GuestSoiree",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true),
                    idGuestSoiree = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GuestSoiree", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GuestSoiree_GuestSoiree_idGuestSoiree",
                        column: x => x.idGuestSoiree,
                        principalTable: "GuestSoiree",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Honor",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Honor", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Montages",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    type = table.Column<string>(nullable: true),
                    but = table.Column<string>(nullable: true),
                    scenario = table.Column<string>(nullable: true),
                    commentaireUrl = table.Column<string>(nullable: true),
                    budget = table.Column<string>(nullable: true),
                    detail = table.Column<string>(nullable: true),
                    etat = table.Column<string>(nullable: true),
                    iddir = table.Column<string>(nullable: true),
                    nomdir = table.Column<string>(nullable: true),
                    datedir = table.Column<string>(nullable: true),
                    transfertA = table.Column<string>(nullable: true),
                    transfertAdmin = table.Column<string>(nullable: true),
                    transfertEmployee = table.Column<string>(nullable: true),
                    datetransfertAdmin = table.Column<string>(nullable: true),
                    dattransfertEmployee = table.Column<string>(nullable: true),
                    idadminEmp = table.Column<string>(nullable: true),
                    nomadminEmp = table.Column<string>(nullable: true),
                    dateadminEmp = table.Column<string>(nullable: true),
                    etatidadminEmp = table.Column<string>(nullable: true),
                    dateDebadminEmp = table.Column<string>(nullable: true),
                    dateFinadminEmp = table.Column<string>(nullable: true),
                    dateRecepadminEmp = table.Column<string>(nullable: true),
                    dateDoneadminEmp = table.Column<string>(nullable: true),
                    transfertdminEmp = table.Column<string>(nullable: true),
                    idEmp = table.Column<string>(nullable: true),
                    nomEmp = table.Column<string>(nullable: true),
                    dateEmp = table.Column<string>(nullable: true),
                    etatEmp = table.Column<string>(nullable: true),
                    tranfertEmp = table.Column<string>(nullable: true),
                    dateDebutEmp = table.Column<string>(nullable: true),
                    dateFinEmp = table.Column<string>(nullable: true),
                    dateReceptiondateEmp = table.Column<string>(nullable: true),
                    dateTransfertEmp = table.Column<string>(nullable: true),
                    tavailfait = table.Column<string>(nullable: true),
                    adminid = table.Column<string>(nullable: true),
                    adminom = table.Column<string>(nullable: true),
                    admietat = table.Column<string>(nullable: true),
                    admidate = table.Column<string>(nullable: true),
                    etabnom = table.Column<string>(nullable: true),
                    etabid = table.Column<string>(nullable: true),
                    etabetat = table.Column<string>(nullable: true),
                    etabdate = table.Column<string>(nullable: true),
                    attribut1 = table.Column<string>(nullable: true),
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
                    table.PrimaryKey("PK_Montages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Montages_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Occasion",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Occasion", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "OccasionSoiree",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    type = table.Column<string>(nullable: true),
                    autre = table.Column<string>(nullable: true),
                    localisation = table.Column<string>(nullable: true),
                    dateTime = table.Column<string>(nullable: true),
                    but = table.Column<string>(nullable: true),
                    nb = table.Column<string>(nullable: true),
                    budget = table.Column<string>(nullable: true),
                    detail = table.Column<string>(nullable: true),
                    dirid = table.Column<string>(nullable: true),
                    dirnom = table.Column<string>(nullable: true),
                    diretat = table.Column<string>(nullable: true),
                    dirdate = table.Column<string>(nullable: true),
                    adminid = table.Column<string>(nullable: true),
                    adminom = table.Column<string>(nullable: true),
                    admietat = table.Column<string>(nullable: true),
                    admidate = table.Column<string>(nullable: true),
                    etabnom = table.Column<string>(nullable: true),
                    etabid = table.Column<string>(nullable: true),
                    etabetat = table.Column<string>(nullable: true),
                    etabdate = table.Column<string>(nullable: true),
                    attribut1 = table.Column<string>(nullable: true),
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
                    table.PrimaryKey("PK_OccasionSoiree", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OccasionSoiree_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PartageMedia",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    type = table.Column<string>(nullable: true),
                    autre = table.Column<string>(nullable: true),
                    socialMedia = table.Column<string>(nullable: true),
                    autresoc = table.Column<string>(nullable: true),
                    but = table.Column<string>(nullable: true),
                    benef = table.Column<string>(nullable: true),
                    budget = table.Column<string>(nullable: true),
                    detail = table.Column<string>(nullable: true),
                    path = table.Column<string>(nullable: true),
                    dirid = table.Column<string>(nullable: true),
                    dirnom = table.Column<string>(nullable: true),
                    diretat = table.Column<string>(nullable: true),
                    dirdate = table.Column<string>(nullable: true),
                    adminid = table.Column<string>(nullable: true),
                    adminom = table.Column<string>(nullable: true),
                    admietat = table.Column<string>(nullable: true),
                    admidate = table.Column<string>(nullable: true),
                    etabnom = table.Column<string>(nullable: true),
                    etabid = table.Column<string>(nullable: true),
                    etabetat = table.Column<string>(nullable: true),
                    etabdate = table.Column<string>(nullable: true),
                    attribut1 = table.Column<string>(nullable: true),
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
                    table.PrimaryKey("PK_PartageMedia", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PartageMedia_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PartageMediaType",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PartageMediaType", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ReceptionHeber",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    type = table.Column<string>(nullable: true),
                    autre = table.Column<string>(nullable: true),
                    cadeaux = table.Column<string>(nullable: true),
                    impression = table.Column<string>(nullable: true),
                    budget = table.Column<string>(nullable: true),
                    nb = table.Column<string>(nullable: true),
                    dirid = table.Column<string>(nullable: true),
                    dirnom = table.Column<string>(nullable: true),
                    diretat = table.Column<string>(nullable: true),
                    dirdate = table.Column<string>(nullable: true),
                    adminid = table.Column<string>(nullable: true),
                    adminom = table.Column<string>(nullable: true),
                    admietat = table.Column<string>(nullable: true),
                    admidate = table.Column<string>(nullable: true),
                    etabnom = table.Column<string>(nullable: true),
                    etabid = table.Column<string>(nullable: true),
                    etabetat = table.Column<string>(nullable: true),
                    etabdate = table.Column<string>(nullable: true),
                    attribut1 = table.Column<string>(nullable: true),
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
                    table.PrimaryKey("PK_ReceptionHeber", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ReceptionHeber_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "RecordingArchive",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    type = table.Column<string>(nullable: true),
                    but = table.Column<string>(nullable: true),
                    localisation = table.Column<string>(nullable: true),
                    dateTime = table.Column<string>(nullable: true),
                    budget = table.Column<string>(nullable: true),
                    dirid = table.Column<string>(nullable: true),
                    dirnom = table.Column<string>(nullable: true),
                    diretat = table.Column<string>(nullable: true),
                    dirdate = table.Column<string>(nullable: true),
                    adminid = table.Column<string>(nullable: true),
                    adminom = table.Column<string>(nullable: true),
                    admietat = table.Column<string>(nullable: true),
                    admidate = table.Column<string>(nullable: true),
                    etabnom = table.Column<string>(nullable: true),
                    etabid = table.Column<string>(nullable: true),
                    etabetat = table.Column<string>(nullable: true),
                    etabdate = table.Column<string>(nullable: true),
                    attribut1 = table.Column<string>(nullable: true),
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
                    table.PrimaryKey("PK_RecordingArchive", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RecordingArchive_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Rendonee",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    type = table.Column<string>(nullable: true),
                    autre = table.Column<string>(nullable: true),
                    but = table.Column<string>(nullable: true),
                    nb = table.Column<string>(nullable: true),
                    dateTime = table.Column<string>(nullable: true),
                    localisation = table.Column<string>(nullable: true),
                    budget = table.Column<string>(nullable: true),
                    detail = table.Column<string>(nullable: true),
                    dirid = table.Column<string>(nullable: true),
                    dirnom = table.Column<string>(nullable: true),
                    diretat = table.Column<string>(nullable: true),
                    dirdate = table.Column<string>(nullable: true),
                    adminid = table.Column<string>(nullable: true),
                    adminom = table.Column<string>(nullable: true),
                    admietat = table.Column<string>(nullable: true),
                    admidate = table.Column<string>(nullable: true),
                    etabnom = table.Column<string>(nullable: true),
                    etabid = table.Column<string>(nullable: true),
                    etabetat = table.Column<string>(nullable: true),
                    etabdate = table.Column<string>(nullable: true),
                    attribut1 = table.Column<string>(nullable: true),
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
                    table.PrimaryKey("PK_Rendonee", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Rendonee_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "RendoneType",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RendoneType", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SoireeType",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SoireeType", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TypeRecording",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TypeRecording", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "visite",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    type = table.Column<string>(nullable: true),
                    but = table.Column<string>(nullable: true),
                    nb = table.Column<string>(nullable: true),
                    budget = table.Column<string>(nullable: true),
                    detail = table.Column<string>(nullable: true),
                    dirid = table.Column<string>(nullable: true),
                    dirnom = table.Column<string>(nullable: true),
                    diretat = table.Column<string>(nullable: true),
                    dirdate = table.Column<string>(nullable: true),
                    adminid = table.Column<string>(nullable: true),
                    adminom = table.Column<string>(nullable: true),
                    admietat = table.Column<string>(nullable: true),
                    admidate = table.Column<string>(nullable: true),
                    etabnom = table.Column<string>(nullable: true),
                    etabid = table.Column<string>(nullable: true),
                    etabetat = table.Column<string>(nullable: true),
                    etabdate = table.Column<string>(nullable: true),
                    attribut1 = table.Column<string>(nullable: true),
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
                    table.PrimaryKey("PK_visite", x => x.Id);
                    table.ForeignKey(
                        name: "FK_visite_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "DesignFiles",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    path = table.Column<string>(nullable: true),
                    type = table.Column<string>(nullable: true),
                    idImpression = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DesignFiles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DesignFiles_DesignImpression_idImpression",
                        column: x => x.idImpression,
                        principalTable: "DesignImpression",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TypeImpression",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true),
                    taille = table.Column<string>(nullable: true),
                    quantite = table.Column<string>(nullable: true),
                    budget = table.Column<string>(nullable: true),
                    nbpage = table.Column<string>(nullable: true),
                    longueurtaille = table.Column<string>(nullable: true),
                    placement = table.Column<string>(nullable: true),
                    nbdiplome = table.Column<string>(nullable: true),
                    datediffusion = table.Column<string>(nullable: true),
                    nbBouclier = table.Column<string>(nullable: true),
                    autre = table.Column<string>(nullable: true),
                    typeDesign = table.Column<string>(nullable: true),
                    idImpression = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TypeImpression", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TypeImpression_DesignImpression_idImpression",
                        column: x => x.idImpression,
                        principalTable: "DesignImpression",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FilmsFiles",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    path = table.Column<string>(nullable: true),
                    type = table.Column<string>(nullable: true),
                    idFilm = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FilmsFiles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FilmsFiles_Film_idFilm",
                        column: x => x.idFilm,
                        principalTable: "Film",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "montageFiles",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    path = table.Column<string>(nullable: true),
                    type = table.Column<string>(nullable: true),
                    nom = table.Column<string>(nullable: true),
                    idmontage = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_montageFiles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_montageFiles_Montages_idmontage",
                        column: x => x.idmontage,
                        principalTable: "Montages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PartageFiles",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    path = table.Column<string>(nullable: true),
                    type = table.Column<string>(nullable: true),
                    idPartageMedia = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PartageFiles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PartageFiles_PartageMedia_idPartageMedia",
                        column: x => x.idPartageMedia,
                        principalTable: "PartageMedia",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RecepCadeaux",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true),
                    idReceptionHeber = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RecepCadeaux", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RecepCadeaux_ReceptionHeber_idReceptionHeber",
                        column: x => x.idReceptionHeber,
                        principalTable: "ReceptionHeber",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RecepImpression",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true),
                    idReceptionHeber = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RecepImpression", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RecepImpression_ReceptionHeber_idReceptionHeber",
                        column: x => x.idReceptionHeber,
                        principalTable: "ReceptionHeber",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "offreImpression",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true),
                    idvisite = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_offreImpression", x => x.Id);
                    table.ForeignKey(
                        name: "FK_offreImpression_visite_idvisite",
                        column: x => x.idvisite,
                        principalTable: "visite",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Cadeaux_idUserCreator",
                table: "Cadeaux",
                column: "idUserCreator");

            migrationBuilder.CreateIndex(
                name: "IX_DesignFiles_idImpression",
                table: "DesignFiles",
                column: "idImpression");

            migrationBuilder.CreateIndex(
                name: "IX_DesignImpression_idUserCreator",
                table: "DesignImpression",
                column: "idUserCreator");

            migrationBuilder.CreateIndex(
                name: "IX_Exthechnique_idUserCreator",
                table: "Exthechnique",
                column: "idUserCreator");

            migrationBuilder.CreateIndex(
                name: "IX_Film_idUserCreator",
                table: "Film",
                column: "idUserCreator");

            migrationBuilder.CreateIndex(
                name: "IX_FilmsFiles_idFilm",
                table: "FilmsFiles",
                column: "idFilm");

            migrationBuilder.CreateIndex(
                name: "IX_GuestSoiree_idGuestSoiree",
                table: "GuestSoiree",
                column: "idGuestSoiree");

            migrationBuilder.CreateIndex(
                name: "IX_montageFiles_idmontage",
                table: "montageFiles",
                column: "idmontage");

            migrationBuilder.CreateIndex(
                name: "IX_Montages_idUserCreator",
                table: "Montages",
                column: "idUserCreator");

            migrationBuilder.CreateIndex(
                name: "IX_OccasionSoiree_idUserCreator",
                table: "OccasionSoiree",
                column: "idUserCreator");

            migrationBuilder.CreateIndex(
                name: "IX_offreImpression_idvisite",
                table: "offreImpression",
                column: "idvisite");

            migrationBuilder.CreateIndex(
                name: "IX_PartageFiles_idPartageMedia",
                table: "PartageFiles",
                column: "idPartageMedia");

            migrationBuilder.CreateIndex(
                name: "IX_PartageMedia_idUserCreator",
                table: "PartageMedia",
                column: "idUserCreator");

            migrationBuilder.CreateIndex(
                name: "IX_RecepCadeaux_idReceptionHeber",
                table: "RecepCadeaux",
                column: "idReceptionHeber");

            migrationBuilder.CreateIndex(
                name: "IX_RecepImpression_idReceptionHeber",
                table: "RecepImpression",
                column: "idReceptionHeber");

            migrationBuilder.CreateIndex(
                name: "IX_ReceptionHeber_idUserCreator",
                table: "ReceptionHeber",
                column: "idUserCreator");

            migrationBuilder.CreateIndex(
                name: "IX_RecordingArchive_idUserCreator",
                table: "RecordingArchive",
                column: "idUserCreator");

            migrationBuilder.CreateIndex(
                name: "IX_Rendonee_idUserCreator",
                table: "Rendonee",
                column: "idUserCreator");

            migrationBuilder.CreateIndex(
                name: "IX_TypeImpression_idImpression",
                table: "TypeImpression",
                column: "idImpression");

            migrationBuilder.CreateIndex(
                name: "IX_visite_idUserCreator",
                table: "visite",
                column: "idUserCreator");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Cadeaux");

            migrationBuilder.DropTable(
                name: "DesignFiles");

            migrationBuilder.DropTable(
                name: "Exthechnique");

            migrationBuilder.DropTable(
                name: "ExthechniqueType");

            migrationBuilder.DropTable(
                name: "FilmsFiles");

            migrationBuilder.DropTable(
                name: "FilmsType");

            migrationBuilder.DropTable(
                name: "GuestSoiree");

            migrationBuilder.DropTable(
                name: "Honor");

            migrationBuilder.DropTable(
                name: "montageFiles");

            migrationBuilder.DropTable(
                name: "Occasion");

            migrationBuilder.DropTable(
                name: "OccasionSoiree");

            migrationBuilder.DropTable(
                name: "offreImpression");

            migrationBuilder.DropTable(
                name: "PartageFiles");

            migrationBuilder.DropTable(
                name: "PartageMediaType");

            migrationBuilder.DropTable(
                name: "RecepCadeaux");

            migrationBuilder.DropTable(
                name: "RecepImpression");

            migrationBuilder.DropTable(
                name: "RecordingArchive");

            migrationBuilder.DropTable(
                name: "Rendonee");

            migrationBuilder.DropTable(
                name: "RendoneType");

            migrationBuilder.DropTable(
                name: "SoireeType");

            migrationBuilder.DropTable(
                name: "TypeImpression");

            migrationBuilder.DropTable(
                name: "TypeRecording");

            migrationBuilder.DropTable(
                name: "Film");

            migrationBuilder.DropTable(
                name: "Montages");

            migrationBuilder.DropTable(
                name: "visite");

            migrationBuilder.DropTable(
                name: "PartageMedia");

            migrationBuilder.DropTable(
                name: "ReceptionHeber");

            migrationBuilder.DropTable(
                name: "DesignImpression");

            migrationBuilder.DropColumn(
                name: "admidate",
                table: "Interviews");

            migrationBuilder.DropColumn(
                name: "admietat",
                table: "Interviews");

            migrationBuilder.DropColumn(
                name: "adminid",
                table: "Interviews");

            migrationBuilder.DropColumn(
                name: "adminom",
                table: "Interviews");

            migrationBuilder.DropColumn(
                name: "dirdate",
                table: "Interviews");

            migrationBuilder.DropColumn(
                name: "diretat",
                table: "Interviews");

            migrationBuilder.DropColumn(
                name: "dirid",
                table: "Interviews");

            migrationBuilder.DropColumn(
                name: "dirnom",
                table: "Interviews");

            migrationBuilder.DropColumn(
                name: "etabdate",
                table: "Interviews");

            migrationBuilder.DropColumn(
                name: "etabetat",
                table: "Interviews");

            migrationBuilder.DropColumn(
                name: "etabid",
                table: "Interviews");

            migrationBuilder.DropColumn(
                name: "etabnom",
                table: "Interviews");
        }
    }
}
