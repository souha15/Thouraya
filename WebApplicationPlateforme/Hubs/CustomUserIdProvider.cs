using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Hubs
{
    public class CustomUserIdProvider : IUserIdProvider
    {
        private UserManager<ApplicationUser> _userManager;

        public CustomUserIdProvider()
        {
        }

        public CustomUserIdProvider(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;


        }
        public virtual string GetUserId(HubConnectionContext connection)
        {
            return connection.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        }
    }
}
