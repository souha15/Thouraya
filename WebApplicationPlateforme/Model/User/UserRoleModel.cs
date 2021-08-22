using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplicationPlateforme.Model.User
{
    public class UserRoleModel
    {
        [Required]
        public string userId { get; set; }
        [Required]
        public string userName { get; set; }
        [Required]
        public string roleId { get; set; }
        [Required]
        public string roleName { get; set; }
    }
}
