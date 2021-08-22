using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplicationPlateforme.Model.FinancePartTwo.Cheques
{
    public class FilesPayCheque
    {
        public int Id { get; set; }
        public string path { get; set; }
        public string type { get; set; }
        [ForeignKey("DemandePayCheque")]
        public int idDemCheque { get; set; }

        public virtual DemandePayCheque DemandePayCheque { get; set; }
    }
}
