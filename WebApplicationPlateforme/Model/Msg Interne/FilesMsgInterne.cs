using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplicationPlateforme.Model.Msg_Interne
{
    public class FilesMsgInterne
    {
        public int Id { get; set; }
        public string path { get; set; }
        public string type { get; set; }
        [ForeignKey("MsgInterne")]
        public int idMsg { get; set; }

        public virtual MsgInterne MsgInterne { get; set; }
    }
}
