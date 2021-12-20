using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Model.ActivitePart
{
    public class Activiteee
    {
        public int Id { get; set; }
        public string nom { get; set; }
        public string type { get; set; }
        public string dateEnreg { get; set; }
        public string nbActivite { get; set; }
        public string  nbBenef { get; set; }
        public string dateDeb { get; set; }
        public string datefin { get; set; }
        public string attribut1 { get; set; }
        public string attribut7 { get; set; }
        public string attribut2{ get; set; }
        public string attribut3 { get; set; }
        public string attribut4 { get; set; }
        public string attribut5 { get; set; }
        public string attribut6 { get; set; }
        public string userNameCreator { get; set; }
        [ForeignKey("ApplicationUser")]
        public string idUserCreator { get; set; }

        public virtual ApplicationUser ApplicationUser { get; set; }
    }
}
