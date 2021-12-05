using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Model.TechnicalDemands
{
    public class DemTech
    {
        public int Id { get; set; }
        public string typedem { get; set; }
        public int idadmin { get; set; }
        public string nomadmin { get; set; }
        public string marque { get; set; }
        public string  modele { get; set; }
        public string nomprog { get; set; }
        public string numsalle { get; set; }
        public string numorg { get; set; }
        public string numvideo { get; set; }
        public string etat { get; set; }
        public string techid { get; set; }
        public string technnom{ get; set; }
        public string etatdate { get; set; }
        public int attribut1 { get; set; }
        public string attribut2 { get; set; }
        public string attribut3 { get; set; }
        public string attribut4 { get; set; }
        public string attribut5 { get; set; }
        public string attribut6 { get; set; }
        public string dateenreg { get; set; }
        public string userNameCreator { get; set; }

        [ForeignKey("ApplicationUser")]
        public string idUserCreator { get; set; }

        public virtual ApplicationUser ApplicationUser { get; set; }
    }
}
