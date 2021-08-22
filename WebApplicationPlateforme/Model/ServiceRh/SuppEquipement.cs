using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Model.ServiceRh
{
    public class SuppEquipement
    {
        public int Id { get; set; }
        public string daterecep { get; set; }

        public string etat { get; set; }
        public string nomUser { get; set; }
        public string detail { get; set; }

        [ForeignKey("ApplicationUser")]
        public string userId { get; set; }
        public string dateEqui { get; set; }
    public int attribut1 { get; set; }
        public string attribut2 { get; set; }
        public string attribut3 { get; set; }
        public string attribut4 { get; set; }
        public string attribut5 { get; set; }
        public string attribut6 { get; set; }
        public string dateenreg { get; set; }
      
        public string userNameCreator { get; set; }


        public string idUserCreator { get; set; }

        [ForeignKey("ReceptionEquipement")]
        public int idReception { get; set; }
        public virtual ApplicationUser ApplicationUser { get; set; }
        public virtual ReceptionEquipement ReceptionEquipement { get; set; }
    }
}
