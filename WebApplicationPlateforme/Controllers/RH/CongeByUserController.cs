using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Ressource_Humaines;

namespace WebApplicationPlateforme.Controllers.RH
{
    [Route("api/[controller]")]
    [ApiController]
    public class CongeByUserController : ControllerBase
    {
        private readonly FinanceContext _context;
        
        public CongeByUserController(FinanceContext context)
        {
            _context = context;
        }

        [HttpGet("{idUserCreator}")]
        public List<Conge> GetSolde(string idUserCreator)
        {
            var cgList = _context.conges.ToList();
            var soldeConge = _context.conges.Where(item => item.directeurid == idUserCreator && item.etatd == "في الانتظار").OrderBy(item=> item.Id).ToList();  
            return soldeConge;
        }
    }
}