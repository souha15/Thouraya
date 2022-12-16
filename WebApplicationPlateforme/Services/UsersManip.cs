using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Global;
using WebApplicationPlateforme.Model.ServicesConfiguration;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Services
{
    public class UsersManip
    {
        private UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContext _context;
        private readonly DawaaContext _contextD;
        public UsersManip(UserManager<ApplicationUser> userManager, ApplicationDbContext context)
        {
            _userManager = userManager;
            _context = context;
          
        }

        public UsersManip(DawaaContext contextD)
        {
            _contextD = contextD;
        }

        public ApplicationUser GetDirGeneral()
        {
            ApplicationUser dir = new ApplicationUser();
            dir = _userManager.Users.FirstOrDefault(item => item.position == "المدير التنفيذي");
            return dir;

        }


        public ApplicationUser GetDirDirecte(string id)
        {
            ApplicationUser dir = new ApplicationUser();
            ApplicationUser user = _userManager.Users.Where(item => item.Id == id).FirstOrDefault();
            if(user.position == "المدير التنفيذي")
            {
                dir = user;
            }
            else
            {
                dir = _userManager.Users.Where(item => item.Id == user.attribut1).FirstOrDefault();
            }
            
            return dir;

        }

        public ApplicationUser GetDirAdmin(string id)
        {
            ApplicationUser dir = new ApplicationUser();
            ApplicationUser user = _userManager.Users.Where(item => item.Id == id).FirstOrDefault();
            if (user.position == "المدير التنفيذي")
            {
                dir = user;
            }
            else
            {
                Administration admin = _context.administrations.Where(item => item.Id == user.idAdministration).FirstOrDefault();
                dir = _userManager.Users.Where(item => item.Id == admin.Description).FirstOrDefault();
            }

            return dir;

        }

        public ApplicationUser GetDirEtab(string id)
        {
            ApplicationUser dir = new ApplicationUser();
            ApplicationUser user = _userManager.Users.Where(item => item.Id == id).FirstOrDefault();
            if(user.position == "المدير التنفيذي"|| user.position == "مدير ادارة")
            {
                dir = user;
            }
            else
            {
                Departement etab = _context.departements.Where(item => item.Id == user.idDepartement).FirstOrDefault();
                dir = _userManager.Users.Where(item => item.Id == etab.Description).FirstOrDefault();
            }

            return dir;
        }

        public ApplicationUser GetFinDir () {

            Administration admin = _context.administrations.Where(item => item.Id == 33).FirstOrDefault();
            ApplicationUser dir = _userManager.Users.Where(item => item.Id == admin.Description).FirstOrDefault();
            return dir;
        
        }   
        
        public ApplicationUser GetDotDir() {

            Administration admin = _context.administrations.Where(item => item.Id == 34).FirstOrDefault();
            ApplicationUser dir = _userManager.Users.Where(item => item.Id == admin.Description).FirstOrDefault();
            return dir;
        
        }   
        
        public ApplicationUser GetRHDir() {

            Departement rhdep = _context.departements.Where(item => item.Id == 21).FirstOrDefault();
            ApplicationUser dir = _userManager.Users.Where(item => item.Id == rhdep.Description).FirstOrDefault();
            return dir;
        
        }

        public ApplicationUser GetComptaEmployee()
        {
            List<ApplicationUser> ListCompta = new List<ApplicationUser>();
            ListCompta = _userManager.Users.Where(item => item.emploi == "محاسب").ToList();
            Random rnd = new Random();
            int i = rnd.Next(0, ListCompta.Count()-1);
            ApplicationUser ComptaEmp = ListCompta[i];
            return ComptaEmp;
        
        }

        public ApplicationUser GetBoxEmployee()
        {
            List<ApplicationUser> ListBox = new List<ApplicationUser>();
            ListBox = _userManager.Users.Where(item => item.emploi == "أمين الصندوق ").ToList();
            Random rnd = new Random();
            int i = rnd.Next(0, ListBox.Count()-1);
            ApplicationUser BoxEmp = ListBox[i];
            return BoxEmp;

        }

        public Dictionary<String, String> csVar = new Dictionary<String, String>();

        public  List<string> GetRoles()
        {
            List<string> rolesList = new List<string>();


            ConfigService cs = new ConfigService();

            cs =  _contextD.ConfigServices.Where(item => item.serviceId == 2).FirstOrDefault();


            if (cs.rolesNb == 1)
            {
                csVar.Add("cs.roleId1", cs.roleId1);

            }
            else if (cs.rolesNb == 2)
            {
                csVar.Add("cs.roleId1", cs.roleId1);
                csVar.Add("cs.roleId2", cs.roleId2);

            }
            else if (cs.rolesNb == 3)
            {
                csVar.Add("cs.roleId1", cs.roleId1);
                csVar.Add("cs.roleId2", cs.roleId2);
                csVar.Add("cs.roleId3", cs.roleId3);

            }
            else if (cs.rolesNb == 4)
            {
                csVar.Add("cs.roleId1", cs.roleId1);
                csVar.Add("cs.roleId2", cs.roleId2);
                csVar.Add("cs.roleId3", cs.roleId3);
                csVar.Add("cs.roleId4", cs.roleId4);

            }
            else if (cs.rolesNb == 5)
            {
                csVar.Add("cs.roleId1", cs.roleId1);
                csVar.Add("cs.roleId2", cs.roleId2);
                csVar.Add("cs.roleId3", cs.roleId3);
                csVar.Add("cs.roleId4", cs.roleId4);
                csVar.Add("cs.roleId5", cs.roleId5);


            }
            else if (cs.rolesNb == 6)
            {
                csVar.Add("cs.roleId1", cs.roleId1);
                csVar.Add("cs.roleId2", cs.roleId2);
                csVar.Add("cs.roleId3", cs.roleId3);
                csVar.Add("cs.roleId4", cs.roleId4);
                csVar.Add("cs.roleId5", cs.roleId5);
                csVar.Add("cs.roleId6", cs.roleId6);


            }
            else if (cs.rolesNb == 7)
            {
                csVar.Add("cs.roleId1", cs.roleId1);
                csVar.Add("cs.roleId2", cs.roleId2);
                csVar.Add("cs.roleId3", cs.roleId3);
                csVar.Add("cs.roleId4", cs.roleId4);
                csVar.Add("cs.roleId5", cs.roleId5);
                csVar.Add("cs.roleId6", cs.roleId6);
                csVar.Add("cs.roleId7", cs.roleId7);

            }
            else if (cs.rolesNb == 8)
            {
                csVar.Add("cs.roleId1", cs.roleId1);
                csVar.Add("cs.roleId2", cs.roleId2);
                csVar.Add("cs.roleId3", cs.roleId3);
                csVar.Add("cs.roleId4", cs.roleId4);
                csVar.Add("cs.roleId5", cs.roleId5);
                csVar.Add("cs.roleId6", cs.roleId6);
                csVar.Add("cs.roleId7", cs.roleId7);
                csVar.Add("cs.roleId8", cs.roleId8);

            }

            rolesList = csVar.Values.ToList();
            return rolesList;
        }



    }
}
