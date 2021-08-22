using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplicationPlateforme.Model.Projets
{
    public class ButProjet
    {
        public int Id { get; set; }
        public string but { get; set; }
        public string nbbut { get; set; }
        public string prix { get; set; }
        public string tot { get; set; }
        public string benef { get; set; }
        public string nbbenef { get; set; }
        public string attibut1 { get; set; }
        public string attribut2 { get; set; }
        public string attribut3 { get; set; }

        public string datenereg { get; set; }



        [ForeignKey("Projet")]
        public int idprojet { get; set; }


        public virtual Projet Projet { get; set; }
    }
}
