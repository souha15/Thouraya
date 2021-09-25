using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplicationPlateforme.Model.MediaCenter.Visite
{
    public class offreImpression
    {
        public int Id { get; set; }
        public string nom { get; set; }

        [ForeignKey("visite")]
        public int idvisite { get; set; }

        public virtual visite visite { get; set; }
    }
}
