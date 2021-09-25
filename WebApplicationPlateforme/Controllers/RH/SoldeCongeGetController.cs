using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApplicationPlateforme.Data;

namespace WebApplicationPlateforme.Controllers.RH
{
    [Route("api/[controller]")]
    [ApiController]
    public class SoldeCongeGetController : ControllerBase
    {
        private readonly FinanceContext _context;

        public SoldeCongeGetController(FinanceContext context)
        {
            _context = context;
        }

        [HttpGet("{idUserCreator}")]
        public object GetSolde(string idUserCreator)
        {
            var soldeConge = _context.soldeConges.FirstOrDefault(u => u.idUserCreator == idUserCreator);

            return soldeConge;
        }
    }
}