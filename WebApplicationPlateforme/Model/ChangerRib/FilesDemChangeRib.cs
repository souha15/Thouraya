using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplicationPlateforme.Model.ChangerRib
{
    public class FilesDemChangeRib
    {
        public int Id { get; set; }
        public string path { get; set; }
        public string type { get; set; }

        [ForeignKey("DemChangeRib")]
        public int idDem { get; set; }
        public virtual DemChangeRib DemChangeRib { get; set; }
    }
}
