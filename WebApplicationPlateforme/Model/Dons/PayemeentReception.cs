using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Model.Dons
{
    public class PayemeentReception
    {
        public int Id { get; set; }
        public string typeDons {get;set;}
        public string projet {get;set;}
        public string doneurNom{get;set;}
        public string prixDons{get;set;}
        public string delegueNom{get;set;}
        public string prixDonsEcriture{get;set;}
        public string dateDons{get;set;}
        public string req{get;set;}
        public string tel {get;set;}
        public string cin {get;set;}
        public string numOperation{get;set;}
        public string dateTransfert{get;set;}
        public string banqueEmis{get;set;}
        public string banqueRecep{get;set;}
        public string numOpBanque {get;set;}
        public string photoBanque{get;set;}
        public string dateCheque {get;set;}
        public string numCheque {get;set;}
        public string nomBanqueCheque {get;set;}
        public string propCheque{get;set;}
        public string photoCheque {get;set;}
        public string  dateOperation{get;set;}
        public string numMachine{get;set;}
        public string photoDab{get;set;}
        public string operationDab{get;set;}
        public int attribut1 { get; set; }
        public string attribut2 { get; set; }
        public string attribut3 { get; set; }
        public string attribut4 { get; set; }
        public string attribut5 { get; set; }
        public string attribut6 { get; set; }
        public string dateenreg { get; set; }
        public string userNameCreator { get; set; }

        [ForeignKey("Doneur")]
        public int idDonneur { get; set; }

        [ForeignKey("ApplicationUser")]
        public string idUserCreator { get; set; }

        public virtual ApplicationUser ApplicationUser { get; set; }
        public virtual Doneur Doneur { get; set; }
    }
}
