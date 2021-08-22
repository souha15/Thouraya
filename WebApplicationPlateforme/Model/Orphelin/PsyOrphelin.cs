using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplicationPlateforme.Model.Orphelin
{
    public class PsyOrphelin
    {   public int Id { get; set; }
        public string maladiePsy { get; set; }
        public string type { get; set; }
        public string docteur { get; set; }
        public string periode { get; set; }
        public string besoinsDoc { get; set; }
        public string periodeDod { get; set; }


        public int attribut1 { get; set; }
        public int attribut7 { get; set; }
        public string attribut2 { get; set; }
        public string attribut3 { get; set; }
        public string attribut4 { get; set; }
        public string attribut5 { get; set; }
        public string attribut6 { get; set; }
        public string dateenreg { get; set; }

        [ForeignKey("Orphelin")]
         public int idOrph { get; set; }

       public virtual Orphelin Orphelin { get; set; }
    }
}
