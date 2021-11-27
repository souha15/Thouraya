using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplicationPlateforme.Model.GestionDestTickets
{
    public class CommentsTickets
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public string path { get; set; }
        public string userId { get; set; }
        public string userName { get; set; }
        public string dateTime { get; set; }
        public string attribut1 { get; set; }
        public string attribut2 { get; set; }
        public string attribut3 { get; set; }
        public string attribut4 { get; set; }
        public string attribut5 { get; set; }
        public string attribut6 { get; set; }
        public string attribut7 { get; set; }
        public string attribut8 { get; set; }
        
        [ForeignKey("GestionTickets")]
        public int idTicket { get; set; }


        public virtual GestionTickets GestionTickets { get; set; }
    }
}
