using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.AutomaticNotification;

namespace WebApplicationPlateforme.Data
{
    public class NotificationContext: IdentityDbContext
    {
        public NotificationContext(DbContextOptions<NotificationContext> options) : base(options) { }
        public DbSet<AutomaticNotif> AutomaticNotifs { get; set; }
        public DbSet<connection> Connections { get; set; }
    }
}
