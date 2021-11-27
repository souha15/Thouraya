using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Model.Decision
{
    public class DecissionCommun
    {
        public int Id { get; set; }
        public int adminId { get; set; }
        public int etabId { get; set; }
        public int typeDecint { get; set; }
        public string typeDecstr { get; set; }
        public string userName { get; set; }
        public string userId { get; set; }

        public string adminName { get; set; }
        public string etabName { get; set; }
        public string num { get; set; }
        public string position { get; set; }
        public string emploi { get; set; }
        public string dateTravail { get; set; }
        public string infraction { get; set; }
        public string dateFinContratHij { get; set; }
        public string dateFinContratMil { get; set; }
        public string raison { get; set; }
        public string autre { get; set; }
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
