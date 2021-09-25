using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplicationPlateforme.Model.MediaCenter.Montage
{
    public class montageFiles
    {
        public int Id { get; set; }
        public string path { get; set; }
        public string type { get; set; }
        public string nom { get; set; }

        [ForeignKey("montage")]
        public int idmontage { get; set; }

        public virtual montage montage { get; set; }
    }
}
