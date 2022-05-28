using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Ressource_Humaines;

namespace WebApplicationPlateforme.Controllers.RH
{
    [Route("api/[controller]")]
    [ApiController]
    public class EquipementByUserCreatorController : ControllerBase
    {
        private readonly FinanceContext _context;
  

        public EquipementByUserCreatorController(FinanceContext context)
        {
            _context = context;

        }



        // GET: api/Recrutements/5

        [HttpGet("{id}")]
        public List<Equipement> GetRecrutementUsers(string id)
        {
            List<Equipement> recrutementDir = new List<Equipement>();
            recrutementDir = _context.equipements.Where(item => item.idUserCreator == id).OrderBy(item => item.Id).ToList();
            return recrutementDir;

        }
    }
}