using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.Global;

namespace WebApplicationPlateforme.Model.SideMenuSettings
{
    public class SideMenuUnderMain
    {
        public int Id { get; set; }

        public string nom { get; set; }
        public string path { get; set; }
     
        public int idDep { get; set; }
        public string nomDep { get; set; }

        [ForeignKey("SideMenuMain")]
        public int idMain { get; set; }
        public string nomMain { get; set; }
        public int nbModules { get; set; }
        public int rang { get; set; }
      
        public virtual SideMenuMain SideMenuMain { get; set; }
    }
}
