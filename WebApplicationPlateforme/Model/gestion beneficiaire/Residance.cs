using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Model.gestion_beneficiaire
{
    public class Residance
    {
        public int Id { get; set; }
        public string typeResi {get;set;}
        public string typeMaison{get;set;}
        public string etat {get;set;}

        public string dateenreg { get; set; }
        public string userNameCreator { get; set; }

        [ForeignKey("GestionBenenficiaire")]
        public int idBen { get; set; }

        public virtual GestionBenenficiaire GestionBenenficiaire { get; set; }

        [ForeignKey("ApplicationUser")]
        public string idUserCreator { get; set; }

        public virtual ApplicationUser ApplicationUser { get; set; }
    }
}
