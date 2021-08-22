using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Model.Ressource_Humaines
{
    public class DemandeSalariale
    {
        public int Id { get; set; }
        public string type{get;set;}
        public string date {get;set;}
        public string langue{get;set;}
        public string organisme {get;set;}
        public string attribut1 {get;set;}
        public string attribut2 {get;set;}
        public string dateenreg { get; set; }
        public string userNameCreator { get; set; }
        public string dirnom { get; set; }
        public string dirid { get; set; }
        public string etat { get; set; }
        public string etatdate { get; set; }

        [ForeignKey("ApplicationUser")]
        public string idUserCreator { get; set; }

        public virtual ApplicationUser ApplicationUser { get; set; }
    }
}
