using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Model.AutomaticNotification
{
    public class connection
    {
        public int Id { get; set; }
        [ForeignKey("user")]
        public string userId { get; set; }
        public string userName { get; set; }
        public string signalrId { get; set; }
        public string photo { get; set; }
        public DateTime timeStamp { get; set; }
        public string timeMsg { get; set; }
        public string dateMsg { get; set; }

        public virtual ApplicationUser user { get; set; }
    }
}
