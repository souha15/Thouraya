using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Allmaintenance;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Controllers.Maintenance
{
    [Route("api/[controller]")]
    [ApiController]
    public class AllMaintenanceByUserCreatorController : ControllerBase
    {
        private readonly DawaaContext _context;
        private UserManager<ApplicationUser> _userManager;
        public AllMaintenanceByUserCreatorController(UserManager<ApplicationUser> userManager, DawaaContext context)
        {
            _context = context;
            _userManager = userManager;
        }


        public async Task<string> GetUserConnectedAsync()
        {

            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _userManager.FindByIdAsync(userId);
            return user.Id;


        }
        [HttpGet("ByUserCreator/{id}")]
        public List<AllTypeOfMaintenance> GetByUserCreator(string id)
        {
            List<AllTypeOfMaintenance> ListByCreatorUser = new List<AllTypeOfMaintenance>();
            ListByCreatorUser = _context.AllTypeOfMaintenance.Where(item => item.idUserCreator == id).ToList();
            return ListByCreatorUser;
        }

        [HttpGet("ByDir/{id}")]
        public List<AllTypeOfMaintenance> GetByDir(string id)
        {
            List<AllTypeOfMaintenance> ListByCreatorUser = new List<AllTypeOfMaintenance>();
            ListByCreatorUser = _context.AllTypeOfMaintenance.Where(item => item.iddir == id && item.etadir == "في الإنتظار").ToList();
            return ListByCreatorUser;
        }

        [HttpGet("ByEmployee/{id}")]
        public List<AllTypeOfMaintenance> GetByEmployee(string id)
        {
            List<AllTypeOfMaintenance> ListByCreatorUser = new List<AllTypeOfMaintenance>();
            ListByCreatorUser = _context.AllTypeOfMaintenance.Where(item => item.employeeid == id && item.etatemployee == "في الإنتظار").ToList();
            return ListByCreatorUser;
        }
    }
}