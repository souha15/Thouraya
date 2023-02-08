using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Controllers.ServicesConfiguration;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Ressource_Humaines;
using WebApplicationPlateforme.Model.ServicesConfiguration;
using WebApplicationPlateforme.Model.User;
using WebApplicationPlateforme.Services;

namespace WebApplicationPlateforme.Controllers.RH
{
    [Route("api/[controller]")]
    [ApiController]
    public class EquipementsController : ControllerBase
    {
        private readonly FinanceContext _context;
        private readonly DawaaContext _contextD;
        private UserManager<ApplicationUser> UserManager;
        private readonly ApplicationDbContext ApplicationDbContext;
        public EquipementsController(FinanceContext context, DawaaContext contextD,
           UserManager<ApplicationUser> _UserManager, ApplicationDbContext _ApplicationDbContext)
        {
            _context = context;
            _contextD = contextD;
            UserManager = _UserManager;
            ApplicationDbContext = _ApplicationDbContext;
        }

        // GET: api/Equipements
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Equipement>>> Getequipements()
        {
            return await _context.equipements.OrderBy(item => item.Id).ToListAsync();
        }

        // GET: api/Equipements/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Equipement>> GetEquipement(int id)
        {
            var equipement = await _context.equipements.FindAsync(id);

            if (equipement == null)
            {
                return NotFound();
            }

            return equipement;
        }

        // PUT: api/Equipements/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEquipement(int id, Equipement equipement)
        {
            if (id != equipement.Id)
            {
                return BadRequest();
            }

            _context.Entry(equipement).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EquipementExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Equipements
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.

        Dictionary<String, String> equipementVar = new Dictionary<String, String>();

        Dictionary<String, String> csVar = new Dictionary<String, String>();

        [HttpPost]
        public async Task<ActionResult<Equipement>> PostEquipement(Equipement equipement)
        {
            ConfigService cs = new ConfigService();
            QuerysTable cq = new QuerysTable();
            List<QuerysTable> cqList = new List<QuerysTable>();
            //ApplicationUser user = new ApplicationUser();
            cs = _contextD.ConfigServices.Where(item => item.serviceId == 3).FirstOrDefault();
            cqList = _contextD.QuerysTables.ToList();

            Type type = typeof(UsersManip);
            //user =  GetUserProfile();
            object[] constructorParameters = new object[]
 {
    UserManager,
    ApplicationDbContext
 };

            // Fill RolesId and Permission Var Dic 

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
            ///  get csVar  Keys

            List<string> csVarKeys = csVar.Keys.ToList();

            ///  get csVar  Values


            List<string> csVarValues = csVar.Values.ToList();

            ApplicationUser dir = new ApplicationUser();

            for (int i = 1; i <= cs.rolesNb; i++)
            {
                string roleName = csVarValues[i - 1];
                cq = _contextD.QuerysTables.Where(item => item.roleName == roleName).FirstOrDefault();
                object instance = Activator.CreateInstance(type, constructorParameters);
                MethodInfo methodInfo = type.GetMethod(cq.AddFunc);
                ParameterInfo[] parameters = methodInfo.GetParameters();
                if (parameters.Count() == 0)
                {
                    dir = (ApplicationUser)methodInfo.Invoke(instance, null);
                }
                else
                {
                    object parameterObject = equipement.idUserCreator;
                    dir = (ApplicationUser)methodInfo.Invoke(instance, new object[] { equipement.idUserCreator });


                }

                equipementVar.Add("equipement.userName" + i.ToString(), dir.FullName);
                equipementVar.Add("equipement.userId" + i.ToString(), dir.Id);
                equipementVar.Add("equipement.userEtat" + i.ToString(), "في الإنتظار");

            }

            // Get Permission Var Values

            List<string> EquipementVarValues = equipementVar.Values.ToList();



            ///// Fill Permission Model 

            if (cs.rolesNb == 1)
            {
                equipement.userName1 = equipementVar["equipement.userName1"];
                equipement.userId1 = equipementVar["equipement.userId1"];
                equipement.userEtat1 = "في الإنتظار";
            }
            else if (cs.rolesNb == 2)
            {
                equipement.userName1 = equipementVar["equipement.userName1"];
                equipement.userId1 = equipementVar["equipement.userId1"];
                equipement.userEtat1 = "في الإنتظار";
                equipement.userName2 = equipementVar["equipement.userName2"];
                equipement.userId2 = equipementVar["equipement.userId2"];
                equipement.userEtat2 = "في الإنتظار";
            }
            else if (cs.rolesNb == 3)
            {
                equipement.userName1 = equipementVar["equipement.userName1"];
                equipement.userId1 = equipementVar["equipement.userId1"];
                equipement.userEtat1 = "في الإنتظار";
                equipement.userName2 = equipementVar["equipement.userName2"];
                equipement.userId2 = equipementVar["equipement.userId2"];
                equipement.userEtat2 = "في الإنتظار";
                equipement.userName3 = equipementVar["equipement.userName3"];
                equipement.userId3 = equipementVar["equipement.userId3"];
                equipement.userEtat3 = "في الإنتظار";
            }
            else if (cs.rolesNb == 4)
            {
                equipement.userName1 = equipementVar["equipement.userName1"];
                equipement.userId1 = equipementVar["equipement.userId1"];
                equipement.userEtat1 = "في الإنتظار";
                equipement.userName2 = equipementVar["equipement.userName2"];
                equipement.userId2 = equipementVar["equipement.userId2"];
                equipement.userEtat2 = "في الإنتظار";
                equipement.userName3 = equipementVar["equipement.userName3"];
                equipement.userId3 = equipementVar["equipement.userId3"];
                equipement.userEtat3 = "في الإنتظار";
                equipement.userName4 = equipementVar["equipement.userName4"];
                equipement.userId4 = equipementVar["equipement.userId4"];
                equipement.userEtat4 = "في الإنتظار";
            }
            else if (cs.rolesNb == 5)
            {
                equipement.userName1 = equipementVar["equipement.userName1"];
                equipement.userId1 = equipementVar["equipement.userId1"];
                equipement.userEtat1 = "في الإنتظار";
                equipement.userName2 = equipementVar["equipement.userName2"];
                equipement.userId2 = equipementVar["equipement.userId2"];
                equipement.userEtat2 = "في الإنتظار";
                equipement.userName3 = equipementVar["equipement.userName3"];
                equipement.userId3 = equipementVar["equipement.userId3"];
                equipement.userEtat3 = "في الإنتظار";
                equipement.userName4 = equipementVar["equipement.userName4"];
                equipement.userId4 = equipementVar["equipement.userId4"];
                equipement.userEtat4 = "في الإنتظار";
                equipement.userName5 = equipementVar["equipement.userName5"];
                equipement.userId5 = equipementVar["equipement.userId5"];
                equipement.userEtat5 = "في الإنتظار";
            }
            else if (cs.rolesNb == 6)
            {
                equipement.userName1 = equipementVar["equipement.userName1"];
                equipement.userId1 = equipementVar["equipement.userId1"];
                equipement.userEtat1 = "في الإنتظار";
                equipement.userName2 = equipementVar["equipement.userName2"];
                equipement.userId2 = equipementVar["equipement.userId2"];
                equipement.userEtat2 = "في الإنتظار";
                equipement.userName3 = equipementVar["equipement.userName3"];
                equipement.userId3 = equipementVar["equipement.userId3"];
                equipement.userEtat3 = "في الإنتظار";
                equipement.userName4 = equipementVar["equipement.userName4"];
                equipement.userId4 = equipementVar["equipement.userId4"];
                equipement.userEtat4 = "في الإنتظار";
                equipement.userName5 = equipementVar["equipement.userName5"];
                equipement.userId5 = equipementVar["equipement.userId5"];
                equipement.userEtat5 = "في الإنتظار";
                equipement.userName6 = equipementVar["equipement.userName6"];
                equipement.userId6 = equipementVar["equipement.userId6"];
                equipement.userEtat6 = "في الإنتظار";
            }
            else if (cs.rolesNb == 7)
            {
                equipement.userName1 = equipementVar["equipement.userName1"];
                equipement.userId1 = equipementVar["equipement.userId1"];
                equipement.userEtat1 = "في الإنتظار";
                equipement.userName2 = equipementVar["equipement.userName2"];
                equipement.userId2 = equipementVar["equipement.userId2"];
                equipement.userEtat2 = "في الإنتظار";
                equipement.userName3 = equipementVar["equipement.userName3"];
                equipement.userId3 = equipementVar["equipement.userId3"];
                equipement.userEtat3 = "في الإنتظار";
                equipement.userName4 = equipementVar["equipement.userName4"];
                equipement.userId4 = equipementVar["equipement.userId4"];
                equipement.userEtat4 = "في الإنتظار";
                equipement.userName5 = equipementVar["equipement.userName5"];
                equipement.userId5 = equipementVar["equipement.userId5"];
                equipement.userEtat5 = "في الإنتظار";
                equipement.userName6 = equipementVar["equipement.userName6"];
                equipement.userId6 = equipementVar["equipement.userId6"];
                equipement.userEtat6 = "في الإنتظار";
                equipement.userName7 = equipementVar["equipement.userName7"];
                equipement.userId7 = equipementVar["equipement.userId7"];
                equipement.userEtat7 = "في الإنتظار";
            }
            else if (cs.rolesNb == 8)
            {
                equipement.userName1 = equipementVar["equipement.userName1"];
                equipement.userId1 = equipementVar["equipement.userId1"];
                equipement.userEtat1 = "في الإنتظار";
                equipement.userName2 = equipementVar["equipement.userName2"];
                equipement.userId2 = equipementVar["equipement.userId2"];
                equipement.userEtat2 = "في الإنتظار";
                equipement.userName3 = equipementVar["equipement.userName3"];
                equipement.userId3 = equipementVar["equipement.userId3"];
                equipement.userEtat3 = "في الإنتظار";
                equipement.userName4 = equipementVar["equipement.userName4"];
                equipement.userId4 = equipementVar["equipement.userId4"];
                equipement.userEtat4 = "في الإنتظار";
                equipement.userName5 = equipementVar["equipement.userName5"];
                equipement.userId5 = equipementVar["equipement.userId5"];
                equipement.userEtat5 = "في الإنتظار";
                equipement.userName6 = equipementVar["equipement.userName6"];
                equipement.userId6 = equipementVar["equipement.userId6"];
                equipement.userEtat6 = "في الإنتظار";
                equipement.userName7 = equipementVar["equipement.userName7"];
                equipement.userId7 = equipementVar["equipement.userId7"];
                equipement.userEtat7 = "في الإنتظار";
                equipement.userName8 = equipementVar["equipement.userName8"];
                equipement.userId8 = equipementVar["equipement.userId8"];
                equipement.userEtat8 = "في الإنتظار";
            }

            equipement.etat = "في الإنتظار";
            DateTime dateTimeNow = DateTime.Now; // Return 00/00/0000 00:00:00
            string dateOnly = dateTimeNow.ToShortDateString(); //Return 00/00/0000
            equipement.dateenreg = dateOnly;

            _context.equipements.Add(equipement);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEquipement", new { id = equipement.Id }, equipement);
        }


        [HttpGet]
        [Route("GetEquipementByUserCreator/{userId}")]

        public List<Equipement> GetEquipementByUserCreator(string userId)
        {
            List<Equipement> UserEquipement = new List<Equipement>();
            UserEquipement = _context.equipements.Where(item => item.idUserCreator == userId).ToList();
            return UserEquipement;
        }

        [HttpGet]
        [Route("GetEquipementDemand/{userId}")]
        public List<Equipement> GetEquipementDemand(string userId)
        {
            List<Equipement> UserEquipements = new List<Equipement>();
            List<Equipement> AllEquipements = new List<Equipement>();
            ConfigService cs = new ConfigService();
            cs = _contextD.ConfigServices.Where(item => item.serviceId == 3).FirstOrDefault();
            AllEquipements = _context.equipements.ToList();
            for (int i = 0; i < AllEquipements.Count; i++)
            {
                if (AllEquipements[i].userId1 == userId && AllEquipements[i].userEtat1 == "في الإنتظار")
                {
                    UserEquipements.Add(AllEquipements[i]);
                }

                else if (AllEquipements[i].userId2 == userId && AllEquipements[i].userEtat2 == "في الإنتظار" && AllEquipements[i].userEtat1 == "موافق")
                {
                    UserEquipements.Add(AllEquipements[i]);
                }

                else if (AllEquipements[i].userId3 == userId && AllEquipements[i].userEtat3 == "في الإنتظار" && AllEquipements[i].userEtat2 == "موافق")
                {
                    UserEquipements.Add(AllEquipements[i]);
                }

                else if (AllEquipements[i].userId4 == userId && AllEquipements[i].userEtat4 == "في الإنتظار" && AllEquipements[i].userEtat3 == "موافق")
                {
                    UserEquipements.Add(AllEquipements[i]);
                }

                else if (AllEquipements[i].userId5 == userId && AllEquipements[i].userEtat5 == "في الإنتظار" && AllEquipements[i].userEtat4 == "موافق")
                {
                    UserEquipements.Add(AllEquipements[i]);
                }

                else if (AllEquipements[i].userId6 == userId && AllEquipements[i].userEtat6 == "في الإنتظار" && AllEquipements[i].userEtat5 == "موافق")
                {
                    UserEquipements.Add(AllEquipements[i]);
                }

                else if (AllEquipements[i].userId7 == userId && AllEquipements[i].userEtat7 == "في الإنتظار" && AllEquipements[i].userEtat6 == "موافق")
                {
                    UserEquipements.Add(AllEquipements[i]);
                }

                else if (AllEquipements[i].userId8 == userId && AllEquipements[i].userEtat8 == "في الإنتظار" && AllEquipements[i].userEtat7 == "موافق")
                {
                    UserEquipements.Add(AllEquipements[i]);
                }


            }


            return UserEquipements;
        }

        [HttpGet]
        [Route("GetEquipementHistorique/{id}")]
        public Equipement GetEquipementHistorique(int id)
        {
            Equipement equipement = new Equipement();
            ConfigService cs = new ConfigService();
            equipement = _context.equipements.Where(item => item.Id == id).FirstOrDefault();
            cs = _contextD.ConfigServices.Where(item => item.serviceId == 3).FirstOrDefault();
            string rslt = "";


            // Traiter le cas d'accepter la demande par tt le monde 

            if (equipement.etat == "موافق")
            {
                rslt = "لقد تمت الموافقة على الطلب من قبل جميع الأطراف";
            }

            // Traiter le cas de refuser la demande par quelqu'un cas par cas  

            else if (equipement.etat == "رفض")
            {
                if (equipement.userEtat1 == "رفض")
                {
                    rslt = "لقد تم رفض الطلب من قبل " + cs.roleName1;
                }
                else if (equipement.userEtat2 == "رفض")
                {
                    rslt = "لقد تم رفض الطلب من قبل " + cs.roleName2;
                }
                else if (equipement.userEtat3 == "رفض")
                {
                    rslt = "لقد تم رفض الطلب من قبل " + cs.roleName3;
                }
                else if (equipement.userEtat4 == "رفض")
                {
                    rslt = "لقد تم رفض الطلب من قبل " + cs.roleName4;

                }
                else if (equipement.userEtat5 == "رفض")
                {
                    rslt = "لقد تم رفض الطلب من قبل " + cs.roleName5;
                }
                else if (equipement.userEtat6 == "رفض")
                {
                    rslt = "لقد تم رفض الطلب من قبل " + cs.roleName6;
                }
                else if (equipement.userEtat7 == "رفض")
                {
                    rslt = "لقد تم رفض الطلب من قبل " + cs.roleName7;
                }
                else if (equipement.userEtat8 == "رفض")
                {
                    rslt = "لقد تم رفض الطلب من قبل " + cs.roleName8;
                }
            }

            // Traiter les cas d'attente et d'accept cas par cas 
            else
            {
                if (equipement.userEtat1 == "في الإنتظار")
                {
                    rslt = " لم تتم معالجة الطلب من قبل " + cs.roleName1;
                }

                else if (equipement.userEtat1 == "موافق" && equipement.userEtat2 == "في الإنتظار")
                {
                    rslt = "وافق " + cs.roleName1 + " على الطلب ولكن الطلب معلق عند " + cs.roleName2;
                }
                else if (equipement.userEtat2 == "موافق" && equipement.userEtat3 == "في الإنتظار")
                {
                    rslt = "وافق " + cs.roleName2 + " على الطلب ولكن الطلب معلق عند  " + cs.roleName3;
                }
                else if (equipement.userEtat3 == "موافق" && equipement.userEtat4 == "في الإنتظار")
                {
                    rslt = "وافق " + cs.roleName3 + " على الطلب ولكن الطلب معلق عند " + cs.roleName4;
                }
                else if (equipement.userEtat4 == "موافق" && equipement.userEtat5 == "في الإنتظار")
                {
                    rslt = "وافق " + cs.roleName3 + " على الطلب ولكن الطلب معلق عند  " + cs.roleName5;
                }
                else if (equipement.userEtat5 == "موافق" && equipement.userEtat6 == "في الإنتظار")
                {
                    rslt = "وافق " + cs.roleName5 + " على الطلب ولكن الطلب معلق عند" + cs.roleName6;
                }
                else if (equipement.userEtat6 == "موافق" && equipement.userEtat7 == "في الإنتظار")
                {
                    rslt = "وافق " + cs.roleName6 + " على الطلب ولكن الطلب معلق عند" + cs.roleName7;
                }
                else if (equipement.userEtat7 == "موافق" && equipement.userEtat8 == "في الإنتظار")
                {
                    rslt = "وافق " + cs.roleName7 + " على الطلب ولكن الطلب معلق عند" + cs.roleName8;
                }
            }
            equipement.attribut6 = rslt;

            return equipement;
        }

        [Route("EditDemandByRole/{Id}/{userEtat}")]

        public Equipement EditDemandByRole(int Id, string userEtat)
        {

            Equipement equipement = new Equipement();
            ConfigService cs = new ConfigService();
            DateTime dateTimeNow = DateTime.Now; // Return 00/00/0000 00:00:00
            string dateOnly = dateTimeNow.ToShortDateString(); //Return 00/00/0000
            cs = _contextD.ConfigServices.Where(item => item.serviceId == 3).FirstOrDefault();
            equipement = _context.equipements.Where(item => item.Id == Id).FirstOrDefault();

            if (equipement.userEtat1 == "في الإنتظار")
            {
                if (userEtat != "رفض")
                {
                    equipement.userEtat1 = userEtat;
                    equipement.userDate1 = dateOnly;
                    if (cs.rolesNb > 1)
                    {
                        equipement.iddir = equipement.userId2;
                        equipement.nomdir = equipement.userName2;

                    }
                }
                else
                {
                    equipement.userEtat1 = userEtat;
                    equipement.userDate1 = dateOnly;
                    equipement.etat = "رفض";
                }

            }
            else if (equipement.userEtat1 == "موافق" && equipement.userEtat2 == "في الإنتظار")
            {
                if (userEtat != "رفض")
                {
                    equipement.userEtat2 = userEtat;
                    equipement.userDate2 = dateOnly;
                    if (cs.rolesNb > 2)
                    {
                        equipement.iddir = equipement.userId3;
                        equipement.nomdir = equipement.userName3;
                    }
                }
                else
                {
                    equipement.userEtat2 = userEtat;
                    equipement.userDate2 = dateOnly;
                    equipement.etat = "رفض";
                }
            }
            else if (equipement.userEtat2 == "موافق" && equipement.userEtat3 == "في الإنتظار")
            {
                if (userEtat != "رفض")
                {
                    equipement.userEtat3 = userEtat;
                    equipement.userDate3 = dateOnly;
                    if (cs.rolesNb > 3)
                    {
                        equipement.iddir = equipement.userId4;
                        equipement.nomdir = equipement.userName4;
                    }
                }
                else
                {
                    equipement.userEtat3 = userEtat;
                    equipement.userDate3 = dateOnly;
                    equipement.etat = "رفض";
                }
            }
            else if (equipement.userEtat3 == "موافق" && equipement.userEtat4 == "في الإنتظار")
            {
                if (userEtat != "رفض")
                {
                    equipement.userEtat4 = userEtat;
                    equipement.userDate4 = dateOnly;
                    if (cs.rolesNb > 4)
                    {
                        equipement.iddir = equipement.userId5;
                        equipement.nomdir = equipement.userName5;
                    }
                }
                else
                {
                    equipement.userEtat4 = userEtat;
                    equipement.userDate4 = dateOnly;
                    equipement.etat = "رفض";
                }
            }
            else if (equipement.userEtat4 == "موافق" && equipement.userEtat5 == "في الإنتظار")
            {
                if (userEtat != "رفض")
                {
                    equipement.userEtat5 = userEtat;
                    equipement.userDate5 = dateOnly;
                    if (cs.rolesNb > 5)
                    {
                        equipement.iddir = equipement.userId6;
                        equipement.nomdir = equipement.userName6;
                    }
                }
                else
                {
                    equipement.userEtat5 = userEtat;
                    equipement.userDate5 = dateOnly;
                    equipement.etat = "رفض";
                }
            }
            else if (equipement.userEtat5 == "موافق" && equipement.userEtat6 == "في الإنتظار")
            {
                if (userEtat != "رفض")
                {
                    equipement.userEtat6 = userEtat;
                    equipement.userDate6 = dateOnly;
                    if (cs.rolesNb > 6)
                    {
                        equipement.iddir = equipement.userId7;
                        equipement.nomdir = equipement.userName7;
                    }
                }
                else
                {
                    equipement.userEtat6 = userEtat;
                    equipement.userDate6 = dateOnly;
                    equipement.etat = "رفض";
                }
            }
            else if (equipement.userEtat6 == "موافق" && equipement.userEtat7 == "في الإنتظار")
            {
                if (userEtat != "رفض")
                {
                    equipement.userEtat7 = userEtat;
                    equipement.userDate7 = dateOnly;
                    if (cs.rolesNb > 7)
                    {
                        equipement.iddir = equipement.userId8;
                        equipement.nomdir = equipement.userName8;
                    }
                }
                else
                {
                    equipement.userEtat7 = userEtat;
                    equipement.userDate7 = dateOnly;
                    equipement.etat = "رفض";
                }
            }
            else if (equipement.userEtat7 == "موافق" && equipement.userEtat8 == "في الإنتظار")
            {
                if (userEtat != "رفض")
                {
                    equipement.userEtat8 = userEtat;
                    equipement.userDate8 = dateOnly;
                }
                else
                {
                    equipement.userEtat8 = userEtat;
                    equipement.userDate8 = dateOnly;
                    equipement.etat = "رفض";
                }
            }

            if (cs.rolesNb == 1 && equipement.userEtat1 == "موافق")
            {
                equipement.etat = "موافق";
            }
            else if (cs.rolesNb == 2 && equipement.userEtat2 == "موافق")
            {
                equipement.etat = "موافق";

            }
            else if (cs.rolesNb == 3 && equipement.userEtat3 == "موافق")
            {
                equipement.etat = "موافق";
            }
            else if (cs.rolesNb == 4 && equipement.userEtat4 == "موافق")
            {
                equipement.etat = "موافق";
            }
            else if (cs.rolesNb == 5 && equipement.userEtat5 == "موافق")
            {
                equipement.etat = "موافق";
            }
            else if (cs.rolesNb == 6 && equipement.userEtat6 == "موافق")
            {
                equipement.etat = "موافق";
            }
            else if (cs.rolesNb == 7 && equipement.userEtat7 == "موافق")
            {
                equipement.etat = "موافق";
            }
            else if (cs.rolesNb == 8 && equipement.userEtat8 == "موافق")
            {
                equipement.etat = "موافق";
            }


            return equipement;

        }
        // DELETE: api/Equipements/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Equipement>> DeleteEquipement(int id)
        {
            var equipement = await _context.equipements.FindAsync(id);
            if (equipement == null)
            {
                return NotFound();
            }

            _context.equipements.Remove(equipement);
            await _context.SaveChangesAsync();

            return equipement;
        }

        private bool EquipementExists(int id)
        {
            return _context.equipements.Any(e => e.Id == id);
        }
    }
}
