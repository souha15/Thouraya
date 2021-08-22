using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Model.Finance
{
    public class PiecesJointesReceptionC
    {
        public int Id { get; set; }
        public string path { get; set; }
        public string type { get; set; }
        public string date { get; set; }

        public string creatorName { get; set; }

        public string datenereg { get; set; }

        [ForeignKey("ApplicationUser")]
        public string idUserCreator { get; set; }


        [ForeignKey("ChequeReception")]
        public int idRC { get; set; }

        public virtual ApplicationUser ApplicationUser { get; set; }
        public virtual ChequeReception ChequeReception { get; set; }
    }
}
