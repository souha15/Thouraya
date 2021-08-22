using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplicationPlateforme.Model.Orphelin
{
    public class EducationOrphelin
    {
        public int Id { get; set; }
        public string education{get;set;}
        public string raisonedu{get;set;}
        public string niveau{get;set;}
        public string classe{get;set;}
        public string Autorite { get; set; }
        public string typeAutorite{get;set;}
        public string nomOrph { get; set; }
        public string tel{get;set;}
        public string conseillerSocialNom {get;set;}
        public string conseillerSocialNumTel { get;set;}
        public string mention{get;set;}
        public string periode {get;set;}

        public int attribut1 { get; set; }
        public int attribut7 { get; set; }
        public string attribut2 { get; set; }
        public string attribut3 { get; set; }
        public string attribut4 { get; set; }
        public string attribut5 { get; set; }
        public string attribut6 { get; set; }
        public string dateenreg { get; set; }

        [ForeignKey("Orphelin")]
        public int idOrph { get; set; }

        public virtual Orphelin Orphelin { get; set; }
    }
}
