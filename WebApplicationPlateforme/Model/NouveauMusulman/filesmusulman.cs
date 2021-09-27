using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplicationPlateforme.Model.NouveauMusulman
{
    public class filesmusulman
    {
        public int Id { get; set; }
        public string paths { get; set; }
        public string typefile { get; set; }

        [ForeignKey("musulman")]
        public int idmusulman { get; set; }
        public virtual musulman musulman { get; set; }
    }
}
