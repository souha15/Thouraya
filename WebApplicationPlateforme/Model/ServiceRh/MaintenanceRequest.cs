using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Model.ServiceRh
{
    public class MaintenanceRequest
    {
        public int Id { get; set; }
        public string typePanne { get; set; }
        public string panne { get; set; }
        public string categoriePanne { get; set; }
        public string  detail{ get; set; }
        public string photoPanne { get; set; }
        public string idmec { get; set; }
        public string nommec { get; set; }
        public string etatmec { get; set; }
        public string datemec { get; set; }
        public string etat { get; set; }
        public string tarnsid { get; set; }
        public string transnom { get; set; }
        public string datetrans { get; set; }
        public string etattrans { get; set; }
        public string typedemande { get; set; }
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
