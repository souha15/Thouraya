using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Model.Dons
{
    public class Doneur
    {
        public int Id { get; set; }
        public string type { get; set; }
        public string nom { get; set; }
        public string prenom{ get; set; }
        public string tel { get; set; }
        public string email{ get; set; }
        public string cin { get; set; }
        public string nationalite { get; set; }
        public string nomOrg{get;set; }
        public string nomDir{get;set ;}
        public string phone{get;set ;}
        public string fax{get;set; }
        public string emailOrg{get;set; }
        public string employee{get;set; }
        public string telEmp{get;set; }

        public int attribut1 { get; set; }
        public string attribut2 { get; set; }
        public string attribut3 { get; set; }
        public string attribut4 { get; set; }
        public string attribut5 { get; set; }
        public string attribut6 { get; set; }
        public string dateenreg { get; set; }
        public string userNameCreator { get; set; }

        [ForeignKey("ApplicationUser")]
        public string idUserCreator { get; set; }

        public virtual ApplicationUser ApplicationUser { get; set; }
    }
}
