using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.SideMenuSettings;

namespace WebApplicationPlateforme.Data
{
    public class MainContext:IdentityDbContext
    {
        public MainContext(DbContextOptions<MainContext> options) : base(options) { }

        public DbSet<SideMenuMain> SideMenuMain { get; set; }
        public DbSet<SideMenuUnderMain> SideMenuUnderMain { get; set; }
        public DbSet<ModuleSideMenu> ModuleSideMenu { get; set; }

    }
}
