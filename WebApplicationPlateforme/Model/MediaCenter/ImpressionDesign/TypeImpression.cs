using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplicationPlateforme.Model.MediaCenter.ImpressionDesign
{
    public class TypeImpression
    {
        public int Id { get; set; }
        public string nom { get; set; }
        public string taille { get; set; }
        public string quantite { get; set; }
        public string budget { get; set; }
        public string nbpage { get; set; }
        public string longueurtaille { get; set; }
        public string placement { get; set; }
        public string nbdiplome { get; set; }
        public string datediffusion { get; set; }
        public string nbBouclier { get; set; }
        public string autre { get; set; }
        public string typeDesign { get; set; }


        [ForeignKey("DesignImpression")]
        public int idImpression { get; set; }

        public virtual DesignImpression DesignImpression { get; set; }

    }
}
