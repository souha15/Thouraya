using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Model.ServiceRh
{
    public class DemandeFormation
    {
        public int Id { get; set; }
        public string titre { get; set; }
        public string specialite { get; set; }
        public string autreSpec { get; set; }
        public string org { get; set; }
        public string duree { get; set; }
        public string prix { get; set; }
        public string lien { get; set; }
        public string detail { get; set; }
        public string etat { get; set; }
        public string etatdir { get; set; }
        public string iddir { get; set; }
        public string nomdir { get; set; }
        public string datedir { get; set; }
        public string etatrh { get; set; }
        public string idrh { get; set; }
        public string nomrh { get; set; }
        public string daterh { get; set; }

        public string etatc { get; set; }
        public string idc { get; set; }
        public string nomc { get; set; }
        public string datec { get; set; }

        [ForeignKey("Formation")]
        public int? idFormation {get;set;}
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
        public virtual Formation Formation { get; set; }
    }
}
