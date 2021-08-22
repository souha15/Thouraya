using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Model.Taches
{
    public class Evaluation
    {

        public int Id { get; set; }
        public string Description { get; set; }

        [DataType(DataType.DateTime)]
        [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy}", ApplyFormatInEditMode = true)]
        public DateTime dateTime { get; set; }
        public string Rating { get; set; }

        public string NomUserEvaluated { get; set; }

       

        [ForeignKey("Tache")]
        public int IdTache { get; set; }

        [ForeignKey("ApplicationUser")]
        public string IdUserEvaluating { get; set; }

        public virtual Tache Tache { get; set; }

        public virtual ApplicationUser ApplicationUser { get; set; }
    }
}
