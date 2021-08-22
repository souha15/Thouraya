using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Model.Dotations
{
    public class unite
    {
        public int Id { get; set; }
        public string numRevenus { get; set; }
        public string type { get; set; }
        public string etat { get; set; }
        public string chambre { get; set; }
        public string wc { get; set; }
        public string cuisine { get; set; }
        public string bureau { get; set; }
        public string prix { get; set; }
        public string salon { get; set; }
        public string compteurElc { get; set; }
        public string compteureau { get; set; }
        public int attribut1 { get; set; }
        public string attribut2 { get; set; }
        public string attribut3 { get; set; }
        public string attribue4 { get; set; }

        public string dotationName { get; set; }


        [ForeignKey("dotation")]
        public int idDotation { get; set; }


        public string dateenreg { get; set; }

        public string CreatorName { get; set; }


        [ForeignKey("ApplicationUser")]
        public string idUserCreator { get; set; }


        public virtual ApplicationUser ApplicationUser { get; set; }
        public virtual dotation dotation { get; set; }
    }
}
