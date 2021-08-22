using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplicationPlateforme.Model.User_Services
{
    public class FilesPlaint
    {
        public int Id { get; set; }
        public string type { get; set; }
        public string path { get; set; }

        [ForeignKey("Plaint")]
        public int idPlaint { get; set; }

    
        public virtual Plaint Plaint { get; set; }
    }
}
