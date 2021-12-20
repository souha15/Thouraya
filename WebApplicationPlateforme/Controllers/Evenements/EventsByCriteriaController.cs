using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Evenements;

namespace WebApplicationPlateforme.Controllers.Evenements
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsByCriteriaController : ControllerBase
    {
        private readonly FinanceContext _context;

        public EventsByCriteriaController(FinanceContext context)
        {
            _context = context;
        }

      
        /*public List <Evenement> FilterEventsByCriteria(string filter , string value)
        {
            List<Evenement> ListEvents = new List<Evenement>();
            List<Evenement> query = new List<Evenement>();
            
                if (classe.Any())
                {
                     query = ListEvents.Where(ev => ev.classe == classe).ToList();

                }

               if (evenement.Any())
               {
                   query = ListEvents.Where(ev => ev.projet == evenement).ToList();
               }

               if (dateDeb.Any() && dateFin.Any())
               {
                DateTime deb = Convert.ToDateTime(dateDeb);
                DateTime fin = Convert.ToDateTime(dateFin);

                 query = ListEvents.Where(ev => Convert.ToDateTime(ev.datetime) >= deb && Convert.ToDateTime(ev.datetime) <= fin).ToList();
               }

            return query;

        }*/
    }
}