using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplicationPlateforme.Model.MediaCenter.ImpressionDesign
{
    public class DesignFiles
    {
        public int Id { get; set; }
        public string path { get; set; }
        public string type { get; set; }

        [ForeignKey("DesignImpression")]
        public int idImpression { get; set; }

        public virtual DesignImpression DesignImpression { get; set; }
    }
}
