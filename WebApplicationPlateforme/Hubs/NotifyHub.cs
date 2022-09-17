using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading.Tasks;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.AutomaticNotification;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Hubs
{

    public class NotifyHub : Hub
    {
        private UserManager<ApplicationUser> _userManager;
        private readonly NotificationContext _context;

        public NotifyHub(UserManager<ApplicationUser> userManager,
             NotificationContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        public ApplicationUser GetUserProfile(string userId)
        {
            ApplicationUser user = _userManager.Users.FirstOrDefault(u => u.Id == userId);
            return user;
        }


        public override Task OnDisconnectedAsync(Exception exception)
        {
            string currUserId = _context.Connections.Where(c => c.signalrId == Context.ConnectionId).Select(c => c.userId).SingleOrDefault();
            _context.Connections.RemoveRange(_context.Connections.Where(p => p.userId == currUserId).ToList());
            _context.SaveChanges();
            Clients.Others.SendAsync("userOff", currUserId);
            return base.OnDisconnectedAsync(exception);
        }

        public async Task askServer(string userId, string userName, string conn)
        {
            ApplicationUser user = new ApplicationUser();
            user = GetUserProfile(userId);

            if (user != null)
            {
                userName = user.UserName;
                conn = Context.ConnectionId;

                connection curUser = new connection
                {
                    userId = user.Id,
                    userName = user.FullName,
                    signalrId = Context.ConnectionId,
                    timeStamp = DateTime.Now,
                    photo = user.photo,
                    timeMsg = DateTime.Now.ToShortTimeString().ToString(),
                    dateMsg = DateTime.Now.ToShortDateString().ToString(),
                };

                await _context.AddAsync(curUser);
                _context.SaveChanges();
                connection newConn = curUser;
                await Clients.Caller.SendAsync("authResponseSuccess", userId, userName, conn);
                // Get current UserOnline  
                await Clients.Others.SendAsync("userOn", newConn);
                //             await Clients.Client(this.Context.ConnectionId).SendAsync("authResponseFail");
            }
            else
            {
                await Clients.Caller.SendAsync("authResponseFail");
            }


        }

        public void logOut(string userId)
        {
            _context.RemoveRange(_context.Connections.Where(p => p.userId == userId).ToList());
            _context.SaveChanges();
            Clients.Caller.SendAsync("logoutResponse");
            Clients.Others.SendAsync("userOff", userId);
        }

        public async Task getOnlineUsers()
        {
            var currUserId = _context.Connections.Where(c => c.signalrId == Context.ConnectionId).Select(c => c.userId).SingleOrDefault();

            List<connection> onlineUsers = new List<connection>();
            onlineUsers = _context.Connections.Where(item => item.userId != currUserId).ToList();

            await Clients.Caller.SendAsync("getOnlineUsersResponse", onlineUsers);
        }


        // Get User Data from ConnectionId 
        public connection GetUserDataFromConnId(string connId)
        {
            connection userCon;
            userCon = _context.Connections.Where(item => item.signalrId == connId).FirstOrDefault();

            return userCon;
        }

        public async Task sendMsg(string connId, string msg)
        {

            // Get Current User Name Receiver 
            connection userConSender = GetUserDataFromConnId(Context.ConnectionId);
            connection userConReceiver = GetUserDataFromConnId(connId);

            string userSenderName = userConSender.userName;
            string userReceiverName = userConReceiver.userName;

            AutomaticNotif notif = new AutomaticNotif
            {
                connectionIdReceiver = connId,
                connectionIdtransmitter = Context.ConnectionId,
                receiverName = userConReceiver.userName,
                receiverId = userConReceiver.userId,
                transmitterName = userConSender.userName,
                transmitterId = userConSender.userId,
                dateSend = DateTime.Now,
                text = msg,
                shortDate = DateTime.Now.ToShortDateString().ToString(),
                shortTime = DateTime.Now.ToShortTimeString().ToString(),
                vu = "0",
                reponse = "0",

            };
            await _context.AddAsync(notif);
            _context.SaveChanges();

            await Clients.Client(connId).SendAsync("sendMsgResponse", Context.ConnectionId, msg, userSenderName, userReceiverName);
        }

    }
}
// private readonly static ConnectionMapping<string> _connections =
//     new ConnectionMapping<string>();
// private readonly IHttpContextAccessor _httpContextAccessor;

// public NotifyHub(IHttpContextAccessor httpContextAccessor) =>
//_httpContextAccessor = httpContextAccessor;

// //public string  GetUserID()
// //{
// //    string userId;
// //    userId = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
// //    return userId;
// //}
// [Authorize]
// public void SendMessageToUser(string connectionId, string message)
// {
//     string name = Context.User.Identity.Name;
//     foreach (var connectionIds in _connections.GetConnections(connectionId))
//     {
//       //  Clients.Client(connectionIds).addChatMessage(name + ": " + message);
//          Clients.Client(connectionIds).SendAsync("ReceiveMessage", message);
//     }


// }


// public  Task SendMessage(string user, string message)
// {
//     return Clients.User(user).SendAsync("UserReceiveMessage", message);
// }


// public Task SendPrivateMessage(string user, string message)
//    {
//        return Clients.User(user).SendAsync("UserReceiveMessage", message);
//    }

// [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
// public override async Task OnConnectedAsync()
// {
//    string name = Context.User.Identity.Name;
//     _connections.Add(name, Context.ConnectionId);
//    // string userId = Context.User.Claims.First(c => c.Type == "UserID").Value;
//     await Clients.All.SendAsync("UserConnected", Context.ConnectionId);
//     await  base.OnConnectedAsync();
// }

// public override async Task OnDisconnectedAsync(Exception exception)
// {
//     //string name = Context.User.Identity.Name;
//     //_connections.Remove("UserDisconnected", Context.ConnectionId);
//    await Clients.All.SendAsync("UserDisconnected", Context.ConnectionId);
//     await base.OnDisconnectedAsync(exception);
// }

// public  async Task OnReconnected()
// {
//     string name = Context.User.Identity.Name;

//     if (!_connections.GetConnections(name).Contains(Context.ConnectionId))
//     {
//         _connections.Add(name, Context.ConnectionId);
//     }

//     return ;
// }