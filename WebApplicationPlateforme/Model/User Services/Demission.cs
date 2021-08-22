using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Model.User_Services
{
    public class Demission
    {
        public int Id { get; set; }
        public string date { get; set; }
        public string raison { get; set; }

        public string etat { get; set; }
        public string etatdir { get; set; }
        public string etatrh { get; set; }
        public string iddir { get; set; }
        public string idrh { get; set; }
        public string nomrh { get; set; }
        public string nomdir { get; set; }
        public string datedir { get; set; }
        public string daterh { get; set; }

        public string creatorName { get; set; }
        public string datenereg { get; set; }
        public string attibut1 { get; set; }
        public string attribut2 { get; set; }
        public string attribut3 { get; set; }
        public string attribut4 { get; set; }
        public string attribut5 { get; set; }
        public string attribut6 { get; set; }
        [ForeignKey("ApplicationUser")]
        public string idUserCreator { get; set; }
        public virtual ApplicationUser ApplicationUser { get; set; }
    }
}
