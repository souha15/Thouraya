using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplicationPlateforme.Model.GestionDestTickets
{
    public class FilesGestionTickets
    {
        public int Id { get; set; }
        public string type { get; set; }
        public string path { get; set; }


        [ForeignKey("GestionTickets")]
        public int idTicket { get; set; }


        public virtual GestionTickets GestionTickets { get; set; }
    }
}
