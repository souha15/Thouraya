using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Model.ProjetOrg
{
    public class ProjetOrg
    {
        public int Id { get; set; }
        public string nom {get;set;}
        public string num {get;set;}
        public string nomClient {get;set;}
        public string dureePar {get;set;}
        public string duree {get;set;}
        public string dateReception {get;set;}
        public string dateDebut {get;set;}
        public string dateFin { get;set;}
        public string idDir {get;set;}
        public string nomDir {get;set;}
        public string etat {get;set;}
        public string etatUser {get;set;}
        public string etatDate {get;set;}

        public string attibut1 { get; set; }
        public string attribut2 { get; set; }
        public string attribut3 { get; set; }
        public string attribut4 { get; set; }
        public string attribut5 { get; set; }
        public string attribut6 { get; set; }
        public string creatorName { get; set; }

        public string datenereg { get; set; }

        [ForeignKey("ApplicationUser")]
        public string idUserCreator { get; set; }

        [ForeignKey("ProjetClient")]
        public int  idClient { get; set; }


        public virtual ApplicationUser ApplicationUser { get; set; }
        public virtual ProjetClient ProjetClient { get; set; }
    }
}
