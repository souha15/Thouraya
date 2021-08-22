

using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.Dotations;
using WebApplicationPlateforme.Model.Global;
using WebApplicationPlateforme.Model.Taches;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
     public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
        public DbSet<Tache> tache { get; set; }
        public DbSet<Commentaire> commentaires { get; set; }
        public DbSet<ApplicationUser> applicationUsers { get; set; }
        public DbSet<Evaluation> evaluations { get; set; }
        public DbSet<PiecesJointes> piecesJointes { get; set; }
        public DbSet<Departement> departements { get; set; }
        public DbSet<Administration> administrations { get; set; }
      
        public string WebRootPath { get; internal set; }
        public DbSet<WebApplicationPlateforme.Model.User.ApplicationUserModel> ApplicationUserModel { get; set; }
        public DbSet<WebApplicationPlateforme.Model.Dotations.locationUnite> locationUnite { get; set; }
        public DbSet<WebApplicationPlateforme.Model.Dotations.contratLocation> contratLocation { get; set; }

       
        /* public DbSet<BureauImmob> bureauImmobs { get; set; }
         public DbSet<Location> locations { get; set; }*/
    }
}
