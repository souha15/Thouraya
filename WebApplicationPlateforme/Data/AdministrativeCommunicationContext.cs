using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.AdministrativeCommunication;

namespace WebApplicationPlateforme.Data
{
    public class AdministrativeCommunicationContext : IdentityDbContext
    {
        public AdministrativeCommunicationContext(DbContextOptions<AdministrativeCommunicationContext> options) : base(options) { }

     
    }
}
