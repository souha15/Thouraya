using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplicationPlateforme.Model.VenteServices
{
    public class OffreVente
    {
        public int Id { get; set; }
        public string path { get; set; }
        public string type { get; set; }

        [ForeignKey("ServiceVente")]
        public int idVente { get; set; }
        public virtual ServiceVente ServiceVente { get; set; }
    }
}
