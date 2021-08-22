using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Model.ServiceRh
{
    public class SupHeure
    {
        public int Id { get; set; }
        public string username{get;set;}
        [ForeignKey("ApplicationUser")]
        public string userId{get;set;}
        public string numUser {get;set;}
        public string nbHeure {get;set;}
        public string date{get;set;}
        public string valeur{get;set;}
        public string moisPay{get;set;}
        public string detail {get;set;}
        public string photo {get;set;}
        public int attribut1 { get; set; }
public string attribut2 { get; set; }
public string attribut3 { get; set; }
public string attribut4 { get; set; }
public string attribut5 { get; set; }
public string attribut6 { get; set; }
public string dateenreg { get; set; }
public string userNameCreator { get; set; }


public string idUserCreator { get; set; }

public virtual ApplicationUser ApplicationUser { get; set; }
    }
}
