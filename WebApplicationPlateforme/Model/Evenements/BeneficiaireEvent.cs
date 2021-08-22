using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplicationPlateforme.Model.Evenements
{
    public class BeneficiaireEvent
    {
        public int Id { get; set; }
        public string categ { get; set; }
        public string nombre { get; set; }
        public string langue { get; set; }
        public int attribut1 { get; set; }
        public string attribut2 { get; set; }
        public string attribut3 { get; set; }
        public int attribut4 { get; set; }

        [ForeignKey("Evenement")]
        public int? idEvent { get; set; }

        public virtual Evenement Evenement { get; set; }
    }
}
