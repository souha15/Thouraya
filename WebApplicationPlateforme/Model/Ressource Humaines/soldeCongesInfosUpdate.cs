using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplicationPlateforme.Model.Ressource_Humaines
{
    public class soldeCongesInfosUpdate
    {
        public int Id { get; set; }
        public DateTime date { get; set; }
        public int day { get; set; }
        public int month { get; set; }
        public int year { get; set; }
        public string updated { get; set; }
        public string cuurentdate { get; set; }

    }
}
