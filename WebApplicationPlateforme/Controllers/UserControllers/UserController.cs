using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Controllers.UserControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContext _context;
        public UserController(UserManager<ApplicationUser> userManager, ApplicationDbContext context)
        {
            _userManager = userManager;
            _context = context;
        }
        //GET : /api/User
        [HttpGet]
        public object Getusers()
        {
            var users = _userManager.Users.ToList();
            return users;
        }

        //GET : /api/User/5
        [HttpGet("{id}")]
        public object GetusersById(string Id)
        {
            var user = _userManager.Users.FirstOrDefault(u => u.Id == Id);
            
            return user;
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            try
            {
                var result = await _userManager.DeleteAsync(user);
                
                return Ok(result);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        [HttpPut("{id}")]
        //GET : /api/User/5

        public async Task<Object> PutUser(ApplicationUserModel model)
        {
            /* var user = _userManager.Users.FirstOrDefault(u => u.Id == Id);

             return user;*/
            ApplicationUser user = await _userManager.FindByIdAsync(model.Id);

            user.UserName = model.UserName;
            user.Email = model.Email;
            user.registreCivil = model.registreCivil;
            user.FullNameEnglish = model.FullNameEnglish;
            user.FullName = model.FullName;
            user.adresse = model.adresse;
            user.PhoneNumber = model.PhoneNumber;
            user.tel = model.tel;
            user.statut = model.statut;
            user.nationalite = model.nationalite;
            user.religion = model.religion;
            user.sexe = model.sexe;
            user.dateNaissance = model.dateNaissance;
            user.lieuNaissance = model.lieuNaissance;
            user.passeport = model.passeport;
            user.typeSang = model.typeSang;
            user.num = model.num;
            user.emploi = model.emploi;
            user.rang = model.rang;
            user.typeEmploi = model.typeEmploi;
            user.nomAdministration = model.nomAdministration;
            user.nomDepartement = model.nomDepartement;
            user.unite = model.unite;
            user.qualification = model.qualification;
            user.typeQualification = model.typeQualification;
            user.faculteEcole = model.faculteEcole;
            user.dateQualification = model.dateQualification;
            user.specialite = model.specialite;
            user.paysetude = model.paysetude;
            user.mention = model.mention;
            user.classement = model.classement;
            user.degre = model.degre;
            user.salaire = model.salaire;
            user.indemnite = model.indemnite;
            user.autreIndemnite = model.autreIndemnite;
            user.heureArrive = model.heureArrive;
            user.heureDepart = model.heureDepart;
            user.photo = model.photo;
            user.idAdministration = model.idAdministration;
            user.idDepartement = model.idDepartement;
            user.directeur = model.directeur;
            user.position = model.position;
            user.attribut1 = model.attribut1;
            user.attribut2 = model.attribut2;
            user.attribut3 = model.attribut3;
            user.attribut4 = model.attribut4;
            user.attribut5 = model.attribut5;
            user.attribut6 = model.attribut6;
            var result = await _userManager.UpdateAsync(user);
            return user;
        }
        /*
        [HttpPut("{id}")]
         public async Task<IActionResult> PutUser(string id,ApplicationUser user)
         {
             user = await _userManager.FindByIdAsync(id);
             if(user == null)
             {
                 return NotFound();
             }

             try
             {
                 var result = await _userManager.UpdateAsync(user);

                 return Ok(result);
             }
             catch(Exception ex){
                 throw ex;
             }

         }
         */


    }

}