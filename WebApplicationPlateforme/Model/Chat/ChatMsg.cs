using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplicationPlateforme.Model.Chat
{
    public class ChatMsg
    {
        public int Id { get; set; }
        public string emeteurId { get; set; }
        public string emeteurNom { get; set; }       
        public string recepteurId { get; set; }
        public string recepteurNom { get; set; }
        public string dateEnvoi { get; set; }
        public string text { get; set; }
        public string piecesJointe { get; set; }
        public string vu { get; set; }
        public string notif { get; set; }
        public string timeEnvoi { get; set; }
    }
}
