using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Model.Finance
{
    public class Facture
    {
        public int Id {get;set;}
        public string prix {get;set;}
        public string categorie {get;set;}
        public string brancheone {get;set;}
        public string branchetwo {get;set;}
        public string detail {get;set;}
        public string beneficiaire {get;set;}
        public string date {get;set;}
        public string usernamecreator {get;set;}
        public string type {get;set;}
        public string etat{get;set;}
        public string etatUserId{get;set;}
        public string etatUserNom{get;set;}
        public string etatdate {get;set;}
        public string etatdirector{get;set;}
        public string dateetatdirector{get;set;}
        public string directorid {get;set;}
        public string directornom {get;set;}
        public string etatPayemeent {get;set;}
        public string etatuseridPay{get;set;}
        public string etatusernomPay{get;set;}
        public string etatPaydate{get;set;}
        public string editdate{get;set;}
        public string edituserid{get;set;}
        public string editusernom{get;set;}
      
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
