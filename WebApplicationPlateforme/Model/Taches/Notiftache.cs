using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Model.Taches
{
    public class Notiftache
    {
        public int Id { get; set; }
        public string textnotif { get; set; }
        public string datenotif { get; set; }
        public string nomUserAff { get; set; }
        public string nomCreator { get; set; }
        public string idUserCreator { get; set; }

        public int idTache { get; set; }

        [ForeignKey("ApplicationUser")]
        public string idUserAff { get; set; }

        public virtual ApplicationUser ApplicationUser { get; set; }
    }
}
