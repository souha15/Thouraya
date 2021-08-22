using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace WebApplicationPlateforme.Migrations.ApplicationDb
{
    public partial class MigrationTaskEdit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "administrations",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Nom = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    NomDirecteur = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_administrations", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "agenceImmob",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true),
                    nomResponsable = table.Column<string>(nullable: true),
                    tel = table.Column<string>(nullable: true),
                    fax = table.Column<string>(nullable: true),
                    phoneNumber = table.Column<string>(nullable: true),
                    adresse = table.Column<string>(nullable: true),
                    ville = table.Column<string>(nullable: true),
                    dateenreg = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_agenceImmob", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Name = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "departements",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Nom = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    NomDirecteur = table.Column<string>(nullable: true),
                    NomAdministration = table.Column<string>(nullable: true),
                    IdAdministration = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_departements", x => x.Id);
                    table.ForeignKey(
                        name: "FK_departements_administrations_IdAdministration",
                        column: x => x.IdAdministration,
                        principalTable: "administrations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RoleId = table.Column<string>(nullable: false),
                    ClaimType = table.Column<string>(nullable: true),
                    ClaimValue = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ApplicationUserModel",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    UserName = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    Password = table.Column<string>(nullable: true),
                    registreCivil = table.Column<string>(nullable: true),
                    FullNameEnglish = table.Column<string>(nullable: true),
                    FullName = table.Column<string>(nullable: true),
                    adresse = table.Column<string>(nullable: true),
                    PhoneNumber = table.Column<string>(nullable: true),
                    tel = table.Column<string>(nullable: true),
                    statut = table.Column<string>(nullable: true),
                    nationalite = table.Column<string>(nullable: true),
                    religion = table.Column<string>(nullable: true),
                    sexe = table.Column<string>(nullable: true),
                    dateNaissance = table.Column<string>(nullable: true),
                    lieuNaissance = table.Column<string>(nullable: true),
                    passeport = table.Column<string>(nullable: true),
                    typeSang = table.Column<string>(nullable: true),
                    num = table.Column<string>(nullable: true),
                    emploi = table.Column<string>(nullable: true),
                    rang = table.Column<string>(nullable: true),
                    typeEmploi = table.Column<string>(nullable: true),
                    nomAdministration = table.Column<string>(nullable: true),
                    nomDepartement = table.Column<string>(nullable: true),
                    unite = table.Column<string>(nullable: true),
                    qualification = table.Column<string>(nullable: true),
                    typeQualification = table.Column<string>(nullable: true),
                    faculteEcole = table.Column<string>(nullable: true),
                    dateQualification = table.Column<string>(nullable: true),
                    specialite = table.Column<string>(nullable: true),
                    paysetude = table.Column<string>(nullable: true),
                    mention = table.Column<string>(nullable: true),
                    classement = table.Column<string>(nullable: true),
                    degre = table.Column<string>(nullable: true),
                    salaire = table.Column<string>(nullable: true),
                    indemnite = table.Column<string>(nullable: true),
                    autreIndemnite = table.Column<string>(nullable: true),
                    heureArrive = table.Column<string>(nullable: true),
                    heureDepart = table.Column<string>(nullable: true),
                    directeur = table.Column<string>(nullable: true),
                    position = table.Column<string>(nullable: true),
                    attribut1 = table.Column<string>(nullable: true),
                    attribut2 = table.Column<string>(nullable: true),
                    attribut3 = table.Column<string>(nullable: true),
                    attribut4 = table.Column<string>(nullable: true),
                    attribut5 = table.Column<string>(nullable: true),
                    attribut6 = table.Column<string>(nullable: true),
                    photo = table.Column<string>(nullable: true),
                    soldeconge = table.Column<string>(nullable: true),
                    daterectrutement = table.Column<string>(nullable: true),
                    etatuser = table.Column<string>(nullable: true),
                    dateenreg = table.Column<string>(nullable: true),
                    userNameCreator = table.Column<string>(nullable: true),
                    idUserCreator = table.Column<string>(nullable: true),
                    Roles = table.Column<string[]>(nullable: true),
                    idAdministration = table.Column<int>(nullable: true),
                    idDepartement = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApplicationUserModel", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ApplicationUserModel_administrations_idAdministration",
                        column: x => x.idAdministration,
                        principalTable: "administrations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ApplicationUserModel_departements_idDepartement",
                        column: x => x.idDepartement,
                        principalTable: "departements",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    UserName = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(maxLength: 256, nullable: true),
                    Email = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(nullable: false),
                    PasswordHash = table.Column<string>(nullable: true),
                    SecurityStamp = table.Column<string>(nullable: true),
                    ConcurrencyStamp = table.Column<string>(nullable: true),
                    PhoneNumber = table.Column<string>(nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(nullable: false),
                    TwoFactorEnabled = table.Column<bool>(nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(nullable: true),
                    LockoutEnabled = table.Column<bool>(nullable: false),
                    AccessFailedCount = table.Column<int>(nullable: false),
                    Discriminator = table.Column<string>(nullable: false),
                    registreCivil = table.Column<string>(nullable: true),
                    FullNameEnglish = table.Column<string>(nullable: true),
                    FullName = table.Column<string>(nullable: true),
                    adresse = table.Column<string>(nullable: true),
                    tel = table.Column<string>(nullable: true),
                    statut = table.Column<string>(nullable: true),
                    nationalite = table.Column<string>(nullable: true),
                    religion = table.Column<string>(nullable: true),
                    sexe = table.Column<string>(nullable: true),
                    dateNaissance = table.Column<string>(nullable: true),
                    lieuNaissance = table.Column<string>(nullable: true),
                    passeport = table.Column<string>(nullable: true),
                    typeSang = table.Column<string>(nullable: true),
                    num = table.Column<string>(nullable: true),
                    emploi = table.Column<string>(nullable: true),
                    rang = table.Column<string>(nullable: true),
                    typeEmploi = table.Column<string>(nullable: true),
                    nomAdministration = table.Column<string>(nullable: true),
                    nomDepartement = table.Column<string>(nullable: true),
                    unite = table.Column<string>(nullable: true),
                    qualification = table.Column<string>(nullable: true),
                    typeQualification = table.Column<string>(nullable: true),
                    faculteEcole = table.Column<string>(nullable: true),
                    dateQualification = table.Column<string>(nullable: true),
                    specialite = table.Column<string>(nullable: true),
                    paysetude = table.Column<string>(nullable: true),
                    mention = table.Column<string>(nullable: true),
                    classement = table.Column<string>(nullable: true),
                    degre = table.Column<string>(nullable: true),
                    salaire = table.Column<string>(nullable: true),
                    indemnite = table.Column<string>(nullable: true),
                    autreIndemnite = table.Column<string>(nullable: true),
                    heureArrive = table.Column<string>(nullable: true),
                    heureDepart = table.Column<string>(nullable: true),
                    directeur = table.Column<string>(nullable: true),
                    position = table.Column<string>(nullable: true),
                    attribut1 = table.Column<string>(nullable: true),
                    attribut2 = table.Column<string>(nullable: true),
                    attribut3 = table.Column<string>(nullable: true),
                    attribut4 = table.Column<string>(nullable: true),
                    attribut5 = table.Column<string>(nullable: true),
                    attribut6 = table.Column<string>(nullable: true),
                    photo = table.Column<string>(nullable: true),
                    soldeconge = table.Column<string>(nullable: true),
                    daterectrutement = table.Column<string>(nullable: true),
                    etatuser = table.Column<string>(nullable: true),
                    dateenreg = table.Column<string>(nullable: true),
                    userNameCreator = table.Column<string>(nullable: true),
                    idUserCreator = table.Column<string>(nullable: true),
                    idAdministration = table.Column<int>(nullable: true),
                    idDepartement = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUsers_administrations_idAdministration",
                        column: x => x.idAdministration,
                        principalTable: "administrations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AspNetUsers_departements_idDepartement",
                        column: x => x.idDepartement,
                        principalTable: "departements",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<string>(nullable: false),
                    ClaimType = table.Column<string>(nullable: true),
                    ClaimValue = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(nullable: false),
                    ProviderKey = table.Column<string>(nullable: false),
                    ProviderDisplayName = table.Column<string>(nullable: true),
                    UserId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(nullable: false),
                    RoleId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(nullable: false),
                    LoginProvider = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    Value = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "dotation",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true),
                    date = table.Column<string>(nullable: true),
                    type = table.Column<string>(nullable: true),
                    etat = table.Column<string>(nullable: true),
                    adresse = table.Column<string>(nullable: true),
                    nbunite = table.Column<string>(nullable: true),
                    compteurElec = table.Column<string>(nullable: true),
                    numCompteur = table.Column<string>(nullable: true),
                    officeImmobiler = table.Column<string>(nullable: true),
                    comptable = table.Column<string>(nullable: true),
                    attribut1 = table.Column<int>(nullable: false),
                    attribut2 = table.Column<string>(nullable: true),
                    attribut3 = table.Column<string>(nullable: true),
                    attribue4 = table.Column<string>(nullable: true),
                    dateenreg = table.Column<string>(nullable: true),
                    CreatorName = table.Column<string>(nullable: true),
                    idUserCreator = table.Column<string>(nullable: true),
                    idAgence = table.Column<int>(nullable: false),
                    AgenceImmobId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_dotation", x => x.Id);
                    table.ForeignKey(
                        name: "FK_dotation_agenceImmob_AgenceImmobId",
                        column: x => x.AgenceImmobId,
                        principalTable: "agenceImmob",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_dotation_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "locataire",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(nullable: true),
                    cin = table.Column<string>(nullable: true),
                    profession = table.Column<string>(nullable: true),
                    adresse = table.Column<string>(nullable: true),
                    nationnalite = table.Column<string>(nullable: true),
                    tel = table.Column<string>(nullable: true),
                    attribut1 = table.Column<int>(nullable: false),
                    attribut2 = table.Column<string>(nullable: true),
                    attribut3 = table.Column<string>(nullable: true),
                    attribue4 = table.Column<string>(nullable: true),
                    dateenreg = table.Column<string>(nullable: true),
                    CreatorName = table.Column<string>(nullable: true),
                    idUserCreator = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_locataire", x => x.Id);
                    table.ForeignKey(
                        name: "FK_locataire_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "tache",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    date = table.Column<string>(nullable: true),
                    priorite = table.Column<string>(nullable: true),
                    tacheNom = table.Column<string>(nullable: true),
                    description = table.Column<string>(nullable: true),
                    delai = table.Column<string>(nullable: true),
                    atous = table.Column<string>(nullable: true),
                    createur = table.Column<string>(nullable: true),
                    etat = table.Column<string>(nullable: true),
                    type = table.Column<string>(nullable: true),
                    sousProjet = table.Column<string>(nullable: true),
                    dateTime = table.Column<DateTime>(nullable: false),
                    rating = table.Column<string>(nullable: true),
                    etatnumber = table.Column<string>(nullable: true),
                    dateenreg = table.Column<string>(nullable: true),
                    retard = table.Column<string>(nullable: true),
                    affectedId = table.Column<string>(nullable: true),
                    dateFin = table.Column<string>(nullable: true),
                    attribut1 = table.Column<string>(nullable: true),
                    attribut2 = table.Column<string>(nullable: true),
                    attribut3 = table.Column<string>(nullable: true),
                    attribut4 = table.Column<int>(nullable: false),
                    creatorName = table.Column<string>(nullable: true),
                    idUserCreator = table.Column<string>(nullable: true),
                    affectedName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tache", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tache_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "unite",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    numRevenus = table.Column<string>(nullable: true),
                    type = table.Column<string>(nullable: true),
                    etat = table.Column<string>(nullable: true),
                    chambre = table.Column<string>(nullable: true),
                    wc = table.Column<string>(nullable: true),
                    cuisine = table.Column<string>(nullable: true),
                    bureau = table.Column<string>(nullable: true),
                    prix = table.Column<string>(nullable: true),
                    salon = table.Column<string>(nullable: true),
                    compteurElc = table.Column<string>(nullable: true),
                    compteureau = table.Column<string>(nullable: true),
                    attribut1 = table.Column<int>(nullable: false),
                    attribut2 = table.Column<string>(nullable: true),
                    attribut3 = table.Column<string>(nullable: true),
                    attribue4 = table.Column<string>(nullable: true),
                    dotationName = table.Column<string>(nullable: true),
                    idDotation = table.Column<int>(nullable: false),
                    dateenreg = table.Column<string>(nullable: true),
                    CreatorName = table.Column<string>(nullable: true),
                    idUserCreator = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_unite", x => x.Id);
                    table.ForeignKey(
                        name: "FK_unite_dotation_idDotation",
                        column: x => x.idDotation,
                        principalTable: "dotation",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_unite_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "commentaires",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    TextCommentaire = table.Column<string>(nullable: true),
                    dateTime = table.Column<DateTime>(nullable: false),
                    NomUser = table.Column<string>(nullable: true),
                    IdTache = table.Column<int>(nullable: true),
                    IdUser = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_commentaires", x => x.Id);
                    table.ForeignKey(
                        name: "FK_commentaires_tache_IdTache",
                        column: x => x.IdTache,
                        principalTable: "tache",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_commentaires_AspNetUsers_IdUser",
                        column: x => x.IdUser,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "evaluations",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Description = table.Column<string>(nullable: true),
                    dateTime = table.Column<DateTime>(nullable: false),
                    Rating = table.Column<string>(nullable: true),
                    NomUserEvaluated = table.Column<string>(nullable: true),
                    IdTache = table.Column<int>(nullable: false),
                    IdUserEvaluating = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_evaluations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_evaluations_tache_IdTache",
                        column: x => x.IdTache,
                        principalTable: "tache",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_evaluations_AspNetUsers_IdUserEvaluating",
                        column: x => x.IdUserEvaluating,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "piecesJointes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Path = table.Column<string>(nullable: true),
                    dateTime = table.Column<DateTime>(nullable: false),
                    NomUser = table.Column<string>(nullable: true),
                    IdTache = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_piecesJointes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_piecesJointes_tache_IdTache",
                        column: x => x.IdTache,
                        principalTable: "tache",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "locationUnite",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    numcontrat = table.Column<string>(nullable: true),
                    prixlocationmois = table.Column<string>(nullable: true),
                    datedebutcontrat = table.Column<string>(nullable: true),
                    delaicontrat = table.Column<string>(nullable: true),
                    moisdelocation = table.Column<string>(nullable: true),
                    locataireName = table.Column<string>(nullable: true),
                    idlocataire = table.Column<int>(nullable: false),
                    idunite = table.Column<int>(nullable: false),
                    iddotation = table.Column<int>(nullable: false),
                    nomunite = table.Column<string>(nullable: true),
                    nomdotation = table.Column<string>(nullable: true),
                    CreatorName = table.Column<string>(nullable: true),
                    idUserCreator = table.Column<string>(nullable: true),
                    dateenreg = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_locationUnite", x => x.Id);
                    table.ForeignKey(
                        name: "FK_locationUnite_AspNetUsers_idUserCreator",
                        column: x => x.idUserCreator,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_locationUnite_dotation_iddotation",
                        column: x => x.iddotation,
                        principalTable: "dotation",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_locationUnite_locataire_idlocataire",
                        column: x => x.idlocataire,
                        principalTable: "locataire",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_locationUnite_unite_idunite",
                        column: x => x.idunite,
                        principalTable: "unite",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "contratLocation",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    path = table.Column<string>(nullable: true),
                    type = table.Column<string>(nullable: true),
                    date = table.Column<string>(nullable: true),
                    idlocation = table.Column<int>(nullable: false),
                    locationUniteId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_contratLocation", x => x.Id);
                    table.ForeignKey(
                        name: "FK_contratLocation_locationUnite_locationUniteId",
                        column: x => x.locationUniteId,
                        principalTable: "locationUnite",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ApplicationUserModel_idAdministration",
                table: "ApplicationUserModel",
                column: "idAdministration");

            migrationBuilder.CreateIndex(
                name: "IX_ApplicationUserModel_idDepartement",
                table: "ApplicationUserModel",
                column: "idDepartement");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_idAdministration",
                table: "AspNetUsers",
                column: "idAdministration");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_idDepartement",
                table: "AspNetUsers",
                column: "idDepartement");

            migrationBuilder.CreateIndex(
                name: "IX_commentaires_IdTache",
                table: "commentaires",
                column: "IdTache");

            migrationBuilder.CreateIndex(
                name: "IX_commentaires_IdUser",
                table: "commentaires",
                column: "IdUser");

            migrationBuilder.CreateIndex(
                name: "IX_contratLocation_locationUniteId",
                table: "contratLocation",
                column: "locationUniteId");

            migrationBuilder.CreateIndex(
                name: "IX_departements_IdAdministration",
                table: "departements",
                column: "IdAdministration");

            migrationBuilder.CreateIndex(
                name: "IX_dotation_AgenceImmobId",
                table: "dotation",
                column: "AgenceImmobId");

            migrationBuilder.CreateIndex(
                name: "IX_dotation_idUserCreator",
                table: "dotation",
                column: "idUserCreator");

            migrationBuilder.CreateIndex(
                name: "IX_evaluations_IdTache",
                table: "evaluations",
                column: "IdTache");

            migrationBuilder.CreateIndex(
                name: "IX_evaluations_IdUserEvaluating",
                table: "evaluations",
                column: "IdUserEvaluating");

            migrationBuilder.CreateIndex(
                name: "IX_locataire_idUserCreator",
                table: "locataire",
                column: "idUserCreator");

            migrationBuilder.CreateIndex(
                name: "IX_locationUnite_idUserCreator",
                table: "locationUnite",
                column: "idUserCreator");

            migrationBuilder.CreateIndex(
                name: "IX_locationUnite_iddotation",
                table: "locationUnite",
                column: "iddotation");

            migrationBuilder.CreateIndex(
                name: "IX_locationUnite_idlocataire",
                table: "locationUnite",
                column: "idlocataire");

            migrationBuilder.CreateIndex(
                name: "IX_locationUnite_idunite",
                table: "locationUnite",
                column: "idunite");

            migrationBuilder.CreateIndex(
                name: "IX_piecesJointes_IdTache",
                table: "piecesJointes",
                column: "IdTache");

            migrationBuilder.CreateIndex(
                name: "IX_tache_idUserCreator",
                table: "tache",
                column: "idUserCreator");

            migrationBuilder.CreateIndex(
                name: "IX_unite_idDotation",
                table: "unite",
                column: "idDotation");

            migrationBuilder.CreateIndex(
                name: "IX_unite_idUserCreator",
                table: "unite",
                column: "idUserCreator");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ApplicationUserModel");

            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "commentaires");

            migrationBuilder.DropTable(
                name: "contratLocation");

            migrationBuilder.DropTable(
                name: "evaluations");

            migrationBuilder.DropTable(
                name: "piecesJointes");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "locationUnite");

            migrationBuilder.DropTable(
                name: "tache");

            migrationBuilder.DropTable(
                name: "locataire");

            migrationBuilder.DropTable(
                name: "unite");

            migrationBuilder.DropTable(
                name: "dotation");

            migrationBuilder.DropTable(
                name: "agenceImmob");

            migrationBuilder.DropTable(
                name: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "departements");

            migrationBuilder.DropTable(
                name: "administrations");
        }
    }
}
