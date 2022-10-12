using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.HttpSys;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Controllers.UserControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContext _context;
        public UserProfileController(UserManager<ApplicationUser> userManager,ApplicationDbContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [AllowAnonymous]
        //GET : /api/UserProfile

        public async Task<Object> GetUserProfile()
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _userManager.FindByIdAsync(userId);
            return new
            {
              
                 user.Id,
                user.UserName,
                user.Email,
                user.registreCivil,
                user.FullNameEnglish,
                user.FullName,
                user.adresse,
                user.PhoneNumber,
                user.tel,
                user.statut,
                user.nationalite,
                user.religion,
                user.sexe,
                user.dateNaissance,
                user.lieuNaissance,
                user.passeport,
                user.typeSang,
                user.num,
                user.emploi,
                user.rang,
                user.typeEmploi,
                user.nomAdministration,
                user.nomDepartement,
                user.unite,
                user.qualification,
                user.typeQualification,
                user.faculteEcole,
                user.dateQualification,
                user.specialite,
                user.paysetude,
                user.mention,
                user.classement,
                user.degre,
                user.salaire,
                user.indemnite,
                user.autreIndemnite,
                user.heureArrive,
                user.heureDepart,
                user.photo,
                user.idAdministration,
                user.idDepartement,
                user.directeur,
                user.position,
                user.attribut1,
                user.attribut2,
                user.attribut3,
                user.attribut4,
                user.attribut5,
                user.attribut6,
                user.soldeconge,
                user.daterectrutement,
                user.etatuser,
                user.dateenreg,
                user.userNameCreator,
                user.idUserCreator,


            };
        }

        [HttpGet]
        [Route("GetAdminDir/{Id}")]
        public async Task<Object> GetDataAdminDir(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            var admin = await _context.administrations.FindAsync(user.idAdministration);
            var dir = await _userManager.FindByIdAsync(admin.Description);
            return dir;
     
        }


        [HttpGet]
        [Route("GetAdminDirFin")]
        public async Task<Object> GetDataAdminDirFin()
        {
            var admin = await _context.administrations.FindAsync(33);
            var dir = await _userManager.FindByIdAsync(admin.Description);
            return dir;

        }

        [HttpGet]
        [Route("GetAdminDirProj")]
        public async Task<Object> GetDataAdminDirProj()
        {
            var admin = await _context.administrations.FindAsync(29);
            var dir = await _userManager.FindByIdAsync(admin.Description);
            return dir;

        }

        [HttpGet]
        [Route("GetAdminDirG")]
        public object GetDataAdminDirG()
        {
            var dir =  _userManager.Users.FirstOrDefault(item => item.position == "المدير التنفيذي");
            return dir;

        }

        [HttpGet]
        [Route("GetRhDepartement")]
        public async Task<Object> GetRhDepartement()
        {
            var DirRh = await _context.departements.FindAsync(21);
            var Dir = await _userManager.FindByIdAsync(DirRh.Description);
            return Dir;

        }

        [HttpGet]
        [Route("GetEtabFin")]
        public async Task<Object> GetEtabFin()
        {
            var DirRh = await _context.departements.FindAsync(18);
            var Dir = await _userManager.FindByIdAsync(DirRh.Description);
            return Dir;

        }

        [HttpGet]
        [Route("GetDotDir")]
        public async Task<Object> GetDotDir()
        {
            var DirDot = await _context.administrations.FindAsync(34);
            var Dir = await _userManager.FindByIdAsync(DirDot.Description);
            return Dir;

        }

        [HttpGet]
        [Route("GetEtabFinList")]
        public List<ApplicationUser> GetEtabFinList()
        {
            List<ApplicationUser> ListDir = new List<ApplicationUser>();

            ListDir = _userManager.Users.Where(item => item.emploi == "محاسب").ToList();
            return ListDir;

        }

        [HttpGet]
        [Route("GetMediaDir")]
        public async Task<Object>  GetMediaDir()
        {
       
            var DirMedia = await _context.administrations.FindAsync(32);
            var Dir = await _userManager.FindByIdAsync(DirMedia.Description);
            return Dir;
           

        }



        [HttpGet]
        [Authorize(Roles = "ADMINISTRATEUR", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("ForAdmin")]
        public string GetForAdmin()
        {
            return "Web method for Admin";
        }

        [HttpGet]
        [Authorize(Roles = "EMPLOYEE", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("ForEmployee")]
        public string GetForEmployee()
        {
            return "Web method for Employee";
        }

        [HttpGet]
        [Authorize(Roles = "DIRECTORGENERAL", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("ForDirectorGeneral")]
        public string GetForDirectorGeneral()
        {
            return "Web method for general director";
        }

        [HttpGet]
        [Authorize(Roles = "DIRECTORADMN", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("ForDirector")]
        public string GetForDirector()
        {
            return "Web method for jamiya Director";
        }

        [HttpGet]
        [Authorize(Roles = "DIRECTORETAB", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("ForStagiaire")]
        public string GetForStagiaire()
        {
            return "Web method for stagiaire";
        }


        
        [HttpGet]
        [Authorize(Roles = "RESSOURCEHUMAINE", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("ForConseilAdmin")]
        public string GetForConseilAdmin()
        {
            return "Web method for ConseilAdmin";
        }




        [HttpGet]
        [Authorize(Roles = "RESPFINANCE", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("ForSupConseilAdmin")]
        public string GetForSupConseilAdmin()
        {
            return "Web method for SupConseilAdmin";
        }




        [HttpGet]
        [Authorize(Roles = "ADMINISTRATEUR,RESPFINANCE", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("ForAdminOrFinanceResp")]
        public string GetForAdminOrFinanceResp()
        {
            return "Web method for Admin Or FinanceResp";
        }


        [HttpGet]
        [Authorize(Roles = "RESPFINANCE,EMPLOYEE", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("ForConseilAdminOrFinanceResp")]
        public string GetForConseilAdminOrFinanceResp()
        {
            return "Web method for ConseilAdmin Or FinanceResp";
        }



        [HttpGet]
        [Authorize(Roles = "RESSOURCEHUMAINE,EMPLOYEE", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("ForPartRespOrFinanceResp")]
        public string GetForPartRespOrFinanceResp()
        {
            return "Web method for PartResp Or FinanceResp";
        }


        /* [HttpGet]
         [Authorize(Roles = "Admin", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
         [Route("ForAdminis")]
         public string GetForAdminis()
         {
             return "Web method for general director";
         }
         */


        /*  [HttpGet]
          [Authorize(Roles = "Director,Employee", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
          [Route("ForDirectorOrEmployee")]
          public string GetForDirectorOrEmployee()
          {
              return "Web method for Director or Employee";
          }

      */

    }
}