using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Model.AdministrativeCommunication
{
    public class Transaction
    {
        public int Id { get; set; }
        public string type{get;set;}
        public string date {get;set;}
        public string typeRecue {get;set;}
        public string priorite {get;set;}
        public string securite {get;set;}
        public string nomOrg {get;set;}
        public string nomProp {get;set;}
        public string tel {get;set;}
        public string registreCivil {get;set;}
        public string numAutorite {get;set;}
        public string sujet {get;set;}
        public string typeEmise {get;set;}
        public string nomLivreur{get;set;}
        public string operationlivraison{get;set;}
        public string orgEnregTr {get;set;}
        public string autoriteExterne{get;set;}
        public string copieExterne {get;set;}
        public string copieA {get;set;}
        public string nbPjNumerique{get;set;}
        public string nbPj {get;set;}
        public string remarque{get;set;}
        public string action {get;set;}
        public string typeInterne {get;set;}
        public string dateFinisAction{get;set;}
        public string autoriteExpeditrice {get;set;}
        public string dateFinis{get;set;}
        public int attribut1 {get;set;}
        public string attribut2 { get;set;}
        public string attribut3 {get;set;}
        public string attribut4 { get;set;}
        public string attribut5  { get;set;}
        public string attribut6 { get;set;}
        public string etablissementUserCreator {get;set;}
        public int idEtablissementUserCreator { get;set;}
        public string etat {get;set;}
        public string dateenreg {get;set;}
        public string userNameCreator {get;set;}

        public int idlivreur { get; set; }
        public int idAutoriteExterne { get; set; }

        [ForeignKey("Organisme")]
        public int? idOrg { get; set; }

        [ForeignKey("Proprietaire")]
        public int? idProp { get; set; }

        [ForeignKey("ApplicationUser")]
        public string idUserCreator { get; set; }

        public virtual ApplicationUser ApplicationUser { get; set; }
        public virtual Proprietaire Proprietaire { get; set; }
        public virtual Organisme Organisme { get; set; }
}
}
