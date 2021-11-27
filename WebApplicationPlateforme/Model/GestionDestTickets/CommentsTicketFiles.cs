using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplicationPlateforme.Model.GestionDestTickets
{
    public class CommentsTicketFiles
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public string path { get; set; }


        [ForeignKey("CommentsTickets")]
        public int idComment { get; set; }


        public virtual CommentsTickets CommentsTickets { get; set; }
    }
}
