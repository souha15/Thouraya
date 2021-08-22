using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Security.Policy;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Model.voitures
{
    public class voiture
    {
        public int Id { get; set; }
        public string matricule {get;set;}
        public string num{get;set;}
        public string marque{get;set;}
        public string model{get;set;}
        public string genre{get;set;}
        public string datefinforme{get;set;}
        public string recepeteur{get;set;}
        public string datefinassurance{get;set;}
        public string idrecepteur{get;set;}
    
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
