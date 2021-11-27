using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApplicationPlateforme.Data;

namespace WebApplicationPlateforme.Model.ActivitePart
{
    [Route("api/[controller]")]
    [ApiController]
    public class GetActiviteeByEtabController : ControllerBase
    {
        private readonly DawaaContext _context;

        public GetActiviteeByEtabController(DawaaContext context)
        {
            _context = context;
        }

        [HttpGet("{idetab?}")]
        public List<Activitee> GetActiviteeByEtab(int? idetab)
        {

            List<Activitee> UserTickets = new List<Activitee>();
            var tcList = _context.Activitee.ToList();
          
            if(idetab != null) { 
              UserTickets = _context.Activitee.Where(item => item.attribut1 == idetab.ToString() ||item.attribut2 == idetab.ToString() ).ToList();
            }

            return UserTickets;
        }
    }
}