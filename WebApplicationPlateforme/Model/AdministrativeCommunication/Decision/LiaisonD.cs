using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Model.AdministrativeCommunication.Decision
{
    public class LiaisonD
    {
        public int Id { get; set; }

        [ForeignKey("Decision")]
        public int idTrOne { get; set; }
        public int idTrTwo { get; set; }

        public int attribut1 { get; set; }
        public string attribut2 { get; set; }
        public string attribut3 { get; set; }
        public string attribut4 { get; set; }
        public string attribut5 { get; set; }
        public string attribut6 { get; set; }

        public string CreatorName { get; set; }


        [ForeignKey("ApplicationUser")]
        public string IdUserCreator { get; set; }

        public string datenereg { get; set; }



        public virtual ApplicationUser ApplicationUser { get; set; }
        public virtual Decision Decision { get; set; }
    }
}
