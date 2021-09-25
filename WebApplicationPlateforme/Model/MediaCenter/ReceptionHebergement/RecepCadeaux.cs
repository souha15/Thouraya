using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplicationPlateforme.Model.MediaCenter.ReceptionHebergement
{
    public class RecepCadeaux
    {
        public int Id { get; set; }
        public string nom { get; set; }

        [ForeignKey("ReceptionHeber")]
        public int idReceptionHeber { get; set; }

        public virtual ReceptionHeber ReceptionHeber { get; set; }
    }
}
