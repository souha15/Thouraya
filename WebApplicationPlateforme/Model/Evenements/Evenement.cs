using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Model.Evenements
{
    public class Evenement
    {
        public int Id { get; set; }
        public string classe { get; set; }
        public string projet { get; set; }
        public string typeAct { get; set; }
        public string langue { get; set; }
        public string nombre { get; set; }
        public string beneficiaire { get; set; }
        public string tache { get; set; }
        public string outils { get; set; }
        public string nboutils { get; set; }
        public string media { get; set; }
        public string lienmedia { get; set; }
        public string prixtotdep { get; set; }
        public string nbtotdep { get; set; }
        public string stat { get; set; }
        public string recommandation { get; set; }
        public string datetime { get; set; }
        public string localisation { get; set; }
        public string duree { get; set; }

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
