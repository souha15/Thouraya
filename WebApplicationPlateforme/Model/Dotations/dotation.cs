using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Model.Dotations
{
    public class dotation
    {
        public int Id { get; set; }
        public string nom { get; set; }
        public string date { get; set; }
        public string type { get; set; }
        public string etat { get; set; }
        public string adresse { get; set; }
        public string nbunite { get; set; }
        public string compteurElec { get; set; }
        public string numCompteur { get; set; }
        public string  officeImmobiler{ get; set; }

        public string comptable { get; set; }

        public int attribut1 { get; set; } 
        public string attribut2  { get; set; } 
        public string attribut3 { get; set; } 
        public string attribue4 { get; set; }

        public string dateenreg { get; set; }
        public string CreatorName { get; set; }


        [ForeignKey("ApplicationUser")]
        public string idUserCreator { get; set; }

        public int idAgence { get; set; }
      
        public virtual ApplicationUser ApplicationUser { get; set; }
        public virtual agenceImmob AgenceImmob { get; set; }

    }
}
