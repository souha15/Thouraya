using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplicationPlateforme.Model.Dotations
{
    public class PiecesJointesDotLoc
    {
        public int Id { get; set; }
        public string path { get; set; }
        public string type { get; set; }
        public string date { get; set; }

        [ForeignKey("locataireDot")]
        public int idlocation { get; set; }


        public virtual locataireDot locataireDot { get; set; }
    }
}
