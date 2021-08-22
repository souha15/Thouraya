using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Model.Projets
{
    public class Projet
    {
        public int Id { get; set; }
        public string classe { get; set; }
        public string dirid { get; set; }
        public string dirnom { get; set; }
        public string descriptiondir { get; set; }
        public string titre { get; set; }
        public string duree { get; set; }
        public string date { get; set; }
        public string dateFin { get; set; }
        public string moisjours { get; set; }
        public string orgnom { get; set; }

        [ForeignKey("OrganismeSupp")]
        public int? orgid { get; set; }
        public string prix { get; set; }
        public string typeRembourssement { get; set; }
        public string numcheque { get; set; }
        public string compte { get; set; }
        public string datesupport { get; set; }
        public string numReception { get; set; }
        public string activite { get; set; }
        public string etat { get; set; }
        public string rapport { get; set; }
        public string dateupload { get; set; }
        public string evaluation { get; set; }
        public string remarque { get; set; }
        public string attibut1 { get; set; }
        public string attribut2 { get; set; }
        public string attribut3 { get; set; }
        public string attribut4 { get; set; }
        public string attribut5 { get; set; }
        public string attribut6 { get; set; }
        public string creatorName { get; set; }

        public string datenereg { get; set; }

        [ForeignKey("ApplicationUser")]
        public string idUserCreator { get; set; }


        public virtual ApplicationUser ApplicationUser { get; set; }
        public virtual OrganismeSupp OrganismeSupp { get; set; }
    }
}
