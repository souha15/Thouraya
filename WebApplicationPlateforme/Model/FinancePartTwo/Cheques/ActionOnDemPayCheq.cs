using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Model.FinancePartTwo.Cheques
{
    public class ActionOnDemPayCheq
    {

        public int Id { get; set; }
        public string nomUserFin { get; set; }
        public string nomUserCre { get; set; }
        public string idUserCre { get; set; }
        public string etat { get; set; }
        public string date { get; set; }
        public string nbetat { get; set; }
        public string userrole { get; set; }
        public string attibut1 { get; set; }
        public string attribut2 { get; set; }
        public string attribut3 { get; set; }
        public string attribut4 { get; set; }
        public string attribut5 { get; set; }
        public string attribut6 { get; set; }

        [ForeignKey("DemandePayCheque")]
        public int idDem { get; set; }

        [ForeignKey("ApplicationUser")]
        public string idUserCreator { get; set; }
        public virtual ApplicationUser ApplicationUser { get; set; }
        public virtual DemandePayCheque DemandePayCheque { get; set; }
    }
}
