using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Model.gestion_beneficiaire
{
    public class Famille
    {
        public int Id { get; set; }
        public string nb { get; set; }
        public string nom { get; set; }
        public string cin { get; set; }
        public string dateNais { get; set; }
        public string sexe { get; set; }
        public string relation { get; set; }
        public string  req { get; set; }
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
