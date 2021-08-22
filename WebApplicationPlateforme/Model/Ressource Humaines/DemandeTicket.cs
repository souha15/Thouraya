using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Model.Ressource_Humaines
{
    public class DemandeTicket
    {
        public int Id { get; set; }
        public string nom { get; set; }
        public string titre { get; set; }
        public string regcivil{ get; set; }
        public string num{ get; set; }
        public string place { get; set; }
        public string photosPath { get; set; }
        public string dateenreg { get; set; }
        public string userNameCreator { get; set; }
        public string dirnom { get; set; }
        public string dirid { get; set; }
        public string etat { get; set; }
        public string etatdate { get; set; }

        [ForeignKey("ApplicationUser")]
        public string idUserCreator { get; set; }

        public virtual ApplicationUser ApplicationUser { get; set; }
    }
}
