using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Controllers.UserControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserByRoleController : ControllerBase
    {
        private UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContext _context;
        private RoleManager<IdentityRole> _roleManager;
        public UserByRoleController(UserManager<ApplicationUser> userManager, ApplicationDbContext context, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _context = context;
            _roleManager = roleManager;
        }

        // GET: api/UserByRole/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserRole(string Id)
        {
            var user =   _userManager.Users.FirstOrDefault(u => u.Id == Id);
            var rolesName = await  _userManager.GetRolesAsync(user);
            return Ok(rolesName);
        }

        /*  [HttpDelete("{id}")]
          public async Task<IActionResult> DeleteUserfromRole(string Id, string roleName)
          {
              var user = _userManager.Users.FirstOrDefault(u => u.Id == Id);

              IdentityResult delresult = await _userManager.RemoveFromRoleAsync(user, roleName);

                  return Ok(delresult);



      }*/
        [HttpDelete]
        [Route("RemoveFromRole/{userId}/roles/{roleName}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> RemoveFromRole(string userId, string roleName)
        {
            var user = _userManager.Users.FirstOrDefault(u => u.Id == userId);
    
            //get user's assigned roles
            IList<string> userRoles = await _userManager.GetRolesAsync(user);

            //check for role to be removed
            var roleToRemove = userRoles.FirstOrDefault(role => role.Equals(roleName, StringComparison.InvariantCultureIgnoreCase));
    
            var result = await _userManager.RemoveFromRoleAsync(user, roleToRemove);
         
                return Ok(result);

        
        }

        [HttpPost]
        [Route("AddUserRole/{userId}/roles/{roleName}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<Object> AddUserRole(string userId, string roleName)
        {
            var user = _userManager.Users.FirstOrDefault(u => u.Id == userId);
           var result = await _userManager.AddToRoleAsync(user, roleName);
           
            return Ok(result);
        }
    }



}
