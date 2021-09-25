using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Global;

namespace WebApplicationPlateforme.Controllers.GlobalControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdmnistrationByNameController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public AdmnistrationByNameController(ApplicationDbContext context)
        {
            _context = context;
        }


        [HttpGet("{Nom}")]
        public object GetAdmin(string Nom)
        {
            var admin = _context.administrations.FirstOrDefault(item => item.Nom == Nom);

            return admin;
        }

    }
}