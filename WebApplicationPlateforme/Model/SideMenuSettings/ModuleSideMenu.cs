using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplicationPlateforme.Model.SideMenuSettings
{
    public class ModuleSideMenu
    {
        public int Id { get; set; }

        public string nom { get; set; }
        public string path { get; set; }

        [ForeignKey("SideMenuUnderMain")]
        public int idUnderMain { get; set; }
        public string nomUnderMain { get; set; }
        public string icon { get; set; }
        public int nbModules { get; set; }

        public virtual SideMenuUnderMain SideMenuUnderMain { get; set; }
    }
}
