using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Model.Dotations
{
    public class revenus
    {
        public int Id { get; set; }

        public int idlocation { get; set; }
        public int idunite { get; set; }
        public string numRevenusUnite { get; set; }
        public int iddotation { get; set; }
        public string nomDotation  { get; set; }
        public int idLocataire { get; set; }
        public string nomLocataire { get; set; }
        public string prixLocation { get; set; }
        public string prixTot { get; set; }
        public string mois { get; set; }
        public string infoDepot { get; set; }
        public string dateTemps { get; set; }
        public string deposant { get; set; }
        public string prixTotale { get; set; }
        public string restePrixTotale { get; set; }
        public string prixServices { get; set; }
        public string restePrixService { get; set; }
        public string prixTotaleLocation { get; set; }
        public string restePrixTotaleLocation { get; set; }
 
        public int attribut1 { get; set; }
        public string attribut2 { get; set; }
        public string attribut3 { get; set; }
        public string attribue4 { get; set; }
        public string CreatorName { get; set; }
        public string dateenreg { get; set; }

        [ForeignKey("ApplicationUser")]
        public string idUserCreator { get; set; }

        [ForeignKey("locataireDot")]
        public int idLocDot { get; set; }

        public virtual locataireDot locataireDot { get; set; }
        public virtual ApplicationUser ApplicationUser { get; set; }


   
    }
}
