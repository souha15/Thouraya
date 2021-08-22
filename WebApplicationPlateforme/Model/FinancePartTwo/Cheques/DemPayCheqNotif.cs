using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Model.FinancePartTwo.Cheques
{
    public class DemPayCheqNotif
    {
        public int Id { get; set; }
        public string nomUser { get; set; }
        public string topic { get; set; }
        public string nb { get; set; }
        public string date { get; set; }
        public int nbpartsfin { get; set; }

        [ForeignKey("DemandePayCheque")]
        public int idDem { get; set; }

        [ForeignKey("ApplicationUser")]
        public string idUserCreator { get; set; }
        public virtual ApplicationUser ApplicationUser { get; set; }
        public virtual DemandePayCheque DemandePayCheque { get; set; }
    }
}
