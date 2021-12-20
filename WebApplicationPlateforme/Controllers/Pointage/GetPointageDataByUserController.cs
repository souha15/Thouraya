using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Pointage;

namespace WebApplicationPlateforme.Controllers.Pointage
{
    [Route("api/[controller]")]
    [ApiController]
    public class GetPointageDataByUserController : ControllerBase
    {
        private readonly FinanceContext _context;

        public GetPointageDataByUserController(FinanceContext context)
        {
            _context = context;
        }

        [HttpGet("{IdUser}")]
        public object GetData(string IdUser)
        {
            PointageUser pointage = new PointageUser();


            DateTime dateOnly = DateTime.Now;

            pointage = _context.PointageUsers.Where(item => item.idUserCreator == IdUser && item.datePresence != null && item.datePresence == dateOnly.ToShortDateString()).FirstOrDefault();
            return pointage;

        }
    }
}