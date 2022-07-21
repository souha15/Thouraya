using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplicationPlateforme.Model.ServiceRh
{
    public class FilesDecisionTwoes
    {

        public int Id { get; set; }
        public string path { get; set; }
  
        [ForeignKey("DecisionTwo")]
        public int idDecision { get; set; }

        public virtual DecisionTwo DecisionTwo { get; set; }
    }
}
