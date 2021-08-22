using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Controllers.UserControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserNumController : ControllerBase
    {
        private UserManager<ApplicationUser> _userManager;
        public UserNumController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }


        [HttpGet("{num}")]

        public object GetUserByNum(string num)
        {
            var user = _userManager.Users.FirstOrDefault(u => u.num == num);
            return user;
        }
    }
}