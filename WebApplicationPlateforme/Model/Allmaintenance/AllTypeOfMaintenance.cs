using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Model.Allmaintenance
{
    public class AllTypeOfMaintenance
    {
        public int Id { get; set; }
        public string detail { get; set; }
        public string type { get; set; }
        public string autre { get; set; }
        public string req { get; set; }
        public string iddir { get; set; }
        public string nomdir { get; set; }
        public string etadir { get; set; }
        public string datedir { get; set; }
        public string employeeid { get; set; }
        public string employeenom { get; set; }
        public string dateemployee { get; set; }
        public string etatemployee { get; set; }
        public string attribut1 { get; set; }
        public string attribut7 { get; set; }
        public string attribut2 { get; set; }
        public string attribut3 { get; set; }
        public string attribut4 { get; set; }
        public string attribut5 { get; set; }
        public string attribut6 { get; set; }
        public string userNameCreator { get; set; }
        [ForeignKey("ApplicationUser")]
        public string idUserCreator { get; set; }

        public virtual ApplicationUser ApplicationUser { get; set; }
    }
}
