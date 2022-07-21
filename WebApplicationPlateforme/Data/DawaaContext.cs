using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.AchatVoitures;
using WebApplicationPlateforme.Model.ActivitePart;
using WebApplicationPlateforme.Model.AdministrativeCommunication;
using WebApplicationPlateforme.Model.Allmaintenance;
using WebApplicationPlateforme.Model.ChangerRib;
using WebApplicationPlateforme.Model.ConfigSystemShowing;
using WebApplicationPlateforme.Model.Decision;
using WebApplicationPlateforme.Model.gestion_de_stock;
using WebApplicationPlateforme.Model.GestionDestTickets;
using WebApplicationPlateforme.Model.MediaCenter.PartageMedia;
using WebApplicationPlateforme.Model.MediaCenter.Visite;
using WebApplicationPlateforme.Model.MusulumanFemme;
using WebApplicationPlateforme.Model.NotificationSettings;
using WebApplicationPlateforme.Model.NotifSignalR;
using WebApplicationPlateforme.Model.Pointage;
using WebApplicationPlateforme.Model.Ressource_Humaines;
using WebApplicationPlateforme.Model.TechnicalDemands;
using WebApplicationPlateforme.Model.VenteServices;
using WebApplicationPlateforme.Model.ServiceRh;
using WebApplicationPlateforme.Model.FinancePartTwo.Cheques;

namespace WebApplicationPlateforme.Data
{
    public class DawaaContext : IdentityDbContext
    {
        public DawaaContext(DbContextOptions<DawaaContext> options) : base(options) { }
       public DbSet<NotifText> NotifTexts { get; set; }
        public DbSet<AddresseMac> AddresseMacs { get; set; }
        public DbSet<visite> visite { get; set; }
        public DbSet<offreImpression> offreImpression { get; set; }
        public DbSet<PartageMediaType> PartageMediaType { get; set; }

        /****Activity ***/

        public DbSet<TypeActivitee> TypeActivitee { get; set; }
        public DbSet<Activiteee> Activitee { get; set; }
  

        /**** Type Transaction **/
        public DbSet<TypeTransaction> TypeTransaction { get; set; }


        /**** Type Recrutement **/
        public DbSet<TypeRecrutement> TypeRecrutement { get; set; }

        /** Musulman femme */
        public DbSet<musulmanWoman> musulmanWoman { get; set; }
        public DbSet<filesmusulmanWoman> filesmusulmanWoman { get; set; }

        /** Changer Rib **/
        public DbSet<DemChangeRib> DemChangeRib { get; set; }
        public DbSet<FilesDemChangeRib> FilesDemChangeRib { get; set; }

        /** System From Config **/

        public DbSet<ConfigSystemFront> ConfigSystemFront { get; set; }

        /** Decision **/ 

        public DbSet<DecisionDecisif> DecisionDecisifs { get; set; }
        public DbSet<DecissionCommun> DecissionCommuns { get; set; }


        /*** Gestion Tickets**/

        public DbSet<GestionTickets> GestionTickets { get; set; }

        public DbSet<CommentsTickets> CommentsTickets { get; set; }
        public DbSet<CommentsTicketFiles> CommentsTicketFiles { get; set; }
        public DbSet<FilesGestionTickets> FilesGestionTickets { get; set; }

        /***Stockage **/
        public DbSet<RetourStock> RetourStock { get; set; }
        /******** Dem Technical ******/
        public DbSet <TypeTechDem> TypeTechDems { get; set; }
        public DbSet<DemTech> demTeches { get; set; }

        /***** Service Vente **/ 

        public DbSet <TypeServiceVente> TypeServiceVentes { get; set; }
        public DbSet <ServiceVente> ServiceVentes { get; set; }
        public DbSet <OffreVente> OffreVentes { get; set; }

        /**Activite For Women */ 

        public DbSet <ActiviteeWomen> ActiviteeWomens { get; set; }
        public DbSet <TypeActiviteeForWomen> TypeActiviteeForWomens { get; set; }
        public DbSet <ActiviteCompagne> ActiviteCompagnes { get; set; }
        public DbSet <TypeActiviteCompagne> TypeActiviteCompagnes { get; set; }
        public DbSet <ActiviteEducation> ActiviteEducations { get; set; }
        public DbSet <TypeActiviteEducation> TypeActiviteEducation { get; set; }
        public DbSet<ActivitePrepa> ActivitePrepas { get; set; }
        public DbSet<TypeActivitePrepa> TypeActivitePrepas { get; set; }
        public DbSet<ActiviteeImmigrant> ActiviteeImmigrants { get; set; }
        public DbSet<TypeActiviteeImmigrant> TypeActiviteeImmigrants { get; set; }
        public DbSet<ActiviteDawa> ActiviteDawas { get; set; }
        public DbSet<TypeActiviteDawa> TypeActiviteDawas { get; set; }

        public DbSet<ActiviteDawaElec> ActiviteDawaElecs { get; set; }
        public DbSet<TypeActiviteDawaaElec> TypeActiviteDawaaElecs { get; set; }

        /********* Voiture Achat ***/

        public DbSet <DemandeVoiture> DemandeVoitures { get; set; }


        /********* Maintenance All *********/

        public DbSet<allMaintenanceType> AllMaintenanceTypes { get; set; }
        public DbSet<AllTypeOfMaintenance> AllTypeOfMaintenance { get; set; }

        /**Notification System **/

        public DbSet<Notif> Notifs { get; set; }


        /**** Conges Files **/

        public DbSet<CongeFiles> CongeFiles { get; set; }
        public DbSet<soldeCongesInfosUpdate> soldeCongesInfosUpdates { get; set; }

        /*** Activite Details **/
        public DbSet<TypeDetailsActivite> TypeDetailsActivites { get; set; }
        public DbSet<ActiviteDetails> ActiviteDetails { get; set; }
        public DbSet<demandePayChequesReceive> demandePayChequesReceive { get; set; }

    }
}
