using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading.Tasks;

namespace WebApplicationPlateforme.Hubs
{

    public class NotifyHub : Hub/*<ITypedHubClient>*/
    {
        public Task SendMessageToUser(string connectionId, string message)
        {
              return Clients.Client(connectionId).SendAsync("ReceiveMessage", message);
            //return Clients.User(user).SendAsync("ReceiveMessage", message);
        }

        //Context.User.Identity.Name??
        public  Task SendMessage(string user, string message)
        {
            return Clients.User(user).SendAsync("UserReceiveMessage", message);
        }


        public Task SendPrivateMessage(string user, string message)
           {
               return Clients.User(user).SendAsync("UserReceiveMessage", message);
           }

        public override async Task OnConnectedAsync()
        {
            // await Clients.All.SendAsync("UserConnected",Context.ConnectionId);
            await Clients.All.SendAsync("UserConnected", Context.ConnectionId);
            await  base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await Clients.All.SendAsync("UserDisconnected", Context.ConnectionId);
            await base.OnDisconnectedAsync(exception);
        }
    }
}
