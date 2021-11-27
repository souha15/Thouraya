using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Model.Decision
{
    public class DecisionDecisif
    {
        public int Id { get; set; }
        public string userId { get; set; }
        public string userName{ get; set; }
        public string infraction { get; set; }
        public int dateHijMil { get; set; }
        public int typeDecstr { get; set; }
        public string datehijmil { get; set; }
    
        public string moisHij { get; set; }
        public string joursHij { get; set; }
        public string anneeHij { get; set; }
        public string moisMil { get; set; }
        public string joursMil { get; set; }
        public string anneeMil { get; set; }
        public string periode { get; set; }
        public string repetion { get; set; }
        public string decisionNb { get; set; }
        public string typeDec { get; set; }
        public string moisDecHij { get; set; }
        public string moisDecMil { get; set; }
        public string anneeDecHij { get; set; }
        public string anneeDecMil { get; set; }
        public int attribut1 { get; set; }
        public string attribut2 { get; set; }
        public string attribut3 { get; set; }
        public string attribut4 { get; set; }
        public string attribut5 { get; set; }
        public string attribut6 { get; set; }
        public string dateenreg { get; set; }
        public string UserNameCreator { get; set; }

        [ForeignKey("ApplicationUser")]
        public string IdUserCreator { get; set; }

        public virtual ApplicationUser ApplicationUser { get; set; }
    }
}
