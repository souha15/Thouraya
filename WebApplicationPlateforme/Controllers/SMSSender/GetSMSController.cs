using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Twilio;
using Twilio.Rest.Api.V2010.Account;

namespace WebApplicationPlateforme.Controllers.SMSSender
{
    [Route("api/[controller]")]
    [ApiController]
    public class GetSMSController : ControllerBase
    {
       public string accountSid = Environment.GetEnvironmentVariable("AC9379e23574d70a7723a7c8728df4de45");
       public string authToken = Environment.GetEnvironmentVariable("7e405a7fc580d689ffa7b59835560e3a");
        
        [HttpGet]
        [Route("GetSMS/SendSms")]
        public IActionResult SendSms()
        {

            TwilioClient.Init(accountSid, authToken);

            var message = MessageResource.Create(
                body: "Hey",
                from: new Twilio.Types.PhoneNumber("+12512447148"),
                to: new Twilio.Types.PhoneNumber("+21654980310")
            );

            return Ok("Success");
        }

        //[HttpPost]
        //public TwiMLResult ReceiveSms([FromForm]SmsRequest incomingMessage)
        //{
        //    var messagingResponse = new MessagingResponse();
        //    messagingResponse.Message("Thank you. Your message was received.");
        //    return TwiML(messagingResponse);
        //}

    }
}