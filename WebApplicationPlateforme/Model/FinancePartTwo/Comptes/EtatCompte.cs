using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.Projets;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Model.FinancePartTwo.Comptes
{
    public class EtatCompte
    {
        public int Id { get; set; }
        public string banque { get; set; }
        public string type { get; set; }
        public string numCompte { get; set; }
        public string date { get; set; }
        public string solde { get; set; }
        public string etat { get; set; }
        public string attibut1 { get; set; }
        public string attribut2 { get; set; }
        public string attribut3 { get; set; }
        public string attribut4 { get; set; }
        public string attribut5 { get; set; }
        public string attribut6 { get; set; }
        public string creatorName { get; set; }

        [ForeignKey("ApplicationUser")]
        public string idUserCreator { get; set; }


        [ForeignKey("Compte")]
        public int idCompte { get; set; }


        public virtual ApplicationUser ApplicationUser { get; set; }
        public virtual Compte Compte { get; set; }
    }
}
