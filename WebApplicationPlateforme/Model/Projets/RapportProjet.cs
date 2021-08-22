using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Model.Projets
{
    public class RapportProjet
    {
        public int Id { get; set; }
        public string type { get; set; }
        public string path { get; set; }
        public string date { get; set; }
        public string creatorName { get; set; }

        public string datenereg { get; set; }

        [ForeignKey("ApplicationUser")]
        public string idUserCreator { get; set; }


        [ForeignKey("Projet")]
        public int idprojet { get; set; }

        public virtual ApplicationUser ApplicationUser { get; set; }
        public virtual Projet Projet { get; set; }
    }
}
