using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplicationPlateforme.Model.MediaCenter.PartageMedia
{
    public class PartageFiles
    {
        public int Id { get; set; }
        public string path { get; set; }
        public string type { get; set; }

        [ForeignKey("PartageMedia")]
        public int idPartageMedia { get; set; }

        public virtual PartageMedia PartageMedia { get; set; }
    }
}
