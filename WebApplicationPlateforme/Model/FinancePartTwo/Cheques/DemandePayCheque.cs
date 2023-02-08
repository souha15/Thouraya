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
        public string retour { get; set; }
        public string prixRetour { get; set; }
        public string transfert { get; set; }

        public string dateRetour { get; set; }
        public string etatRetourBoxMen { get; set; }
        public string etatRetourComptable { get; set; }
        public string fileRetour { get; set; }
        public string attribut5 { get; set; }
        public string attribut6 { get; set; }
        public string creatorName { get; set; }
        public string dateenreg { get; set; }

        [ForeignKey("ApplicationUser")]
        public string idUserCreator { get; set; }
        public string etat { get; set; }
        public string userName1 { get; set; }
        public string userId1 { get; set; }
        public string userEtat1 { get; set; }
        public string userDate1 { get; set; }
        public string userName2 { get; set; }
        public string userId2 { get; set; }
        public string userEtat2 { get; set; }
        public string userDate2 { get; set; }
        public string userName3 { get; set; }
        public string userId3 { get; set; }
        public string userEtat3 { get; set; }
        public string userDate3 { get; set; }
        public string userName4 { get; set; }
        public string userId4 { get; set; }
        public string userEtat4 { get; set; }
        public string userDate4 { get; set; }
        public string userName5 { get; set; }
        public string userId5 { get; set; }
        public string userEtat5 { get; set; }
        public string userDate5 { get; set; }
        public string userName6 { get; set; }
        public string userId6 { get; set; }
        public string userEtat6 { get; set; }
        public string userDate6 { get; set; }
        public string userName7 { get; set; }
        public string userId7 { get; set; }
        public string userEtat7 { get; set; }
        public string userDate7 { get; set; }
        public string userName8 { get; set; }
        public string userId8 { get; set; }
        public string userEtat8 { get; set; }
        public string userDate8 { get; set; }
        public virtual ApplicationUser ApplicationUser { get; set; }
    }
}
