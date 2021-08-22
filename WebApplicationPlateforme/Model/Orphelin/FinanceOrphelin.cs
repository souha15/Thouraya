using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplicationPlateforme.Model.Orphelin
{
    public class FinanceOrphelin
    {

        public int Id { get; set; }
        public string source { get; set; }
        public string salaire { get; set; }
        public string projetFinan { get; set; }
        public string sourceProjet { get; set; }
        public string prixProjet { get; set; }
        public string dotation { get; set; }
        public string typeDotation { get; set; }
        public string subvention { get; set; }


        public int attribut1 { get; set; }
public int attribut7 { get; set; }
public string attribut2 { get; set; }
public string attribut3 { get; set; }
public string attribut4 { get; set; }
public string attribut5 { get; set; }
public string attribut6 { get; set; }
public string dateenreg { get; set; }

[ForeignKey("Orphelin")]
public int idOrph { get; set; }

public virtual Orphelin Orphelin { get; set; }
    }
}
