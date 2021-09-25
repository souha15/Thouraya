using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Model.Media_Center.InterviewPart
{
    public class Interview
    {
        public int Id { get; set; }
        public string type { get; set; }
        public string nomProg { get; set; }
        public string ideeProg { get; set; }
        public string butProg { get; set; }
        public string dureeProg { get; set; }
        public string nomEvent { get; set; }
        public string dateEvent { get; set; }
        public string etabEvent { get; set; }
        public string Autre { get; set; }
        public string but { get; set; }
        public string BenefBut { get; set; }
        public string Budget { get; set; }
        public string dirid { get; set; }
        public string  dirnom { get; set; }
        public string diretat { get; set; }
        public string dirdate { get; set; }
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
