using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Model.AdministrativeCommunication.Decision
{
    public class ReceptionD
    {
        public int Id { get; set; }
        public string date { get; set; }

        public string etat { get; set; }

        public string userName { get; set; }

        public int attribut1 { get; set; }
        public string attribut2 { get; set; }
        public string attribut3 { get; set; }
        public string attribut4 { get; set; }
        public string attribut5 { get; set; }


        [ForeignKey("ApplicationUser")]
        public string idUser { get; set; }

        [ForeignKey("Decision")]
        public int idTransaction { get; set; }

        [ForeignKey("TdAffectation")]
        public int idAffectation { get; set; }
        public virtual TdAffectation TdAffectation { get; set; }

        public virtual ApplicationUser ApplicationUser { get; set; }
        public virtual Decision Decision { get; set; }
    }
}
