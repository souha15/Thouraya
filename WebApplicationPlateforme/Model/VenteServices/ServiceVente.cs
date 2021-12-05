using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Model.VenteServices
{
    public class ServiceVente
    {
        public int Id { get; set; }
        public string type { get; set; }
        public string remarque { get; set; }
        public int adminId { get; set; }
        public string admin { get; set; }
        public string etat { get; set; }
        public string etatdot { get; set; }
        public string iddot { get; set; }
        public string  nomdot{ get; set; }
        public string  datedot{ get; set; }
        public string etatfin { get; set; }
        public string datefin { get; set; }
        public string nomfin { get; set; }
        public string idfin { get; set; }
        public int attribut1 { get; set; }
        public string attribut2 { get; set; }
        public string attribut3 { get; set; }
        public string attribut4 { get; set; }
        public string attribut5 { get; set; }
        public string attribut6 { get; set; }
        public string dateenreg { get; set; }
        public string userNameCreator { get; set; }

        [ForeignKey("ApplicationUser")]
        public string idUserCreator { get; set; }

        public virtual ApplicationUser ApplicationUser { get; set; }
    }
}
