using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Model.Projets
{
    public class PayementProjet
    {
        public int Id { get; set; }
        public string activite { get; set; }
        public string categ { get; set; }
        public string but { get; set; }
        public string nb { get; set; }
        public string prix { get; set; }
        public int totprix { get; set; }
        public string tot { get; set; }
        public string attibut1 { get; set; }
        public string attribut2 { get; set; }
        public string attribut3 { get; set; }
        public string creatorName { get; set; }

        public string datenereg { get; set; }
        public string butprojet { get; set; }

        [ForeignKey("ApplicationUser")]
        public string idUserCreator { get; set; }


        [ForeignKey("Projet")]
        public int idprojet { get; set; }


        public virtual ApplicationUser ApplicationUser { get; set; }
        public virtual Projet Projet { get; set; }

    }
}
