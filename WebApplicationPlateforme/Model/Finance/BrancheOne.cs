using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplicationPlateforme.Model.Finance
{
    public class BrancheOne
    {
        public int Id { get; set; }
        public string nom { get; set; }

        [ForeignKey("TypeFacture")]
        public int idTF { get; set; }

        public virtual TypeFacture TypeFacture { get; set; }
    }
}
