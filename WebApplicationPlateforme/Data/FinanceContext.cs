using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Model.Dotations;
using WebApplicationPlateforme.Model.Global;
using WebApplicationPlateforme.Model.Taches;
using WebApplicationPlateforme.Model.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.AdministrativeCommunication;
using WebApplicationPlateforme.Model.AdministrativeCommunication.Interne;
using WebApplicationPlateforme.Model.AdministrativeCommunication.Emise;
using WebApplicationPlateforme.Model.AdministrativeCommunication.Decision;
using WebApplicationPlateforme.Model.Evenements;
using WebApplicationPlateforme.Model.Ressource_Humaines;
using WebApplicationPlateforme.Model.News;
using WebApplicationPlateforme.Model.voitures;
using WebApplicationPlateforme.Model.Finance;
using WebApplicationPlateforme.Model.Evenement2;
using WebApplicationPlateforme.Model.Dons;
using WebApplicationPlateforme.Model.ServiceRh;
using WebApplicationPlateforme.Model.Projets;
using WebApplicationPlateforme.Model.FinancePartTwo.Comptes;
using WebApplicationPlateforme.Model.Supplies;
using WebApplicationPlateforme.Model.FinancePartTwo.Cheques;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Identity;
using WebApplicationPlateforme.Model.Salaire;
using WebApplicationPlateforme.Model.User_Services;
using WebApplicationPlateforme.Model.Maintenance;
using WebApplicationPlateforme.Model.Msg_Interne;
using WebApplicationPlateforme.Model.Ticket;
using WebApplicationPlateforme.Model.OrgPart;
using WebApplicationPlateforme.Model.gestion_beneficiaire;
using WebApplicationPlateforme.Model.Gestion_de_stock;
using WebApplicationPlateforme.Model.gestion_de_stock;
using WebApplicationPlateforme.Model.Orphelin;
using WebApplicationPlateforme.Model.Pointage;
using WebApplicationPlateforme.Model.Parrainage;
using WebApplicationPlateforme.Model.ProjetOrg;
using WebApplicationPlateforme.Model.Media_Center.InterviewPart;
using WebApplicationPlateforme.Model.MediaCenter.CadeauxSouvenirs;
using WebApplicationPlateforme.Model.MediaCenter.ExtensionTechnique;
using WebApplicationPlateforme.Model.MediaCenter.FilmPart;
using WebApplicationPlateforme.Model.MediaCenter.ImpressionDesign;
using WebApplicationPlateforme.Model.MediaCenter.Montage;
using WebApplicationPlateforme.Model.MediaCenter.PartageMedia;
using WebApplicationPlateforme.Model.MediaCenter.ReceptionHebergement;
using WebApplicationPlateforme.Model.MediaCenter.RecordingArchive;
using WebApplicationPlateforme.Model.MediaCenter.Rondonnee;
using WebApplicationPlateforme.Model.MediaCenter.SoireeOccasion;
using WebApplicationPlateforme.Model.MediaCenter.Visite;
using WebApplicationPlateforme.Model.NouveauMusulman;

namespace WebApplicationPlateforme.Data
{
    public class FinanceContext : IdentityDbContext
    {
        public FinanceContext(DbContextOptions<FinanceContext> options) : base(options) { }
        public DbSet<dotation> dotations { get; set; }
        public DbSet<unite> unites { get; set; }
        public DbSet<locataire> locataires { get; set; }
        public DbSet<revenus> revenus { get; set; }
        public DbSet<piecesjointesLocataire> piecesjointesLocataires { get; set; }
        public DbSet<piecesjointesRevenus> PiecesjointesRevenus { get; set; }
        public DbSet<depotRevenus> depotRevenus { get; set; }
        public DbSet<servicesRevenus> servicesRevenus { get; set; }
        public DbSet<typeDotation> typeDotations { get; set; }
        public DbSet<typeUnite> typeUnites { get; set; }
        public DbSet<etatDotation> etatDotations { get; set; }
        public DbSet<etatUnite> etatUnites { get; set; }
        public DbSet<agenceImmob> agenceImmobs { get; set; }
        public DbSet<locationUnite> locationUnites { get; set; }

        public DbSet<Privileges> privileges { get; set; }
        public DbSet<contratLocation> contratLocations { get; set; }
        public DbSet<LesServices> lesServices { get; set; }
        public DbSet<Proprietaire> proprietaires { get; set; }
        public DbSet<Organisme> organismes { get; set; }
        public DbSet<Liaison> liaisons { get; set; }
        public DbSet<LiaisonI> liaisonsI { get; set; }
        //public DbSet<LiaisonD> liaisonsD { get; set; }
        public DbSet<LiaisonE> liaisonsE { get; set; }

        public DbSet<Transaction> transactions { get; set; }
        //public DbSet<Decision> decisions { get; set; }
        public DbSet<TransactionI> transactionsI { get; set; }
        public DbSet<TransactionEmise> transactionsEmise { get; set; }

        public DbSet<PiecesJointesAffected> piecesJointesAffecteds { get; set; }

        public DbSet<PiecesJointesTr> piecesJointesTrs { get; set; }
        //public DbSet<PiecesJointesD> piecesJointesDs { get; set; }
        public DbSet<PiecesJointesI> piecesJointesIs { get; set; }
        public DbSet<PiecesJointeE> piecesJointeEs { get; set; }

        public DbSet<TrAffectation> trAffectations { get; set; }
        public DbSet<TeAffectation> TeAffectations { get; set; }
        public DbSet<TiAffectation> tiAffectations { get; set; }
        // public DbSet<TdAffectation> tdAffectations { get; set; }

        public DbSet<Receptioncs> receptioncs { get; set; }
        // public DbSet<ReceptionD> receptionDs { get; set; }
        public DbSet<ReceptionE> receptionEs { get; set; }
        public DbSet<ReceptionI> receptionIs { get; set; }


        //Event
        public DbSet<Evenement> evenements { get; set; }
        public DbSet<Participation> participations { get; set; }
        public DbSet<DepensesEv> depensesEvs { get; set; }
        public DbSet<Beneficiaire> beneficiaires { get; set; }
        public DbSet<TacheEv> tacheEvs { get; set; }
        public DbSet<OutilsEv> outilsEvs { get; set; }
        public DbSet<MediasEv> mediasEvs { get; set; }
        public DbSet<ClasseEv> classeEvs { get; set; }
        public DbSet<PiecesJointesEvents> piecesJointesEvents { get; set; }
        public DbSet<ActivityEv> activityEvs { get; set; }


        //Ressource Humaine 

        public DbSet<Conge> conges { get; set; }
        public DbSet<Recrutement> recrutements { get; set; }
        public DbSet<PiecesJointesRc> piecesJointesRcs { get; set; }
        public DbSet<Permission> permissions { get; set; }
        public DbSet<editingUser> editingUsers { get; set; }
        public DbSet<Equipement> equipements { get; set; }
        public DbSet<typeEquipement> typeEquipements { get; set; }
        public DbSet<nomEquipement> nomEquipements { get; set; }

        public DbSet<DemandeTicket> demandeTickets { get; set; }
        public DbSet<DemandeSalariale> demandeSalariales { get; set; }
        public DbSet<PiecesJointesDt> PiecesJointesDts { get; set; }
        public DbSet<SoldeConge> soldeConges { get; set; }
        public DbSet<Newsi> newsi { get; set; }
        public DbSet<voiture> voitures { get; set; }

        public DbSet<voitureRepair> voitureRepairs { get; set; }
        public DbSet<PrivelegesRequests> privelegesRequests { get; set; }

        /*Finance */
        public DbSet<PiecesJointesCf> piecesJointesCfs { get; set; }
        public DbSet<PiecesJointesf> piecesJointesfs { get; set; }
        public DbSet<CreanceFinanciere> creanceFinancieres { get; set; }
        public DbSet<Facture> factures { get; set; }
        public DbSet<DepensesExploitation> depensesExploitations { get; set; }
        public DbSet<TypeBeneficiaire> typeBeneficiaires { get; set; }
        public DbSet<TypeDepense> typeDepenses { get; set; }
        public DbSet<BrancheOne> brancheOnes { get; set; }

        public DbSet<BrancheTwo> brancheTwos { get; set; }
        public DbSet<TypeFacture> typeFactures { get; set; }
        public DbSet<ProjetProg> projetProgs { get; set; }
        public DbSet<DemandeAvance> demandeAvances { get; set; }
        public DbSet<EvenementTwo> evenementTwos { get; set; }
        public DbSet<PiecesJointesEvTzo> piecesJointesEvTzos { get; set; }
        public DbSet<ChequeReception> chequeReceptions { get; set; }
        public DbSet<PiecesJointesReceptionC> piecesJointesReceptionCs { get; set; }

        public DbSet<OrganismeVoiture> organismeVoitures { get; set; }
        public DbSet<TypeVoiture> typeVoitures { get; set; }
        public DbSet<NotifCars> notifCars { get; set; }

        //Dons
        public DbSet<Doneur> doneurs { get; set; }
        public DbSet<RecueDons> recueDons { get; set; }
        public DbSet<ProjetDons> projetDons { get; set; }
        public DbSet<PayemeentReception> payemeentReceptions { get; set; }

        //Service rh 

        public DbSet<Formation> formations { get; set; }
        public DbSet<Specialite> specialites { get; set; }
        public DbSet<DemandeFormation> demandeFormations { get; set; }
        public DbSet<DecisionTwo> decisionTwos { get; set; }
        public DbSet<FilesDecisionTwoes> filesDecisionTwoes { get; set; }
        public DbSet<TransfertInterne> transfertInternes { get; set; }
        public DbSet<DemandeAttestationTravail> demandeAttestationTravails { get; set; }
        public DbSet<MaintenanceRequest> maintenanceRequests { get; set; }
        public DbSet<Panne> pannes { get; set; }
        public DbSet<CreationTravailDemande> creationTravailDemandes { get; set; }
        public DbSet<SupHeure> supHeures { get; set; }
        public DbSet<DemandeSupHeure> demandeSupHeures { get; set; }
        public DbSet<FilesUserContrat> filesUserContrats { get; set; }
        public DbSet<FilesUserCin> filesUserCins { get; set; }
        public DbSet<FilesUserPasseport> filesUserPasseports { get; set; }
        public DbSet<ReceptionEquipement> receptionEquipements { get; set; }
        public DbSet<FilesOrg> filesOrgs { get; set; }
        public DbSet<NomFiles> nomFiles { get; set; }
        public DbSet<SuppEquipement> suppEquipements { get; set; }
        public DbSet<newFormationRequest> newFormationRequests { get; set; }

        /** Edit for Abo Areesh**/

        public DbSet<BeneficiaireEvent> beneficiaireEvents { get; set; }
        public DbSet<DepenseEvent> depenseEvents { get; set; }
        public DbSet<OutilsEvent> outilsEvents { get; set; }


        /****** Projet ****/
        public DbSet<ClassProjet> classProjets { get; set; }
        public DbSet<OrganismeSupp> organismeSupps { get; set; }
        public DbSet<Projet> Projets { get; set; }
        public DbSet<PayementProjet> payementProjets { get; set; }
        public DbSet<PayementActivite> payementActivites { get; set; }
        public DbSet<PayementType> payementTypes { get; set; }
        public DbSet<FilesProjet> filesProjets { get; set; }
        public DbSet<RapportProjet> rapportProjets { get; set; }
        public DbSet<Compte> comptes { get; set; }
        public DbSet<ButProjet> butProjets { get; set; }


        /*******  Finance 2 *******/
        public DbSet<EtatCompte> etatComptes { get; set; }
        public DbSet<EtatListCompte> etatListComptes { get; set; }
        public DbSet<FilesEtatCompte> filesEtatComptes { get; set; }
        public DbSet<ServiceBanque> serviceBanques { get; set; }

        /******** Equipement et Voitures ****** */

        public DbSet<Supplie> supplies { get; set; }
        public DbSet<FilesSupplie> filesSupplies { get; set; }
        public DbSet<FilesVoiture> filesVoitures { get; set; }
        public DbSet<GestionSupplies> gestionSupplies { get; set; }

        /******************** Cheque ********************/

        public DbSet<ChequeC> chequeCs { get; set; }
        public DbSet<PayCheque> payCheques { get; set; }
        public DbSet<FilesPayCheque> filesPays { get; set; }
        public DbSet<FilesCheque> filesCheques { get; set; }
        public DbSet<DemandePayCheque> demandePayCheques { get; set; }
        public DbSet<ArticlePayCheque> articlePayCheques { get; set; }
        public DbSet<ChequeClasse> ChequeClasses { get; set; }

        /******Salaire ***** */
        public DbSet<SalaireD> salaires { get; set; }

        /*************** Services User ******/
        public DbSet<Plaint> plaints { get; set; }
        public DbSet<FilesPlaint> filesPlaints { get; set; }
        public DbSet<Demission> demissions { get; set; }
        public DbSet<PermissionU> permissionUs { get; set; }
        public DbSet<Residence> residences { get; set; }
        public DbSet<langueEv> langueEvs { get; set; }


        /****** Localion ******/

        public DbSet<locataireDot> locataireDot { get; set; }
        public DbSet<PiecesJointesDotLoc> PiecesJointesDotLoc { get; set; }


        /********** Task 2 ***/


        public DbSet<ProcessTache> processTaches { get; set; }
        public DbSet<Notiftache> notiftaches { get; set; }

        /**********************/

        public DbSet<EntrerDansIslam> entrerDansIslams { get; set; }


        /****** Maintenance ********/

        public DbSet<Ticket> tickets { get; set; }
        public DbSet<FilesTickets> filesTickets { get; set; }


        /*********** Demande Pay Cheque ***************/

        public DbSet<DemPayCheqNotif> demPayCheqNotifs { get; set; }
        public DbSet<ActionOnDemPayCheq> actionOnDemPayCheqs { get; set; }
        /********************************************/

        public DbSet<SoldeCongeEmployee> soldeCongeEmployees { get; set; }

        /***********  Msg Interne   ***************/

        public DbSet<MsgInterne> msgInternes { get; set; }
        public DbSet<NotifMsgInterne> notifMsgInternes { get; set; }
        public DbSet<FilesMsgInterne> filesMsgInternes { get; set; }


        /********************** Ticket 2 *************/
        public DbSet<Ticket2> Ticket2s { get; set; }
        public DbSet<NotifTicket2> NotifTickets { get; set; }
        public DbSet<FilesTicket2> FilesTickets { get; set; }

        /********************* OrgPart *****************/
        public DbSet<OrgParti> orgPartis { get; set; }

        /******************* Gestion Beneficiaire **************/

        public DbSet<CompteBen> compteBens { get; set; }
        public DbSet<Famille> familles { get; set; }
        public DbSet<FilesBen> filesBens { get; set; }
        public DbSet<Residance> residances { get; set; }
        public DbSet<TypeBen> typeBens { get; set; }
        public DbSet<TypeMaison> typeMaisons { get; set; }
        public DbSet<RevenusBen> revenusBens { get; set; }
        public DbSet<TypeRevBen> typeRevBens { get; set; }
        public DbSet<TypeDroit> typeDroits { get; set; }
        public DbSet<GestionBenenficiaire> gestionBenenficiaires { get; set; }


        /************* Gestion de stock *************/

        public DbSet<Stock> Stock { get; set; }
        public DbSet<TypeStock> TypeStocks { get; set; }
        public DbSet<UniteTypeStock> UniteTypeStocks { get; set; }
        public DbSet<Stockage> Stockages { get; set; }
        public DbSet<PayDirecteStockage> PayDirecteStockages { get; set; }
        public DbSet<OrdrePayStockage> OrdrePayStockages { get; set; }
        public DbSet<TypeStockage> TypeStockages { get; set; }
        public DbSet<BenPayStockageOrdre> BenPayStockageOrdres { get; set; }

        /************ Gestion Orphelin ************/
        public DbSet<Orphelin> Orphelins { get; set; }
        public DbSet<FilesOrphelin> FilesOrphelins { get; set; }
        public DbSet<LivesWith> LivesWiths { get; set; }
        public DbSet<EducationOrphelin> EducationOrphelins { get; set; }
        public DbSet<Talent> Talents { get; set; }
        public DbSet<TalentOrphelin> TalentOrphelins { get; set; }
        public DbSet<Matieres> Matieres { get; set; }
        public DbSet<MatieresOrphelin> MatieresOrphelins { get; set; }
        public DbSet<SanteOrphelin> SanteOrphelins { get; set; }
        public DbSet<Maladie> Maladies { get; set; }
        public DbSet<TypeSubvention> TypeSubventions { get; set; }
        public DbSet<OrganismeOrphelin> OrganismeOrphelins { get; set; }
        public DbSet<TypeDotationOrphelin> TypeDotationOrphelins { get; set; }
        public DbSet<ParenteOrphelin> ParenteOrphelins { get; set; }

        public DbSet<TuteurOrphelin> TuteurOrphelins {get;set;}
        public DbSet<MereOrphelin> MereOrphelins { get;set;}
        public DbSet<PereOrphelin> PereOrphelins { get;set;}
        public DbSet<SubventionOrphelin> SubventionOrphelins { get;set;}
        public DbSet<DotationOrphelin> DotationOrphelins { get;set;}
        public DbSet<FinanceOrphelin> FinanceOrphelins { get;set;}
        public DbSet<PsyOrphelin> PsyOrphelin { get;set;}


        /******************Pointage ******************/
        public DbSet<PointageUser> PointageUsers { get; set; }

        /*********** Parrainage ************************/

        public DbSet <Parriner> Parriners { get; set; }
        public DbSet <TuteurParrainage> TuteurParrainages { get; set; }
        public DbSet <SoldeTuteur> SoldeTuteurs { get; set; }
    
        /******** Projet Org **************/

        public DbSet<ProjetOrg> ProjetOrgs { get; set; }
        public DbSet<FilesProjetOrg> FilesProjetOrg { get; set; }
        public DbSet<ProjetClient> ProjetClient { get; set; }
        public DbSet<ProjetOuvrier> ProjetOuvrier { get; set; }

        /**************Pointage Via Empreinte */
        public DbSet<PointageEmpreinte> PointageEmpreintes { get; set; }

        /**** Assistance Service Rh *****/
        public DbSet<Assistance> assistances { get; set; }
        /********** Centre Media **********/
        public DbSet<Interview> Interviews { get; set; }
        public DbSet<TypeInterview> TypeInterviews { get; set; }
        public DbSet<Cadeaux> Cadeaux { get; set; }
        public DbSet<Occasion> Occasion { get; set; }
        public DbSet<Honor> Honor { get; set; }
        public DbSet<Exthechnique> Exthechnique { get; set; }
        public DbSet<ExthechniqueType> ExthechniqueType { get; set; }
        
        public DbSet<Film> Film { get; set; }
        public DbSet<FilmsType> FilmsType { get; set; }
        public DbSet<FilmsFiles> FilmsFiles { get; set; }
        public DbSet<DesignImpression> DesignImpression { get; set; }

        public DbSet<DesignFiles> DesignFiles { get; set; }
        public DbSet<TypeImpression> TypeImpression { get; set; }
  
        public DbSet<montage>Montages{ get; set; }
        public DbSet<montageFiles> montageFiles { get; set; }
        public DbSet<PartageMedia> PartageMedia { get; set; }
        public DbSet<PartageMediaType> PartageMediaType { get; set; }
        public DbSet<PartageFiles> PartageFiles { get; set; }
        public DbSet<ReceptionHeber> ReceptionHeber { get; set; }
        public DbSet<RecepImpression> RecepImpression { get; set; }
  
        public DbSet<RecepCadeaux> RecepCadeaux { get; set; }
        public DbSet<RecordingArchive> RecordingArchive { get; set; }
        public DbSet<TypeRecording> TypeRecording { get; set; }
        public DbSet<Rendonee> Rendonee { get; set; }
        public DbSet<RendoneType> RendoneType { get; set; }
        public DbSet<SoireeType> SoireeType { get; set; }
        public DbSet<GuestSoiree> GuestSoiree { get; set; }
        public DbSet<OccasionSoiree> OccasionSoiree { get; set; }
        public DbSet<visite> visite { get; set; }
        public DbSet<offreImpression> offreImpression { get; set; }

        /** Nouveau Musulman Part **/  
        public DbSet <musulman> musulmans { get; set; }
        public DbSet <filesmusulman> filesmusulmans { get; set; }

        
}
}
