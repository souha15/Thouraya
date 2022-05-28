using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApplicationPlateforme.Data;

namespace WebApplicationPlateforme.Model.GestionDestTickets
{
    [Route("api/[controller]")]
    [ApiController]
    public class GetUserTicketsController : ControllerBase
    {
        private readonly DawaaContext _context;

        public GetUserTicketsController(DawaaContext context)
        {
            _context = context;
        }

        [HttpGet("{idUserCreator}")]
        public object GetUserTickets(string idUserCreator)
        {

            var tcList = _context.GestionTickets.ToList();
          
            var UserTickets = _context.GestionTickets.Where(item => item.clientId == idUserCreator ).OrderBy(item=> item.Id).ToList();

            return UserTickets;
        }
    }
}