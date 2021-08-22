using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.Global;

namespace WebApplicationPlateforme.Model.User
{
    public class ApplicationUser :IdentityUser
    {
       
        public string registreCivil { get; set; }
        public string FullNameEnglish { get; set; }
  
        public string FullName { get; set; }
        public string adresse { get; set; }
    
        public string tel { get; set; }
        public string statut { get; set; }
        public string nationalite { get; set; }
        public string religion { get; set; }
        public string sexe { get; set; }
        public string dateNaissance { get; set; }
        public string lieuNaissance { get; set; }
        public string passeport { get; set; }
        public string typeSang { get; set; }
        public string num { get; set; }
        public string emploi { get; set; }
        public string rang { get; set; }
        public string typeEmploi { get; set; }
        public string nomAdministration { get; set; }
        public string nomDepartement { get; set; }
        public string unite { get; set; }
        public string qualification { get; set; }
        public string typeQualification { get; set; }
        public string faculteEcole { get; set; }
        public string dateQualification { get; set; }
        public string specialite { get; set; }
        public string paysetude { get; set; }
        public string mention { get; set; }
        public string classement { get; set; }
        public string degre { get; set; }
        public string salaire { get; set; }
        public string indemnite { get; set; }
        public string autreIndemnite { get; set; }
        public string heureArrive { get; set; }
        public string heureDepart { get; set; }
        public string directeur { get; set; }
        public string position { get; set; }
        public string attribut1 { get; set; }
        public string attribut2 { get; set; }
        public string attribut3 { get; set; }
        public string attribut4 { get; set; }
        public string attribut5 { get; set; }
        public string attribut6 { get; set; }
        public string photo { get; set; }
        public string soldeconge { get; set; }
        public string daterectrutement { get; set; }
        public string etatuser { get; set; }
        public string dateenreg { get; set; }
        public string userNameCreator { get; set; }
        public string idUserCreator { get; set; }

        [ForeignKey("Administration")]
        public int? idAdministration { get; set; }

       
        [ForeignKey("Departement")]
        public int? idDepartement { get; set; }

        public virtual Administration Administration { get; set; }

        public virtual Departement Departement { get; set; }
    }
}
