using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplicationPlateforme.Model.Msg_Interne
{
    public class NotifMsgInterne
    {
        public int Id { get; set; }
        public string date { get; set; }
        public string text { get; set; }
        public string vu { get; set; }
        public string userIdSender { get; set; }
        public string userIdReceiver { get; set; }
        public string userNameSender { get; set; }
        public string userNameReceiver { get; set; }
        public int seen { get; set; }
        [ForeignKey("MsgInterne")]
        public int idMsg { get; set; }

        public virtual MsgInterne MsgInterne { get; set; }
    }
}
