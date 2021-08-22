using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Model.Projets
{
    public class OrganismeSupp
    {
        public int Id { get; set; }
        public string nom { get; set; }
        public string tel { get; set; }
        public string email { get; set; }
        public string fax { get; set; }
        public string nomResp { get; set; }
        public string jobResp { get; set; }
        public string numTel { get; set; }
        public string attibut1 { get; set; }
        public string attribut2 { get; set; }
        public string attribut3 { get; set; }
        public string attribut4 { get; set; }
        public string attribut5 { get; set; }
        public string creatorName { get; set; }

        public string datenereg { get; set; }
   
    }
}
