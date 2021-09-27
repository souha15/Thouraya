using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Model.NouveauMusulman
{
    public class musulman
    {
        public int Id { get; set; }
        public string numdos{ get; set; }
        public string predicateur { get; set; }
        public string prevnom { get; set; }
        public string nvnom { get; set; }
        public string  engnom{ get; set; }
        public string  datehij{ get; set; }
        public string datemil { get; set; }
        public string jours { get; set; }
        public string nat { get; set; }
        public string langue { get; set; }
        public string residence { get; set; }
        public string  dateresidence{ get; set; }
        public string sourceres { get; set; }
        public string religion { get; set; }
        public string numpass { get; set; }
        public string datepass { get; set; }
        public string sourcepass { get; set; }
        public string datenais { get; set; }
        public string travail { get; set; }
        public string cite { get; set; }
        public string adr { get; set; }
        public string telmus { get; set; }
        public string  urlsm{ get; set; }
        public string garantnom { get; set; }
        public string garanttype { get; set; }
        public string  registre{ get; set; }
        public string telgarant { get; set; }
        public string files { get; set; }
        public string pub  { get; set; }
        public string scene { get; set; }
        public string  test{ get; set; }
        public string cadeauxtest { get; set; }
        public string recep { get; set; }
        public string change { get; set; }
        public string  soiree{ get; set; }
        public string circonsion { get; set; }
        public string omra { get; set; }
        public string city { get; set; }
        public string walking { get; set; }
        public string haj { get; set; }
        public string depart { get; set; }
        public string chatdep { get; set; }
        public string req { get; set; }
        public int? attribut1 { get; set; }
        public string attribut2 { get; set; }
        public string attribut3 { get; set; }
        public string attribut4 { get; set; }
        public string attribut5 { get; set; }
        public string attribut6 { get; set; }
        public string dateenreg { get; set; }
        public string usernamecreator { get; set; }

        [ForeignKey("ApplicationUser")]
        public string idusercreator { get; set; }

        public virtual ApplicationUser ApplicationUser { get; set; }
    }
}
