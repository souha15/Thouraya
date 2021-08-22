using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Model.Ressource_Humaines
{
    public class Equipement
    {
        public int Id { get; set; }
        public string type { get; set; }
        public string nom { get; set; }
        public string email { get; set; }
        public string tel { get; set; }
        public string transfert { get; set; }
        public string remarque { get; set; }
        public string etatdir { get; set; }
        public string date { get; set; }
        public string datedir { get; set; }
        public string iddir { get; set; }
        public string nomdir { get; set; }

        public int attribut1 { get; set; }
        public string attribut2 { get; set; }
        public string attribut3 { get; set; }
        public string attribut4 { get; set; }
        public string attribut5 { get; set; }
        public string attribut6 { get; set; }
        public string dateenreg { get; set; }
        public string userNameCreator { get; set; }

        [ForeignKey("ApplicationUser")]
        public string idUserCreator { get; set; }

        public virtual ApplicationUser ApplicationUser { get; set; }
    }
}
