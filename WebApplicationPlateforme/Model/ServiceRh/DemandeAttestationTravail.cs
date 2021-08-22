using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Model.ServiceRh
{
    public class DemandeAttestationTravail
    {
        public int Id { get; set; }
        public string langue {get;set;}
        public string org{get;set;}
        public string userInfo{get;set;}
        public string etat{get;set;}
        public string etatrh{get;set;}
        public string idrh{get;set;}
        public string nomrh{get;set;}
        public string daterh{get;set;}
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
