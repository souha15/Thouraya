using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplicationPlateforme.Model.MediaCenter.FilmPart
{
    public class FilmsFiles
    {
        public int Id { get; set; }
        public string path { get; set; }
        public string type { get; set; }

        [ForeignKey("Film")]
        public int idFilm { get; set; }

        public virtual Film Film { get; set; }
    }
}
