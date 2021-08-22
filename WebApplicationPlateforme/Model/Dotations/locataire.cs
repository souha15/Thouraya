using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Model.Dotations
{
    public class locataire
    {
        public int Id { get; set; }
     
        public string nom{ get; set; }
        public string cin{ get; set; }
        public string profession{ get; set; }
        public string adresse { get; set; }
        public string nationnalite{ get; set; }
        public string tel{ get; set; }

        public int attribut1 { get; set; }
        public string attribut2 { get; set; }
        public string attribut3 { get; set; }
        public string attribue4 { get; set; }

        public string dateenreg { get; set; }
        public string CreatorName { get; set; }


        [ForeignKey("ApplicationUser")]
        public string idUserCreator { get; set; }


        public virtual ApplicationUser ApplicationUser { get; set; }
    }
}
