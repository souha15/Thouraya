using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Model.Taches
{
    public class Commentaire
    {

        public int Id { get; set; }
        public string TextCommentaire { get; set; }

        [DataType(DataType.DateTime)]
        [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy}", ApplyFormatInEditMode = true)]
        public DateTime dateTime { get; set; }
        public string NomUser { get; set; }

        [ForeignKey("Tache")]
        public int? IdTache { get; set; }

        [ForeignKey("ApplicationUser")]
        public string IdUser { get; set; }
        public virtual Tache Tache { get; set; }

        public virtual ApplicationUser ApplicationUser { get; set; }
    }
}
