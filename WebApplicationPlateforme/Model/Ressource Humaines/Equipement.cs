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
        public string etat { get; set; }
        public string idUserCreator { get; set; }
        public string userName1 { get; set; }
        public string userId1 { get; set; }
        public string userEtat1 { get; set; }
        public string userDate1 { get; set; }
        public string userName2 { get; set; }
        public string userId2 { get; set; }
        public string userEtat2 { get; set; }
        public string userDate2 { get; set; }
        public string userName3 { get; set; }
        public string userId3 { get; set; }
        public string userEtat3 { get; set; }
        public string userDate3 { get; set; }
        public string userName4 { get; set; }
        public string userId4 { get; set; }
        public string userEtat4 { get; set; }
        public string userDate4 { get; set; }
        public string userName5 { get; set; }
        public string userId5 { get; set; }
        public string userEtat5 { get; set; }
        public string userDate5 { get; set; }
        public string userName6 { get; set; }
        public string userId6 { get; set; }
        public string userEtat6 { get; set; }
        public string userDate6 { get; set; }
        public string userName7 { get; set; }
        public string userId7 { get; set; }
        public string userEtat7 { get; set; }
        public string userDate7 { get; set; }
        public string userName8 { get; set; }
        public string userId8 { get; set; }
        public string userEtat8 { get; set; }
        public string userDate8 { get; set; }
        public virtual ApplicationUser ApplicationUser { get; set; }
    }
}
