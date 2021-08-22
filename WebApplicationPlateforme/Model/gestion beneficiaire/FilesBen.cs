using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplicationPlateforme.Model.gestion_beneficiaire
{
    public class FilesBen
    {
        public int Id { get; set; }
        public string type { get; set; }
        public string path { get; set; }

        [ForeignKey("GestionBenenficiaire")]
        public int idBen { get; set; }


        public virtual GestionBenenficiaire GestionBenenficiaire { get; set; }
    }
}
