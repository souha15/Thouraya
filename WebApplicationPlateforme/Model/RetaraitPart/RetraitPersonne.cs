using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Model.RetaraitPart
{
    public class RetraitPersonne
    {
        public int Id { get; set; }
        public string nom { get; set; }
        public string tel { get; set; }
        public string organisme { get; set; }
        public string rib { get; set; }
        public string banque { get; set; }
        public int idbanque { get; set; }
        public string typedate { get; set; }
        public string datedebuthij { get; set; }
        public string datefinhij { get; set; }
        public string datedebutmiledi { get; set; }
        public string datefinmiledi  { get; set; }
        public string nombanque { get; set; }
        public string nomben { get; set; }
        public string ribben { get; set; }
        public int idben { get; set; }
        public string typedons { get; set; }
        public string prix { get; set; }
        public string delegues { get; set; }
        public string etat { get; set; }
        public string resultat { get; set; }
        public string typeRetrait  { get; set; }
        public string janvier { get; set; }
        public string fevrier{ get; set; }
        public string mars { get; set; }
        public string avril { get; set; }
        public string mai { get; set; }
        public string juin { get; set; }
        public string juillet { get; set; }
        public string aout { get; set; }
        public string septembre { get; set; }
        public string octobre { get; set; }
        public string novembre { get; set; }
        public string decembre { get; set; }
      
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
