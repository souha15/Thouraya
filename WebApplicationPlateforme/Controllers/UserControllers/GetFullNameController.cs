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
    public class GetFullNameController : ControllerBase
    {
        private UserManager<ApplicationUser> _userManager;
        public GetFullNameController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }


        //GET : /api/User/GetusersByUserName/5
        [HttpGet("{FullName}")]

        public object GetusersByFullName(string FullName)
        {
            var user =_userManager.Users.FirstOrDefault(u => u.FullName == FullName);
        return user;
        }
    }
}

