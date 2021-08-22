using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.gestion_beneficiaire;
using WebApplicationPlateforme.Model.Gestion_de_stock;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Model.gestion_de_stock
{
    public class BenPayStockageOrdre
    {
        public int Id { get; set; }
        public string nomBen { get; set; }
        public string cin { get; set; }
        public string nomStock { get; set; }
        public string typeBen { get; set; }
        public string typeStock { get; set; }
        public string quatite { get; set; }


        public int attribut1 { get; set; }
        public int attribut7 { get; set; }
        public string attribut2 { get; set; }
        public string attribut3 { get; set; }
        public string attribut4 { get; set; }
        public string attribut5 { get; set; }
        public string attribut6 { get; set; }
        public string dateenreg { get; set; }
        public string userNameCreator { get; set; }

        [ForeignKey("Stock")]
        public int idstock { get; set; }

        [ForeignKey("GestionBenenficiaire")]
        public int idBen { get; set; }

        [ForeignKey("ApplicationUser")]
        public string idUserCreator { get; set; }

        [ForeignKey("OrdrePayStockage")]
        public int idOrdrePayStockage { get; set; }
        public virtual ApplicationUser ApplicationUser { get; set; }
        public virtual Stock Stock { get; set; }
        public virtual GestionBenenficiaire GestionBenenficiaire { get; set; }
        public virtual OrdrePayStockage OrdrePayStockage { get; set; }
    }
}
