using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Model.Dotations
{
    public class agenceImmob
    {
        public int Id { get; set; }
        public string nom { get; set; }
        public string nomResponsable { get; set; }
        public string tel { get; set; }
        public string fax { get; set; }
        public string phoneNumber { get; set; }
        public string adresse { get; set; }
        public string ville { get; set; }
        public string dateenreg { get; set; }
    }
}
