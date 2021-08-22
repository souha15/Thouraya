using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplicationPlateforme.Model.FinancePartTwo.Cheques
{
    public class FilesCheque
    {
        public int Id { get; set; }
        public string path {get;set;}
        public string type {get;set;}
        [ForeignKey("ChequeC")]
        public int idCheque { get; set; }

        public virtual ChequeC ChequeC { get; set; }
    }
}
