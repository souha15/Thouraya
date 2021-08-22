using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplicationPlateforme.Model.Maintenance
{
    public class Ticket
    {
        public int Id { get; set; }
        public string date  { get; set; }
        public string titre { get; set; }
        public string prob { get; set; }
        public string details { get; set; }
        public string pageUrl { get; set; }
        public string remarque { get; set; }
        public string etatdate { get; set; }
        public string etat { get; set; }
        public int attribut1 { get; set; }
        public string attribut2 { get; set; }
        public string attribut3 { get; set; }
        public string attribut4 { get; set; }
        public string attribut5 { get; set; }
        public string attribut6 { get; set; }
        public string dateenreg { get; set; }

    }
}
