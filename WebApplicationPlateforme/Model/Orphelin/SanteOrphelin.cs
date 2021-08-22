using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplicationPlateforme.Model.Orphelin
{
    public class SanteOrphelin
    {
        public int Id { get; set; }
        public string malade { get; set; }
        public string typeMaladie { get; set; }
        public string maladie { get; set; }
        public string natureMaladie { get; set; }
        public string prix { get; set; }
        public int attribut1 { get; set; }
        public int attribut7 { get; set; }
        public string attribut2 { get; set; }
        public string attribut3 { get; set; }
        public string attribut4 { get; set; }
        public string attribut5 { get; set; }
        public string attribut6 { get; set; }
        public string dateenreg { get; set; }
        public string nomOrph { get; set; }
        [ForeignKey("Orphelin")]
        public int idOrph { get; set; }

        public virtual Orphelin Orphelin { get; set; }
    }
}
