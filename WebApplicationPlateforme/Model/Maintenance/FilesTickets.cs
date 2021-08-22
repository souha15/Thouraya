using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplicationPlateforme.Model.Maintenance
{
    public class FilesTickets
    {
        public int Id { get; set; }
        public string path { get; set; }
        public string type { get; set; }


        [ForeignKey("Ticket")]
        public int idTic { get; set; }

        public virtual Ticket Ticket { get; set; }
    }
}
