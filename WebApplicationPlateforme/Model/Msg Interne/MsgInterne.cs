using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplicationPlateforme.Model.Msg_Interne
{
    public class MsgInterne
    {
        public int Id { get; set; }
        public string date { get; set; }
        public string titre { get; set; }
        public string message { get; set; }
        public string vu { get; set; }
        public string userIdSender { get; set; }
        public string userIdReceiver { get; set; }
        public string userNameSender { get; set; }
        public string userNameReceiver { get; set; }

        public int seen { get; set; }
        public int attribut1 { get; set; }
        public int attribut2 { get; set; }
        public int attribut3 { get; set; }
        public string attribut4 { get; set; }

        public string attribut5 { get; set; }
        public string attribut6 { get; set; }
    }
}
