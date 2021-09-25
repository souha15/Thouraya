using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Model.MediaCenter.ImpressionDesign
{
    public class DesignImpression
    {
        public int Id { get; set; }
        public string nomdesign {get;set;}
        public string etat{get;set;}
        public string iddir{get;set;}
        public string nomdir {get;set;}
        public string datedir{get;set;}
        public string transfertA {get;set;}
        public string transfertAdmin { get;set;}
        public string transfertEmployee { get;set;}
        public string datetransfertAdmin { get;set;}
        public string dattransfertEmployee { get;set;}
        public string idadminEmp {get;set;}
        public string nomadminEmp { get;set;}
        public string dateadminEmp { get;set;}
        public string etatidadminEmp { get;set;}
        public string dateDebadminEmp { get;set;}
        public string dateFinadminEmp { get;set;}
        public string dateRecepadminEmp { get;set;}
        public string dateDoneadminEmp { get;set;}
        public string transfertdminEmp { get;set;}
        public string idEmp{get;set;}
        public string nomEmp { get;set;}
        public string dateEmp { get;set;}
        public string etatEmp { get;set;}
        public string tranfertEmp { get;set;}
        public string dateDebutEmp { get;set;}
        public string dateFinEmp { get;set;}
        public string dateReceptiondateEmp { get;set;}
        public string dateTransfertEmp { get; set; }
        public string tavailfait {get;set;}
        public string adminid { get; set; }
        public string adminom { get; set; }
        public string admietat { get; set; }
        public string admidate { get; set; }
        public string etabnom { get; set; }
        public string etabid { get; set; }
        public string etabetat { get; set; }
        public string etabdate { get; set; }
        public string attribut1 { get; set; }
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
