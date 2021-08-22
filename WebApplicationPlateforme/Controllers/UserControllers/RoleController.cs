using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Controllers.UserControllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class RoleController : ControllerBase
    {

        private RoleManager<IdentityRole> _roleManager;

        public RoleController(RoleManager<IdentityRole> roleManager)
        {
            _roleManager = roleManager;
        }

        //Get : /api/Role
        [HttpGet]
        public ActionResult<IEnumerable<RowViewModel>> GetClaims()
        {
            var roles = _roleManager.Roles.ToList();
            var vm = new List<RowViewModel>();
            roles.ForEach(item => vm.Add(
                new RowViewModel()
                {
                    Id = item.Id,
                    Name = item.Name,
                
                }
                ));

            return vm;
        }
    }
}