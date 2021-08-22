using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Model.FinancePartTwo.Cheques
{
    public class DemandePayCheque
    {
        public int Id { get; set; }
        public string calsse { get; set; }
        public string dateEntre { get; set; }
        public string demandeur { get; set; }
        public int numdem { get; set; }
        public string numdemnb { get; set; }
        public string iddemandeur { get; set; }
        public string description { get; set; }
        public string sujet { get; set; }
        public string prixnb { get; set; }
        public string prixlettre { get; set; }
        public string prixaccepte { get; set; }
        public string etatnum { get; set; }
        public string etatgeneral { get; set; }
        public string etatadmin { get; set; }
        public string etatdirecteur { get; set; }
        public string etatfinacier { get; set; }
        public string etatparfinancier { get; set; }
        public string etatpart { get; set; }
        public string idadmin { get; set; }
        public string iddir { get; set; }
        public string idfinancier { get; set; }
        public string idparfinancier { get; set; }
        public string idpart { get; set; }
        public string nomadmin { get; set; }
        public string nomdir { get; set; }
        public string nomfinancier { get; set; }
        public string nomparfinancier { get; set; }
        public string nompart { get; set; }

        public string dateadmin { get; set; }
        public string datedir { get; set; }
        public string datefinancier { get; set; }
        public string dateparfinancier { get; set; }
        public string datepart { get; set; }
        public string payetat { get; set; }
        public string idpayUser { get; set; }
        public string payUsernom { get; set; }

        public string attibut1 { get; set; }
        public string attribut2 { get; set; }
        public string attribut3 { get; set; }
        public string attribut4 { get; set; }
        public string attribut5 { get; set; }
        public string attribut6 { get; set; }
        public string creatorName { get; set; }
        public string dateenreg { get; set; }

        [ForeignKey("ApplicationUser")]
        public string idUserCreator { get; set; }
        public virtual ApplicationUser ApplicationUser { get; set; }
    }
}
