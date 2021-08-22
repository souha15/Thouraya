using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplicationPlateforme.Model.FinancePartTwo.Cheques
{
    public class ArticlePayCheque
    {
        public int Id { get; set; }
        public string article {get;set;}
        public string prix {get;set;}
        public string detail {get;set;}

        [ForeignKey("DemandePayCheque")]
        public int idDem {get;set;}
      
        public virtual DemandePayCheque DemandePayCheque { get; set; }
    }
}
