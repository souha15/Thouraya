using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplicationPlateforme.Model.Orphelin
{
    public class FilesOrphelin
    {
        public int Id { get; set; }
        public string type{get;set;}
        public string path{get;set;}
        public string dateEnreg{get;set;}
        public string nomOrph { get; set; }

        [ForeignKey("Orphelin")]
        public int idOrph { get; set; }

        public virtual Orphelin Orphelin { get; set; }
    }
}
