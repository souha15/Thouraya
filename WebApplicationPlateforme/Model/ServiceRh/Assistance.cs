using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Model.ServiceRh
{
    public class Assistance
    {
        public int Id { get; set; }
        public string username { get; set; }
        public string dateTime { get; set; }
        public string position { get; set; }
        public string iddir { get; set; }
        public string nomdir { get; set; }
        public string datedir { get; set; }
        public string etatdir { get; set; }
        public string etat { get; set; }
        public string idrh { get; set; }
        public string etatrh { get; set; }
        public string nomrh { get; set; }
        public string daterh { get; set; }
        public string datefin { get; set; }
        public string etatfin { get; set; }
        public string idfin { get; set; }
        public string nomfin { get; set; }
        public string datefinetab { get; set; }
        public string etatfinetab { get; set; }
        public string idfinetab { get; set; }
        public string nomfinetab { get; set; }
        public string transfert { get; set; }
        public string transfert1 { get; set; }
        public string transfert2 { get; set; }
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
