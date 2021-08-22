using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplicationPlateforme.Model.FinancePartTwo.Comptes
{
    public class FilesEtatCompte
    {
        public int Id { get; set; }
        public string path { get; set; }
        public string type { get; set; }
       
        [ForeignKey("EtatCompte")]
        public int idCompte { get; set; }
        public virtual EtatCompte EtatCompte { get; set; }
    }
}
