using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

using WebApplicationPlateforme.Model.NotificationSettings;
using WebApplicationPlateforme.Model.Pointage;
using WebApplicationPlateforme.Model.RetaraitPart;

namespace WebApplicationPlateforme.Data
{
    public class AdministrativeCommunicationContext : IdentityDbContext
    {
        public AdministrativeCommunicationContext(DbContextOptions<AdministrativeCommunicationContext> options) : base(options) { }

        public DbSet<RetraitPersonne> RetraitPersonnes { get; set; }
        public DbSet<TypeDonsRetrait> TypeDonsRetraits { get; set; }
        public DbSet<NotifText> NotifTexts { get; set; }
        public DbSet<AddresseMac> AddresseMacs { get; set; }

    }
}
