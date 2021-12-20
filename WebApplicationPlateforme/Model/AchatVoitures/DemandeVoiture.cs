using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Model.AchatVoitures
{
    public class DemandeVoiture
    {
        public int Id { get; set; }
        public string typeVoiture { get; set; }
        public string matricule { get; set; }
        public string marque { get; set; }
        public string model { get; set; }
        public string tel { get; set; }
        public string email { get; set; }
        public string remarque { get; set; }
        public string prix { get; set; }
        public string etat {get;set;}
        public string iddot {get;set;}
        public string namedot{get;set;}
        public string datedot {get;set;}
        public string dateenreg {get;set;}
        public string userNameCreator { get; set; }
    
        [ForeignKey("ApplicationUser")]
    public string idUserCreator { get; set; }

    public virtual ApplicationUser ApplicationUser { get; set; }
}
}
