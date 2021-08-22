using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.gestion_beneficiaire;
using WebApplicationPlateforme.Model.Orphelin;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Model.Parrainage
{
    public class Parriner
    {
        public int Id { get; set; }
        public string nomTuteur { get; set; }
        public string cinTuteur { get; set; }
        public string numTuteur { get; set; }

        public string nomOrph { get; set; }
        public string cinOrph { get; set; }
        public string numOrph { get; set; }

        public string nomBen { get; set; }
        public string cinBen { get; set; }
        public string numBen { get; set; }
        public string solde { get; set; }
        public string nbParrainage { get; set; }
        public string type { get; set; }
        public int attribut1 { get; set; }
        public int attribut7 { get; set; }
        public string attribut2 { get; set; }
        public string attribut3 { get; set; }
        public string attribut4 { get; set; }
        public string attribut5 { get; set; }
        public string attribut6 { get; set; }

        public int idOrph { get; set; }

        [ForeignKey("GestionBenenficiaire")]
        public int idTut { get; set; }


        [ForeignKey("ApplicationUser")]
        public string idUserCreator { get; set; }

        public virtual ApplicationUser ApplicationUser { get; set; }
        public virtual GestionBenenficiaire GestionBenenficiaire { get; set; }
    }
}
