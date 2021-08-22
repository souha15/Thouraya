using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Model.Dotations
{
    public class locationUnite
    {
        public int Id { get; set; }
        public string numcontrat { get; set; }
        public string prixlocationmois { get; set; }
        public string datedebutcontrat { get; set; }
        public string delaicontrat { get; set; }
        public string moisdelocation { get; set; }

        public string locataireName { get; set; }
        

        [ForeignKey("locataire")]
        public int idlocataire { get; set; }


        [ForeignKey("unite")]
        public int idunite { get; set; }

        [ForeignKey("dotation")]
        public int iddotation { get; set; }
        public string nomunite { get; set; }

        public string nomdotation { get; set; }

        public string CreatorName { get; set; }


        [ForeignKey("ApplicationUser")]
        public string idUserCreator { get; set; }

        public string dateenreg { get; set; }
        public virtual ApplicationUser ApplicationUser { get; set; }


        public virtual unite unite { get; set; }
        public virtual dotation dotation { get; set; }

        public virtual locataire locataire { get; set; }
    }
}
