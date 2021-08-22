using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Model.Salaire
{
    public class SalaireD
    {
        public int Id { get; set; }
        public string mois { get; set; }
        public string annee { get; set; }
        public string salaire { get; set; }
        public string assurance { get; set; }
        public string indemnite { get; set; }
        public string autreIndemnite { get; set; }
        public string totIndemnite { get; set; }
        public string retrait { get; set; }
        public string raisonRetrait { get; set; }
        public string leplus { get; set; }
        public string reisonPlus { get; set; }
        public string tot { get; set; }
        public string sailairenet { get; set; }
        public string totUser { get; set; }
        public string totG { get; set; }
        public string salaireG { get; set; }
        public string moisG { get; set; }
        public string anneeG { get; set; }
        public string assuranceG { get; set; }
        public string retraitG { get; set; }
        public string indemniteG { get; set; }
        public int attribut1 { get; set; }
        public string attribut2 { get; set; }
        public string attribut3 { get; set; }
        public string attribut4 { get; set; }
        public string attribut5 { get; set; }
        public string attribut6 { get; set; }
        public string dateenreg { get; set; }
        public string userName { get; set; }
        public string userNameCreator { get; set; }
        public string idUserCreator { get; set; }

        [ForeignKey("ApplicationUser")]
        public string idUser { get; set; }

        public virtual ApplicationUser ApplicationUser { get; set; }
    }
}
