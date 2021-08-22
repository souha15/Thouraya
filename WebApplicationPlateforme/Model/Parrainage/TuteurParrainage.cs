using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Model.Parrainage
{
    public class TuteurParrainage
    {
        public int Id { get; set; }
        public string tel { get; set; }
        public string nom { get; set; }
        public string cin { get; set; }
        public string email { get; set; }
        public string pays { get; set; }
        public string ville { get; set; }
        public string nat { get; set; }
        public string otherDetails { get; set; }
        public string numTut { get; set; }
        public string nbParrainage { get; set; }

        public int attribut1 { get; set; }
        public int attribut7 { get; set; }
        public string attribut2 { get; set; }
        public string attribut3 { get; set; }
        public string attribut4 { get; set; }
        public string attribut5 { get; set; }
        public string attribut6 { get; set; }
        public string dateenreg { get; set; }

        [ForeignKey("ApplicationUser")]
        public string idUserCreator { get; set; }

        public virtual ApplicationUser ApplicationUser { get; set; }
    }
}
