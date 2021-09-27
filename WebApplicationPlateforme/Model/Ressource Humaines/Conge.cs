using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Model.Ressource_Humaines
{
    public class Conge
    {
        public int Id { get; set; }
        public string transferera { get; set; }
        public string transfereretab { get; set; }
        public string transfertrh { get; set; }
        public string transfertdeux { get; set; }
        public string datetransfert { get; set; }
        public string idtrh { get; set; }
        public string idtetab { get; set; }
        public string nomtrh { get; set; }
        public string nomtetab { get; set; }
        public string etatrh { get; set; }
        public string etatetab { get; set; }
        public string daterh { get; set; }
        public string dateetab { get; set; }
        public string tran1 { get; set; }
        public string tran2 { get; set; }
        public string tran3 { get; set; }
        public string tran4 { get; set; }
        public string tran5 { get; set; }
        public string tran6 { get; set; }

        public string datedebut { get; set; }
        public string datefin {get;set;}
        public string duree {get;set;}
        public string tel {get;set;}
        public string type {get;set;}
        public string adr{get;set;}
        public string idremplacant {get;set;}
        public string nomremplacant{get;set;}
        public string etat {get;set;}
        public string etatd {get;set;}
        public string directeurid{get;set;}
        public string directeurnom{get;set;}
        public string rhid{get;set;}
        public string rhnom {get;set;}
        public string dated{get;set;}
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
