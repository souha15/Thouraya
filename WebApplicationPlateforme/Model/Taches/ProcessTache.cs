using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplicationPlateforme.Model.Taches
{
    public class ProcessTache
    {
        public int Id { get; set; }
        public string date { get; set; }
        public string affectationtype { get; set; }
        public string idusercreator { get; set; }
        public string iduseraffected { get; set; }
        public string nomuseraff { get; set; }
        public string nomusercreator { get; set; }
        public string action { get; set; }
        public string raison { get; set; }
        public string etataff { get; set; }
        public string etatuserscreator { get; set; }
        public string dateaff { get; set; }
        public string dateusercreator { get; set; }
        public string dateaction { get; set; }
        public string attribut1 { get; set; }
        public string attribut2 { get; set; }
        public string attribut3 { get; set; }
        public string attribut4 { get; set; }
        public string attribut5 { get; set; }
        public string attribut6 { get; set; }
        public int idtache { get; set; }
    }
}
