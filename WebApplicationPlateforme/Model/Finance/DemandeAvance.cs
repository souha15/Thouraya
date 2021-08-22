using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Model.Finance
{
    public class DemandeAvance
    {
        public int Id { get; set; }
        public string prix { get; set; }
        public string etatAvance { get; set; }
        public string detail { get; set; }
        public string nbMoisDeduire { get; set; }
        public string mois { get; set; }
        public string annee { get; set; }
        public string dateDeduire { get; set; }
        public string etatC { get; set; }
        public string idC { get; set; }
        public string nomC { get; set; }
        public string dateC { get; set; }
        public string raisonRefusC { get; set; }
        public string idD { get; set; }
        public string etatD { get; set; }
        public string nomD { get; set; }
        public string dateD { get; set; }
        public string raisonRefusD { get; set; }
        public int attribut1 { get; set; }
        public string attribut2 { get; set; }
        public string attribut3 { get; set; }
        public string attribut4 { get; set; }
        public string attribut5 { get; set; }
        public string attribut6 { get; set; }
        public string dateenreg { get; set; }
        public string userNameCreator { get; set; }

        [ForeignKey("ApplicationUser")]
        public string idUserCreator { get; set; }

        public virtual ApplicationUser ApplicationUser { get; set; }
    }
}
