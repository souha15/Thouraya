using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Security.Policy;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Model.AdministrativeCommunication
{
    public class Proprietaire
    {
        public int Id {get;set;}
        public string nom {get;set;}
        public string prenom {get;set;}
        public string cin {get;set;}
        public string email {get;set;}
        public string addresse {get;set;}
        public string tel {get;set;}
        public int attribut1 { get; set; }
        public string attribut2 { get; set; }
        public string attribut3 { get; set; }
        public string attribut4 { get; set; }
        public string attribut5 { get; set; }
        public string attribut6 { get; set; }

        public string CreatorName { get; set; }


        [ForeignKey("ApplicationUser")]
        public string IdUserCreator { get; set; }

        public string datenereg { get; set; }



        public virtual ApplicationUser ApplicationUser { get; set; }

    }
}
