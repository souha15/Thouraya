using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplicationPlateforme.Model.Supplies
{
    public class FilesSupplie
    {
        public int Id { get; set; }
        public string path { get; set; }
        public string type { get; set; }

        [ForeignKey("Supplie")]
        public int idSupplie { get; set; }
        public virtual Supplie Supplie { get; set; }
    }
}
