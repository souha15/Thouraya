using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using WebApplicationPlateforme.Hubs;
using WebApplicationPlateforme.Model.Message;

namespace WebApplicationPlateforme.Controllers.MessageHub
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessageController : ControllerBase
    {
       /*private IHubContext<NotifyHub, ITypedHubClient> _hubContext;

        public MessageController(IHubContext<NotifyHub, ITypedHubClient> hubContext)
        {
            _hubContext = hubContext;
        }

        [HttpPost]
        public string Post([FromBody]MessageNot msg)
        {
            string retMessage;
            try
            {
                _hubContext.Clients.All.BroadcastMessage(msg.Type, msg.Payload);
                retMessage = "Success";
            }
            catch (Exception e)
            {
                retMessage = e.ToString();
            }
            return retMessage;
        }*/
    }
}