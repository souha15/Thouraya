using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.NetworkInformation;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApplicationPlateforme.Controllers.Pointage
{
    [Route("api/[controller]")]
    [ApiController]
    public class GetMacAdressController : ControllerBase
    {

       
        [HttpGet]
        public string GetMacAdress()
        {
            string macAddresses = "";

            foreach (NetworkInterface nic in NetworkInterface.GetAllNetworkInterfaces())
            {
                if (nic.OperationalStatus == OperationalStatus.Up)
                {
                    macAddresses += nic.GetPhysicalAddress().ToString();
                    break;
                }
            }

            var builder = new StringBuilder(macAddresses);
            for (int i = builder.Length - 2; i > 0; i -= 2)
            {
                builder.Insert(i, ':');
            }





            return builder.ToString();
        }

    }
}