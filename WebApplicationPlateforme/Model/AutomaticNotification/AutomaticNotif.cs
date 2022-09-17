using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplicationPlateforme.Model.AutomaticNotification
{
    public class AutomaticNotif
    {

        public int Id { get; set; }
        public string connectionIdReceiver { get; set; }
        public string connectionIdtransmitter { get; set; }
        public string receiverName { get; set; }
        public string receiverId { get; set; }
        public string transmitterName { get; set; }
        public string transmitterId { get; set; }
        public string text { get; set; }
        public DateTime dateSend { get; set; }
        public string shortDate { get; set; }
        public string shortTime { get; set; }
        public string vu { get; set; }
        public string reponse { get; set; }
        public int serviceId { get; set; }
        public string pageUrl { get; set; }
        public int idService { get; set; }
        public string userType { get; set; }

    }
}
