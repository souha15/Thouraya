using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.Global;

namespace WebApplicationPlateforme.Model.SideMenuSettings
{
    public class SideMenuMain
    {
        public int Id { get; set; }

        public string nom { get; set; }
        public string path { get; set; }
        public int rang { get; set; }

        public int idAdmin { get; set; }
        public string nomAdmin { get; set; }
        public string icon { get; set; }
        public int nbUnderMain { get; set; }


    }
}
