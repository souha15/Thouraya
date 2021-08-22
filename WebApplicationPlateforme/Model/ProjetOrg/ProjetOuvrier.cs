using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Model.ProjetOrg
{
    public class ProjetOuvrier
    {
        public int Id { get; set; }
        public string nomProjet { get; set; }
        public string nomUser { get; set; }

        [ForeignKey("ProjetOrg")]
        public int idprojet { get; set; }


        [ForeignKey("ApplicationUser")]
        public string idUserCreator { get; set; }

        public virtual ProjetOrg ProjetOrg { get; set; }
        public virtual ApplicationUser ApplicationUser { get; set; }

    }
}
