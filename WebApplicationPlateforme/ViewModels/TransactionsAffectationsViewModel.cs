using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplicationPlateforme.ViewModels
{
    public class TransactionsAffectationsViewModel
    { 
        public int Id { get; set; }
        public string numAutorite { get; set; }
        public string orgEnregTr { get; set; }
        public string nomOrganisme { get; set; }
        public string datenereg { get; set; }
        public string date { get; set; }
        public string etat { get; set; }
        public int idAff { get; set; }
        public string type { get; set; }
    }
}
