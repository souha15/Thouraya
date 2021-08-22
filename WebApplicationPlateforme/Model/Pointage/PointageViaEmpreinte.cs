using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplicationPlateforme.Model.Pointage
{
    public class PointageViaEmpreinte
    {
        public int Id { get; set; }
        public string date { get; set; }
        public string heureAssister { get; set; }
        public string heurePartir { get; set; }
        public string numEmp { get; set; }
        public string present { get; set; }
        public string absent { get; set; }
        public string numEmpreinte { get; set; }
        public string attribut1 { get; set; }
        public string attribut2 { get; set; }
        public string attribut3 { get; set; }
        public string attribut4 { get; set; }
        public string attribut5 { get; set; }
    }
}
