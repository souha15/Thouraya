using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplicationPlateforme.Model.User
{
    public class ResetPassword
    {
     
        public string Id { get; set; }
     
        public string PreviousPassword { get; set; }
        public string NewPassword { get; set; }

       // public string ConfirmPassword { get; set; }

    }
}
