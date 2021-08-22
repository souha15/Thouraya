using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Model.Pointage
{
    public class PointageUser
    {

        public int Id { get; set; }
        public string code { get; set; }
        public string username { get; set; }
        public string email { get; set; }
        public string dateTimePresence { get; set; }
        public string datePresence { get; set; }
        public string timePresence { get; set; }
        public string dateTimeQuitter { get; set; }
        public string dateQuitter { get; set; }
        public string timeQuitter { get; set; }
        public string mois { get; set; }
        public string adresseMac { get; set; }
        public string adresseIP { get; set; }
        public string etatPc { get; set; }
        public string latePresence { get; set; }
        public string lateQuitter { get; set; }
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
