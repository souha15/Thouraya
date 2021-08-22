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
    public class GetUserNameController : ControllerBase
    {
        private UserManager<ApplicationUser> _userManager;
        public GetUserNameController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        //GET : /api/User/GetusersByUserName/5
        [HttpGet("{UserName}")]

        public object GetusersByUserName(string UserName)
        {
            var user = _userManager.Users.FirstOrDefault(u=>u.UserName == UserName);
            return user;
        }
        /*
                public async Task<IActionResult> SearchAsync(string UserName)
                {
                    if (UserName == null)
                    {
                        return BadRequest(new { message = "Username or password is incorrect." });
                    }

                    //var searchResult = await myRepo.SearchAsync(searchOptions);
                    var user = await _userManager.FindByNameAsync(UserName);
                    return Ok(user);
                }
            }*/
    }
}