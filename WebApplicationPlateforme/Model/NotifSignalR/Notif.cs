using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplicationPlateforme.Model.NotifSignalR
{
    public class Notif
    {
        public int Id { get; set; }
        public string userReceiverId { get; set; }
        public string userReceiverName { get; set; }
        public string userTransmitterId { get; set; }
        public string userTransmitterName { get; set; }
        public int serviceId  { get; set; }
        public string serviceName { get; set; }
        public string TextNotification { get; set; }
        public string date { get; set; }
        public string time { get; set; }
        public string dateTime { get; set; }
        public string readUnread { get; set; }

    }
}
