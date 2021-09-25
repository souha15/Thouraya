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
        public string transferera { get; set; }
        public string transfertetab { get; set; }
        public string transfertrh { get; set; }
        public string transfertdeux { get; set; }
        public string datetransfert { get; set; }
        public string idtrh { get; set; }
        public string idtetab { get; set; }
        public string nomtrh { get; set; }
        public string nomtetab { get; set; }
        public string etattrh { get; set; }
        public string etatetab { get; set; }
        public string datetrh { get; set; }
        public string dateetab { get; set; }
        public string tran1 { get; set; }
        public string tran2 { get; set; }
        public string tran3 { get; set; }
        public string tran4 { get; set; }
        public string tran5 { get; set; }
        public string tran6 { get; set; }
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
