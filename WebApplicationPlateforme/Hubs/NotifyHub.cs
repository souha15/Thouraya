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

        public async Task sendMsg(string connId, string msg, AutomaticNotif model)
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
                reponse = model.reponse,
                pageUrl=model.pageUrl,
                serviceId = model.serviceId,
                userType =model.userType

            };
            await _context.AddAsync(notif);
            _context.SaveChanges();

            await Clients.Client(connId).SendAsync("sendMsgResponse", Context.ConnectionId, msg, userSenderName, userReceiverName);
        }

    }
}
