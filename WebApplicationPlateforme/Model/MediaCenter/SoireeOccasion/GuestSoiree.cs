using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplicationPlateforme.Model.MediaCenter.SoireeOccasion
{
    public class GuestSoiree
    {
        public int Id { get; set; }
        public string nom { get; set; }

        [ForeignKey("OccasionSoiree")]
        public int idSoiree { get; set; }

        public virtual OccasionSoiree OccasionSoiree { get; set; }
    }
}
