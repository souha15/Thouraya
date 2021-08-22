using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplicationPlateforme.Model.Dotations
{
    public class depotRevenus
    {
        public int Id { get; set; }
        public string nom { get; set; }
        public string Description { get; set; }

    }
}
