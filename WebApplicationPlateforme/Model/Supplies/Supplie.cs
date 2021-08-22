using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Model.Supplies
{
    public class Supplie
    {
        public int Id { get; set; }
        public string num { get; set; }
        public string categ { get; set; }
        public string classe { get; set; }
        public string quanitite { get; set; }
        public string etat { get; set; }
        public string datereception { get; set; }
        public string recepteur { get; set; }
        public string idrecepteur { get; set; }

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
