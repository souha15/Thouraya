using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplicationPlateforme.EmailSender
{
    public class SmtpSettings
    {
        public string Server { get; set; }
        public string Port { get; set; }
        public string senderName { get; set; }
        public string senderEmail { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}
