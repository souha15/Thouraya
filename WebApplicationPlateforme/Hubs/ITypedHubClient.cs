using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplicationPlateforme.Hubs
{
    public interface ITypedHubClient
    {
        Task BroadcastMessage(string type, string payload);
        //Task BroadcastMessage(string type, string payload, string connectionId);
    }
}
