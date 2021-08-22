using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplicationPlateforme.Model.Global
{
    public class Departement
    {

        public int? Id { get; set; }
        public string Nom { get; set; }
        public string Description { get; set; }
        public string NomDirecteur { get; set; }
        public string NomAdministration { get; set; }

        [ForeignKey("Administration")]
        public int IdAdministration { get; set; }

        public virtual Administration Administration { get; set; }
    }
}
