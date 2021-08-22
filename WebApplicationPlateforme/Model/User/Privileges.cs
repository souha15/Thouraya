using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplicationPlateforme.Model.User
{
    public class Privileges
    {
        public string Id { get; set; }
        public int settings { get; set; }
        public int addTask { get; set; }
        public int Rapport { get; set; }
        public int commAd { get; set; }
        public int appel { get; set; }
        public int serviceEmployee { get; set; }
        public int salaire { get; set; }
        public int performance { get; set; }


        [ForeignKey("ApplicationUser")]
        public string userid { get; set; }

        public virtual ApplicationUser ApplicationUser { get; set; }
    }
}
