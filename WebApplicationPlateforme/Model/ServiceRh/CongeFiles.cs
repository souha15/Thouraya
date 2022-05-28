using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;
using WebApplicationPlateforme.Model.Ressource_Humaines;

namespace WebApplicationPlateforme.Model.ServiceRh
{
    public class CongeFiles
    {
        public int Id { get; set; }
        public string path { get; set; }
        public string typeConges { get; set; }
        public string nomConges { get; set; }

        [ForeignKey("conges")]
        public int idConge { get; set; }

        public virtual Conge conges { get; set; }

    }
}
