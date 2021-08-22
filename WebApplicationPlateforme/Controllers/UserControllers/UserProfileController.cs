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
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Controllers.UserControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private UserManager<ApplicationUser> _userManager;
        public UserProfileController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        //GET : /api/UserProfile
        public async Task<Object> GetUserProfile()
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _userManager.FindByIdAsync(userId);
            return new
            {
                /* user.FullName,
                 user.Email,
                 user.UserName,
                 user.Id,
                 user.idAdministration,
                 user.idDepartement,
                 user.registreCivil,
                 user.num,
                 user.soldeconge,
                 user.attribut1,
                 user.directeur,
                 user.position,
                 user.classement,
                 user.FullNameEnglish,*/
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