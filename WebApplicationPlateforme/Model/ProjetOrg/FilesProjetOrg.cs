using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplicationPlateforme.Model.ProjetOrg
{
    public class FilesProjetOrg
    {
        public int Id { get; set; }
        public string typec { get; set; }
        public string pathc { get; set; }


        [ForeignKey("ProjetOrg")]
        public int idprojet { get; set; }
        public virtual ProjetOrg ProjetOrg { get; set; }
    }
}
