using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplicationPlateforme.Model.Dotations
{
    public class piecesjointesLocataire
    {
        public int Id { get; set; }
        public string path { get; set; }
        public string type { get; set; }
        public string date { get; set; }
        public string nomLocataire { get; set; }

        [ForeignKey("locataire")]
        public int idlocataire { get; set; }


        public virtual locataire locataire { get; set; }
    }
}
