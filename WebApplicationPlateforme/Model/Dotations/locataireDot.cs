using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Model.Dotations
{
    public class locataireDot
    {
        public int Id { get; set; }
        public string nomDotation { get; set; }
        [ForeignKey("dotation")]
        public int idDotation { get; set; }
        [ForeignKey("unite")]
        public int idUnite { get; set; }
        public string nomUnite { get; set; }
        public string nom { get; set; }
        public string nat { get; set; }
        public string cin { get; set; }
        public string work { get; set; }
        public string adr { get; set; }
        public string tel { get; set; }
        public string date { get; set; }
        public string datedebutcontrat { get; set; }
        public string duree { get; set; }
        public string nomcontrat { get; set; }
        public string attribut1 { get; set; }
        public string attribut2 { get; set; }
        public string attribut3 { get; set; }
        public string attribut4 { get; set; }
        public string attribut5 { get; set; }
        public string CreatorName { get; set; }

        [ForeignKey("ApplicationUser")]
        public string idUserCreator { get; set; }
        public string dateenreg { get; set; }
        public virtual ApplicationUser ApplicationUser { get; set; }
        public virtual unite unite { get; set; }
        public virtual dotation dotation { get; set; }
    }
}
