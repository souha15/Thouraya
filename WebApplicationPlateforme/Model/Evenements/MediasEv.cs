using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplicationPlateforme.Model.Evenements
{
    public class MediasEv
    {
        public int Id { get; set; }
        public string nom { get; set; }
        public string path { get; set; }

        [ForeignKey("Evenement")]
        public int? idEvent { get; set; }

        public virtual Evenement Evenement { get; set; }
    }
}
