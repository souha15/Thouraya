using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Model.gestion_beneficiaire
{
    public class GestionBenenficiaire
    {
        public int Id { get; set; }
        public string typeEnreg { get; set; }
        public string etat { get; set; }
        public string remarque { get; set; }
        public string etatdir { get; set; }
        public string datedir { get; set; }
        public string iddir { get; set; }
        public string nomdir { get; set; }
        public string idchercheur { get; set; }
        public string etatchercheur { get; set; }
        public string datechercheur { get; set; }
        public string nomchercheur { get; set; }
        public string nomprenom { get; set; }
        public string dateNais { get; set; }
        public string typeCin { get; set; }
        public string numCin { get; set; }
        public string natio { get; set; }
        public string tel { get; set; }
        public string sexe { get; set; }
        public string adr { get; set; }
        public string nbfamille { get; set; }
        public string dateenreg { get; set; }
        public string userNameCreator { get; set; }



        [ForeignKey("ApplicationUser")]
        public string idUserCreator { get; set; }

        public virtual ApplicationUser ApplicationUser { get; set; }
    }
}
