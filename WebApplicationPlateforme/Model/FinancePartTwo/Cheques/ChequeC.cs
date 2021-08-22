using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Model.FinancePartTwo.Cheques
{
    public class ChequeC
    {
        public int Id { get; set; }
        public string classe { get; set; }
        public string dateEntre { get; set; }
        public string numcheque { get; set; }
        public string prix { get; set; }
        public string raison { get; set; }
        public string dateEcriture { get; set; }
        public string numDemande { get; set; }
        public string compte { get; set; }
        public string idCompte { get; set; }
        public string datePay { get; set; }
        public string recepteur { get; set; }
        public string etat { get; set; }
        public string attibut1 { get; set; }
        public string attribut2 { get; set; }
        public string attribut3 { get; set; }
        public string attribut4 { get; set; }
        public string attribut5 { get; set; }
        public string attribut6 { get; set; }
        public string creatorName { get; set; }
        public string dateenreg { get; set; }

        [ForeignKey("ApplicationUser")]
        public string idUserCreator { get; set; }
        public virtual ApplicationUser ApplicationUser { get; set; }
    }
}
