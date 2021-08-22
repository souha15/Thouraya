using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Controllers.UserControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationUserController : ControllerBase
    {
        private UserManager<ApplicationUser> _userManager;
        // private SignInManager<ApplicationUser> _singInManager;
        private readonly ApplicationSettings _appSettings;
  
        public ApplicationUserController(UserManager<ApplicationUser> userManager, IOptions<ApplicationSettings> appSettings/*, SignInManager<ApplicationUser> signInManager*/)
        {
            _userManager = userManager;
            //_singInManager = signInManager;
            _appSettings = appSettings.Value;
            
        }

        [HttpPost]
        [Route("Register")]
        //POST : /api/ApplicationUser/Register
        public async Task<Object> PostApplicationUser(ApplicationUserModel model)
        {
     
          
            var applicationUser = new ApplicationUser()
            {
              
                UserName = model.UserName,
                Email = model.Email,
                registreCivil = model.registreCivil,
                FullNameEnglish = model.FullNameEnglish,
                FullName = model.FullName,
                adresse = model.adresse,
                PhoneNumber = model.PhoneNumber,
                tel = model.tel,
                statut = model.statut,
                nationalite = model.nationalite,
                religion = model.religion,
                sexe = model.sexe,
                dateNaissance = model.dateNaissance,
                lieuNaissance = model.lieuNaissance,
                passeport = model.passeport,
                typeSang = model.typeSang,
                num = model.num,
                emploi = model.emploi,
                rang = model.rang,
                typeEmploi=model.typeEmploi,
                nomAdministration = model.nomAdministration,
                nomDepartement = model.nomDepartement,
                unite=model.unite,
                qualification=model.qualification,
                typeQualification=model.typeQualification,
                faculteEcole= model.faculteEcole,
                dateQualification=model.dateQualification,
                specialite=model.specialite,
                paysetude=model.paysetude,
                mention=model.mention,
                classement=model.classement,
                degre=model.degre,
                salaire=model.salaire,
                indemnite=model.indemnite,
                autreIndemnite=model.autreIndemnite,
                heureArrive=model.heureArrive,
                heureDepart=model.heureDepart,
                photo=model.photo,
                idAdministration=model.idAdministration,
                idDepartement=model.idDepartement,
                directeur = model.directeur,
                position=model.position,
                attribut1=model.attribut1,
                attribut2=model.attribut2,
                attribut3=model.attribut3,
                attribut4=model.attribut4,
                attribut5=model.attribut5,
                attribut6=model.attribut6,
                soldeconge=model.soldeconge,
                daterectrutement=model.daterectrutement,
                etatuser=model.etatuser,
                dateenreg=model.dateenreg,
                userNameCreator=model.userNameCreator,
                idUserCreator=model.idUserCreator

            };

            try
            {
                var result = await _userManager.CreateAsync(applicationUser, model.Password);
                //await _userManager.AddToRoleAsync(applicationUser, model.Roles);
             //   await _userManager.AddClaimAsync(applicationUser, new Claim(ClaimTypes.Email, model.Email));

                await _userManager.AddToRolesAsync(applicationUser, model.Roles);
                return Ok(result);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        [HttpPost]
        [Route("Login")]
        //POST : /api/ApplicationUser/Login
        public async Task<IActionResult> Login(LoginModel model)
        {
            var user = await _userManager.FindByNameAsync(model.UserName);
            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                //Get the Role assigned to this user 
                var role = await _userManager.GetRolesAsync(user);
                IdentityOptions _options = new IdentityOptions();
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim("UserID",user.Id.ToString()),
                        new Claim(_options.ClaimsIdentity.RoleClaimType,role.FirstOrDefault())
                    }),
                    Expires = DateTime.UtcNow.AddDays(1),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.JWT_Secret)), SecurityAlgorithms.HmacSha256Signature)
                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                var token = tokenHandler.WriteToken(securityToken);
                return Ok(new { token });
            }
            else
                return BadRequest(new { message = "Username or password is incorrect." });
        }

        [HttpPost]
        [Route("ChangePassword")]
        //POST : /api/ApplicationUser/Register
        public async Task<IActionResult> ChangePassword(ApplicationUserModel model)
        {
            var user = await _userManager.FindByIdAsync(model.Id);
            /*   if(user!= null  && await _userManager.CheckPasswordAsync(user, model.Password)) { 
              user.PasswordHash = _userManager.PasswordHasher.HashPassword(user, model.Password);
              var result = await _userManager.UpdateAsync(user);
              var code = await _userManager.GeneratePasswordResetTokenAsync(user);
              }

              else 
              {
                  return NotFound();
              }*/
            if (user==null) {
                return NotFound();
            }

            user.PasswordHash = _userManager.PasswordHasher.HashPassword(user, model.Password);
            var result = await _userManager.UpdateAsync(user);
            var code = await _userManager.GeneratePasswordResetTokenAsync(user);
            
            if(!result.Succeeded) 
            {
                
            }

            return Ok();

        }

        [HttpGet("{id}")]
        [Route("Getuserrole")]
        public async Task<ActionResult> GetUserRoleAsync(string UserId)
        {
            var user = await _userManager.FindByIdAsync(UserId);
            //var roles = await _userManager.GetRolesAsync(user);
            return Ok();
          /*  if (user == null)
            {
                return NotFound();
            }


            return Ok(new { User = user, Roles = roles });*/
        }

    }


}