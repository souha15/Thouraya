using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplicationPlateforme.Model.Finance
{
    public class BrancheTwo
    {
        public int Id { get; set; }
        public string nom { get; set; }

        [ForeignKey("BrancheOne")]
        public int idBOne { get; set; }

        public virtual BrancheOne BrancheOne { get; set; }

    }
}
