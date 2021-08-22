using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Model.Ressource_Humaines
{
    public class PiecesJointesRc
    {
        public int Id { get; set; }
        public string path { get; set; }
        public string type { get; set; }
        public string date { get; set; }

        public string CreatorName { get; set; }

        public string datenereg { get; set; }

        [ForeignKey("ApplicationUser")]
        public string IdUserCreator { get; set; }

        [ForeignKey("Recrutement")]
        public int Idrec { get; set; }

        public virtual ApplicationUser ApplicationUser { get; set; }
        public virtual Recrutement Recrutement { get; set; }
    }
}
