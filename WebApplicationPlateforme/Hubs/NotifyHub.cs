using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Concurrent;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading.Tasks;

namespace WebApplicationPlateforme.Hubs
{

    public class NotifyHub : Hub/*<ITypedHubClient>*/
    {
        private readonly static ConnectionMapping<string> _connections =
            new ConnectionMapping<string>();
        private readonly IHttpContextAccessor _httpContextAccessor;

        public NotifyHub(IHttpContextAccessor httpContextAccessor) =>
       _httpContextAccessor = httpContextAccessor;

        //public string  GetUserID()
        //{
        //    string userId;
        //    userId = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
        //    return userId;
        //}
        [Authorize]
        public void SendMessageToUser(string connectionId, string message)
        {
            string name = Context.User.Identity.Name;
            foreach (var connectionIds in _connections.GetConnections(connectionId))
            {
              //  Clients.Client(connectionIds).addChatMessage(name + ": " + message);
                 Clients.Client(connectionIds).SendAsync("ReceiveMessage", message);
            }
           
           
        }


        public  Task SendMessage(string user, string message)
        {
            return Clients.User(user).SendAsync("UserReceiveMessage", message);
        }


        public Task SendPrivateMessage(string user, string message)
           {
               return Clients.User(user).SendAsync("UserReceiveMessage", message);
           }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public override async Task OnConnectedAsync()
        {
           string name = Context.User.Identity.Name;
            _connections.Add(name, Context.ConnectionId);
           // string userId = Context.User.Claims.First(c => c.Type == "UserID").Value;
            await Clients.All.SendAsync("UserConnected", Context.ConnectionId);
            await  base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            //string name = Context.User.Identity.Name;
            //_connections.Remove("UserDisconnected", Context.ConnectionId);
           await Clients.All.SendAsync("UserDisconnected", Context.ConnectionId);
            await base.OnDisconnectedAsync(exception);
        }

        public  async Task OnReconnected()
        {
            string name = Context.User.Identity.Name;

            if (!_connections.GetConnections(name).Contains(Context.ConnectionId))
            {
                _connections.Add(name, Context.ConnectionId);
            }

            return ;
        }
    }
}
