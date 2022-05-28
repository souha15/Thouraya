using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Ressource_Humaines;
using WebApplicationPlateforme.Model.User_Services;

namespace WebApplicationPlateforme.Controllers.UserService
{
    [Route("api/[controller]")]
    [ApiController]
    public class PermissionByUserController : ControllerBase
    {
        private readonly FinanceContext _context;


        public PermissionByUserController(FinanceContext context)
        {
            _context = context;

        }



        // GET: api/Recrutements/5

        [HttpGet("{id}")]
        public List<PermissionU> GetRecrutementUsers(string id)
        {
            List<PermissionU> recrutementDir = new List<PermissionU>();
            recrutementDir = _context.permissionUs.Where(item => item.idUserCreator == id).OrderBy(item => item.Id).ToList();
            return recrutementDir;

        }
    }
}