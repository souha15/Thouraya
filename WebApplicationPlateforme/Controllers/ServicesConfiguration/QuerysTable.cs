using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplicationPlateforme.Controllers.ServicesConfiguration
{
    public class QuerysTable
    {
        public int Id { get; set; }
        public int serviceId { get;set;}
        public string roleName { get;set;}
        public string UpdateQuery { get;set;}
        public string AddQuery { get;set;}
        public string GetQuery  { get;set;}
        public string GetFunc { get;set;}
        public string UpdateFunc { get;set;}
        public string AddFunc { get;set;}
    }
}
