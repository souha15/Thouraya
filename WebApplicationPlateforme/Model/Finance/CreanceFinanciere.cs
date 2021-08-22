using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Model.Finance
{
    public class CreanceFinanciere
    {
        public int Id { get; set; }
        public string date { get; set; }
        public string prix { get; set; }
        public string typePaymenet { get; set; }
        public string projet { get; set; }
        public string detail { get; set; }
        public string nomBeneficiaire { get; set; }
        public string etat { get; set; }
        public string etatuserId { get; set; }
        public string dateetatuser { get; set; }
        public string etatusernom { get; set; }
        public string etatdirectorid { get; set; }
        public string etatdirectornom { get; set; }
        public string etatdirectordate { get; set; }
        public string etatPayement { get; set; }
        public string etatPayUserId { get; set; }
        public string etatPayUsernom { get; set; }
        public string etatPayUserDate { get; set; }
        public string typePayement { get; set; }
        public string datesalaire { get; set; }
        public string editdate { get; set; }
        public string edituserId { get; set; }
        public string editUserNom { get; set; }
        public string numcompteExp { get; set; }
        public string numcompteRecp { get; set; }
        public string numcheque { get; set; }
        public string datePayEspece{get;set;}
        public string nomBanque{get;set;}
        public string dateCheque{get;set;}
        public string numCompte{get;set;}
        public string numCheque{get;set;}
        public string photocheque{get;set;}
        public string datepaysalaire{get;set;}
        
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
