
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WebApplicationPlateforme.Controllers.UserControllers;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Ressource_Humaines;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Controllers.RH
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecrutementUsersController : ControllerBase
    {
        private readonly FinanceContext _context;
        private UserManager<ApplicationUser> _userManager;

        public RecrutementUsersController(FinanceContext context , UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }



        // GET: api/Recrutements/5

        [HttpGet("{id}")]
        public List<Recrutement> GetRecrutementUsers(string id)
        {
            List<Recrutement> recrutementDir = new List<Recrutement>();
            recrutementDir = _context.recrutements.Where(item => item.iddir == id && item.etatdir == "في الانتظار").OrderBy(item => item.Id).ToList();
            return recrutementDir;

        }

    }
}