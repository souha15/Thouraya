using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Model.Parrainage
{
    public class SoldeTuteur
    {
        public int Id { get; set; }
        public string nomTuteur { get; set; }
        public string cinTuteur { get; set; }
        public string numTuteur { get; set; }
        public string prix { get; set; }
        public string date { get; set; }
        public string type { get; set; }
        public string solde { get; set; }
        public int attribut1 { get; set; }
        public int attribut7 { get; set; }
        public string attribut2 { get; set; }
        public string attribut3 { get; set; }
        public string attribut4 { get; set; }
        public string attribut5 { get; set; }
        public string attribut6 { get; set; }

        [ForeignKey("TuteurParrainage")]
        public int idTut { get; set; }

        public virtual TuteurParrainage TuteurParrainage { get; set; }

        [ForeignKey("ApplicationUser")]
        public string idUserCreator { get; set; }

        public virtual ApplicationUser ApplicationUser { get; set; }
    }
}
