using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Model.AdministrativeCommunication
{
    public class PiecesJointesAffected
    {
        public int Id { get; set; }
        public string path { get; set; }
        public string type { get; set; }
        public string date { get; set; }

        public string CreatorName { get; set; }

        public string datenereg { get; set; }

        [ForeignKey("Transaction")]
        public int idtransaction { get; set; }

        [ForeignKey("TrAffectation")]
        public int idAffectedTr { get; set; }

        [ForeignKey("ApplicationUser")]
        public string IdUserCreator { get; set; }

        public virtual ApplicationUser ApplicationUser { get; set; }
        public virtual Transaction Transaction { get; set; }
        public virtual TrAffectation TrAffectation { get; set; }
    }
}
