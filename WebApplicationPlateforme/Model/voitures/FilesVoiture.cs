using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplicationPlateforme.Model.voitures
{
    public class FilesVoiture
    {
        public int Id { get; set; }
        public string path { get; set; }
        public string type { get; set; }

        [ForeignKey("voiture")]
        public int idVoiture { get; set; }
        public virtual voiture voiture { get; set; }
    }
}
