using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.ActivitePart;
using WebApplicationPlateforme.Model.AdministrativeCommunication;
using WebApplicationPlateforme.Model.ChangerRib;
using WebApplicationPlateforme.Model.ConfigSystemShowing;
using WebApplicationPlateforme.Model.MediaCenter.PartageMedia;
using WebApplicationPlateforme.Model.MediaCenter.Visite;
using WebApplicationPlateforme.Model.MusulumanFemme;
using WebApplicationPlateforme.Model.NotificationSettings;
using WebApplicationPlateforme.Model.Pointage;
using WebApplicationPlateforme.Model.Ressource_Humaines;

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
        public DbSet<Activitee> Activitee { get; set; }

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
    }
}
