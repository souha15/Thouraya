using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Model.Ressource_Humaines
{
    public class SoldeConge
    {
        public int Id { get; set; }
        public string type { get; set; }
        public string mois { get; set; }
        public string annee { get; set; }
        public string number { get; set; }
        public string normal{get;set;}
        public string numbernormal{get;set;}
        public string soldenormal {get;set;}
        public string datenormal{get;set;}
        public string urgent{get;set;}
        public string numberurgent{get;set;}
        public string dateurgent{get;set;}
        public string soldeurgent{get;set;}
        public string maladie{get;set;}
       public string soldemaladie{get;set;}
        public string numbermaladie{get;set;}
        public string datemaladie{get;set;}
        public string dateenreg { get; set; }
        public string userNameCreator { get; set; }

        [ForeignKey("ApplicationUser")]
        public string idUserCreator { get; set; }

        public virtual ApplicationUser ApplicationUser { get; set; }
    }
}
