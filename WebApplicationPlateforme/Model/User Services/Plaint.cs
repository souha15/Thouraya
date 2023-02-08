using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Model.User_Services
{
    public class Plaint
    {
        public int Id { get; set; }
        public string dateprob { get; set; }
        public string dateplaint { get; set; }
        public string partieB { get; set; }
        public string raison { get; set; }
        public string description { get; set; }
        public string affecter { get; set; }
        public string etataffecter{ get; set; }
        public string idaffecter { get; set; }
        public string nomaffecter { get; set; }
        public string dateaffecter { get; set; }
        public string etat { get; set; }
        public string iddir { get; set; }
        public string nomdir { get; set; }
        public string datedir { get; set; }
        public string etatdir { get; set; }
        public string idrh { get; set; }
        public string nomrh { get; set; }
        public string etatrh { get; set; }
        public string daterh { get; set; }
        public string decision { get; set; }

        public string creatorName { get; set; }
        public string datenereg { get; set; }
        public string attibut1 { get; set; }
        public string attribut2 { get; set; }
        public string attribut3 { get; set; }
        public string attribut4 { get; set; }
        public string attribut5 { get; set; }
        public string attribut6 { get; set; }
        [ForeignKey("ApplicationUser")]
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
