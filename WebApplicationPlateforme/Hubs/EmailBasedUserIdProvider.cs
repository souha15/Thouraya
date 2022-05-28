using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace WebApplicationPlateforme.Hubs
{
    public class EmailBasedUserIdProvider : IUserIdProvider
    {
        public virtual string GetUserId(HubConnectionContext connection)
        {
            /*User.Claims.First(c => c.Type == "UserId").Value;*/
            //return connection.User?.FindFirst(ClaimTypes.Email)?.Value;
            return connection.User?.FindFirst(ClaimTypes.Email)?.Value;
        }
    }
}
