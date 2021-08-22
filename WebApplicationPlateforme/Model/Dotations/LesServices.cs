using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplicationPlateforme.Model.Dotations
{
    public class LesServices
    {
        public int Id { get; set; }
        public string nomServices {get;set;}
        public string prixService{get;set;}
        public string paye {get;set;}
        public string reste {get;set;}
        public string date {get;set;}

        [ForeignKey("revenus")]
        public int idRevenus {get;set;}

        public virtual revenus revenus { get; set; }
    }
}
