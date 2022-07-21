using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Model.FinancePartTwo.Cheques
{
    public class demandePayChequesReceive
    {
        public int Id { get; set; }
        public string idBoxMen { get; set; }
	    public string nomBoxMen { get; set; }
        public string idComptable { get; set; }
        public string nomComptable { get; set; }
        public string transfert { get; set; }
        public string prix { get; set; }
        public string retour { get; set; }

        [ForeignKey("DemandePayCheque")]
        public int idCheque { get; set; }
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
        public virtual DemandePayCheque DemandePayCheque { get; set; }
    }
}
