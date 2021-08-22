using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplicationPlateforme.Model.Ticket
{
    public class NotifTicket2
    {
        public int Id { get; set; }
        public string path { get; set; }
        public string date { get; set; }
        public string iduser { get; set; }
        public int idadmin { get; set; }
        public int idetab { get; set; }


        [ForeignKey("Ticket2")]
        public int idTicket { get; set; }

        public virtual Ticket2 Ticket2 { get; set; }
    }
}
