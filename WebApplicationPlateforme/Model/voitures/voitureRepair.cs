using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Model.voitures
{
    public class voitureRepair
    {
        public int Id { get; set; }
        public string matricule { get; set; }
        public string type { get; set; }
        public string daterepair { get; set; }
        public string prix1 { get; set; }
        public string prix2 { get; set; }
        public string prix3 { get; set; }
        public string panne { get; set; }
        public string iddir { get; set; }
        public string idrh { get; set; }
        public string nomdir { get; set; }
        public string nomrh { get; set; }
        public string datedir { get; set; }
        public string daterh { get; set; }
        public string etat { get; set; }
        public string etatdir { get; set; }
        public string etatrh { get; set; }
        public string req { get; set; }
    
        public int attribut1 { get; set; }
        public string attribut2 { get; set; }
        public string attribut3 { get; set; }
        public string attribut4 { get; set; }
        public string attribut5 { get; set; }
        public string attribut6 { get; set; }
        public string dateenreg { get; set; }
        public string userNameCreator { get; set; }

        [ForeignKey("voiture")]
        public int? idvoiture { get; set; }

        [ForeignKey("ApplicationUser")] 
        public string idUserCreator { get; set; }

        public virtual ApplicationUser ApplicationUser { get; set; }
        public virtual voiture voiture { get; set; }
    }
}
