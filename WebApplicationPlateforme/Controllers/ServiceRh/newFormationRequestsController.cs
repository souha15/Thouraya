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
using WebApplicationPlateforme.Model.ServiceRh;
using WebApplicationPlateforme.Model.ServicesConfiguration;
using WebApplicationPlateforme.Model.User;
using WebApplicationPlateforme.Services;

namespace WebApplicationPlateforme.Controllers.ServiceRh
{
    [Route("api/[controller]")]
    [ApiController]
    public class newFormationRequestsController : ControllerBase
    {
        private readonly FinanceContext _context;
        private readonly DawaaContext _contextD;
        private UserManager<ApplicationUser> UserManager;
        private readonly ApplicationDbContext ApplicationDbContext;
        public newFormationRequestsController(FinanceContext context, DawaaContext contextD,
           UserManager<ApplicationUser> _UserManager, ApplicationDbContext _ApplicationDbContext)
        {
            _context = context;
            _contextD = contextD;
            UserManager = _UserManager;
            ApplicationDbContext = _ApplicationDbContext;
        }

        // GET: api/newFormationRequests
        [HttpGet]
        public async Task<ActionResult<IEnumerable<newFormationRequest>>> GetnewFormationRequests()
        {
            return await _context.newFormationRequests.ToListAsync();
        }

        // GET: api/newFormationRequests/5
        [HttpGet("{id}")]
        public async Task<ActionResult<newFormationRequest>> GetnewFormationRequest(int id)
        {
            var newFormationRequest = await _context.newFormationRequests.FindAsync(id);

            if (newFormationRequest == null)
            {
                return NotFound();
            }

            return newFormationRequest;
        }

        // PUT: api/newFormationRequests/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutnewFormationRequest(int id, newFormationRequest newFormationRequest)
        {
            if (id != newFormationRequest.Id)
            {
                return BadRequest();
            }

            _context.Entry(newFormationRequest).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!newFormationRequestExists(id))
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

        // POST: api/newFormationRequests
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.

        Dictionary<String, String> formationVar = new Dictionary<String, String>();

        Dictionary<String, String> csVar = new Dictionary<String, String>();


        [HttpPost]
        public async Task<ActionResult<newFormationRequest>> PostnewFormationRequest(newFormationRequest newFormationRequest)
        {

            // Get Configuration Of the service 

            ConfigService cs = new ConfigService();
            QuerysTable cq = new QuerysTable();
            List<QuerysTable> cqList = new List<QuerysTable>();
            //ApplicationUser user = new ApplicationUser();
            cs = _contextD.ConfigServices.Where(item => item.serviceId == 4).FirstOrDefault();
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

            // Get Conges Var Values


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
                    object parameterObject = newFormationRequest.idUserCreator;
                    dir = (ApplicationUser)methodInfo.Invoke(instance, new object[] { newFormationRequest.idUserCreator });


                }

                formationVar.Add("newFormationRequest.userName" + i.ToString(), dir.FullName);
                formationVar.Add("newFormationRequest.userId" + i.ToString(), dir.Id);
                formationVar.Add("newFormationRequest.userEtat" + i.ToString(), "في الإنتظار");

            }

            // Get Permission Var Values

            List<string> formationVarValues = formationVar.Values.ToList();



            ///// Fill Permission Model 

            if (cs.rolesNb == 1)
            {
                newFormationRequest.userName1 = formationVar["newFormationRequest.userName1"];
                newFormationRequest.userId1 = formationVar["newFormationRequest.userId1"];
                newFormationRequest.userEtat1 = "في الإنتظار";
            }
            else if (cs.rolesNb == 2)
            {
                newFormationRequest.userName1 = formationVar["newFormationRequest.userName1"];
                newFormationRequest.userId1 = formationVar["newFormationRequest.userId1"];
                newFormationRequest.userEtat1 = "في الإنتظار";
                newFormationRequest.userName2 = formationVar["newFormationRequest.userName2"];
                newFormationRequest.userId2 = formationVar["newFormationRequest.userId2"];
                newFormationRequest.userEtat2 = "في الإنتظار";
            }
            else if (cs.rolesNb == 3)
            {
                newFormationRequest.userName1 = formationVar["newFormationRequest.userName1"];
                newFormationRequest.userId1 = formationVar["newFormationRequest.userId1"];
                newFormationRequest.userEtat1 = "في الإنتظار";
                newFormationRequest.userName2 = formationVar["newFormationRequest.userName2"];
                newFormationRequest.userId2 = formationVar["newFormationRequest.userId2"];
                newFormationRequest.userEtat2 = "في الإنتظار";
                newFormationRequest.userName3 = formationVar["newFormationRequest.userName3"];
                newFormationRequest.userId3 = formationVar["newFormationRequest.userId3"];
                newFormationRequest.userEtat3 = "في الإنتظار";
            }
            else if (cs.rolesNb == 4)
            {
                newFormationRequest.userName1 = formationVar["newFormationRequest.userName1"];
                newFormationRequest.userId1 = formationVar["newFormationRequest.userId1"];
                newFormationRequest.userEtat1 = "في الإنتظار";
                newFormationRequest.userName2 = formationVar["newFormationRequest.userName2"];
                newFormationRequest.userId2 = formationVar["newFormationRequest.userId2"];
                newFormationRequest.userEtat2 = "في الإنتظار";
                newFormationRequest.userName3 = formationVar["newFormationRequest.userName3"];
                newFormationRequest.userId3 = formationVar["newFormationRequest.userId3"];
                newFormationRequest.userEtat3 = "في الإنتظار";
                newFormationRequest.userName4 = formationVar["newFormationRequest.userName4"];
                newFormationRequest.userId4 = formationVar["newFormationRequest.userId4"];
                newFormationRequest.userEtat4 = "في الإنتظار";
            }
            else if (cs.rolesNb == 5)
            {
                newFormationRequest.userName1 = formationVar["newFormationRequest.userName1"];
                newFormationRequest.userId1 = formationVar["newFormationRequest.userId1"];
                newFormationRequest.userEtat1 = "في الإنتظار";
                newFormationRequest.userName2 = formationVar["newFormationRequest.userName2"];
                newFormationRequest.userId2 = formationVar["newFormationRequest.userId2"];
                newFormationRequest.userEtat2 = "في الإنتظار";
                newFormationRequest.userName3 = formationVar["newFormationRequest.userName3"];
                newFormationRequest.userId3 = formationVar["newFormationRequest.userId3"];
                newFormationRequest.userEtat3 = "في الإنتظار";
                newFormationRequest.userName4 = formationVar["newFormationRequest.userName4"];
                newFormationRequest.userId4 = formationVar["newFormationRequest.userId4"];
                newFormationRequest.userEtat4 = "في الإنتظار";
                newFormationRequest.userName5 = formationVar["newFormationRequest.userName5"];
                newFormationRequest.userId5 = formationVar["newFormationRequest.userId5"];
                newFormationRequest.userEtat5 = "في الإنتظار";
            }
            else if (cs.rolesNb == 6)
            {
                newFormationRequest.userName1 = formationVar["newFormationRequest.userName1"];
                newFormationRequest.userId1 = formationVar["newFormationRequest.userId1"];
                newFormationRequest.userEtat1 = "في الإنتظار";
                newFormationRequest.userName2 = formationVar["newFormationRequest.userName2"];
                newFormationRequest.userId2 = formationVar["newFormationRequest.userId2"];
                newFormationRequest.userEtat2 = "في الإنتظار";
                newFormationRequest.userName3 = formationVar["newFormationRequest.userName3"];
                newFormationRequest.userId3 = formationVar["newFormationRequest.userId3"];
                newFormationRequest.userEtat3 = "في الإنتظار";
                newFormationRequest.userName4 = formationVar["newFormationRequest.userName4"];
                newFormationRequest.userId4 = formationVar["newFormationRequest.userId4"];
                newFormationRequest.userEtat4 = "في الإنتظار";
                newFormationRequest.userName5 = formationVar["newFormationRequest.userName5"];
                newFormationRequest.userId5 = formationVar["newFormationRequest.userId5"];
                newFormationRequest.userEtat5 = "في الإنتظار";
                newFormationRequest.userName6 = formationVar["newFormationRequest.userName6"];
                newFormationRequest.userId6 = formationVar["newFormationRequest.userId6"];
                newFormationRequest.userEtat6 = "في الإنتظار";
            }
            else if (cs.rolesNb == 7)
            {
                newFormationRequest.userName1 = formationVar["newFormationRequest.userName1"];
                newFormationRequest.userId1 = formationVar["newFormationRequest.userId1"];
                newFormationRequest.userEtat1 = "في الإنتظار";
                newFormationRequest.userName2 = formationVar["newFormationRequest.userName2"];
                newFormationRequest.userId2 = formationVar["newFormationRequest.userId2"];
                newFormationRequest.userEtat2 = "في الإنتظار";
                newFormationRequest.userName3 = formationVar["newFormationRequest.userName3"];
                newFormationRequest.userId3 = formationVar["newFormationRequest.userId3"];
                newFormationRequest.userEtat3 = "في الإنتظار";
                newFormationRequest.userName4 = formationVar["newFormationRequest.userName4"];
                newFormationRequest.userId4 = formationVar["newFormationRequest.userId4"];
                newFormationRequest.userEtat4 = "في الإنتظار";
                newFormationRequest.userName5 = formationVar["newFormationRequest.userName5"];
                newFormationRequest.userId5 = formationVar["newFormationRequest.userId5"];
                newFormationRequest.userEtat5 = "في الإنتظار";
                newFormationRequest.userName6 = formationVar["newFormationRequest.userName6"];
                newFormationRequest.userId6 = formationVar["newFormationRequest.userId6"];
                newFormationRequest.userEtat6 = "في الإنتظار";
                newFormationRequest.userName7 = formationVar["newFormationRequest.userName7"];
                newFormationRequest.userId7 = formationVar["newFormationRequest.userId7"];
                newFormationRequest.userEtat7 = "في الإنتظار";
            }
            else if (cs.rolesNb == 8)
            {
                newFormationRequest.userName1 = formationVar["newFormationRequest.userName1"];
                newFormationRequest.userId1 = formationVar["newFormationRequest.userId1"];
                newFormationRequest.userEtat1 = "في الإنتظار";
                newFormationRequest.userName2 = formationVar["newFormationRequest.userName2"];
                newFormationRequest.userId2 = formationVar["newFormationRequest.userId2"];
                newFormationRequest.userEtat2 = "في الإنتظار";
                newFormationRequest.userName3 = formationVar["newFormationRequest.userName3"];
                newFormationRequest.userId3 = formationVar["newFormationRequest.userId3"];
                newFormationRequest.userEtat3 = "في الإنتظار";
                newFormationRequest.userName4 = formationVar["newFormationRequest.userName4"];
                newFormationRequest.userId4 = formationVar["newFormationRequest.userId4"];
                newFormationRequest.userEtat4 = "في الإنتظار";
                newFormationRequest.userName5 = formationVar["newFormationRequest.userName5"];
                newFormationRequest.userId5 = formationVar["newFormationRequest.userId5"];
                newFormationRequest.userEtat5 = "في الإنتظار";
                newFormationRequest.userName6 = formationVar["newFormationRequest.userName6"];
                newFormationRequest.userId6 = formationVar["newFormationRequest.userId6"];
                newFormationRequest.userEtat6 = "في الإنتظار";
                newFormationRequest.userName7 = formationVar["newFormationRequest.userName7"];
                newFormationRequest.userId7 = formationVar["newFormationRequest.userId7"];
                newFormationRequest.userEtat7 = "في الإنتظار";
                newFormationRequest.userName8 = formationVar["newFormationRequest.userName8"];
                newFormationRequest.userId8 = formationVar["newFormationRequest.userId8"];
                newFormationRequest.userEtat8 = "في الإنتظار";
            }

            newFormationRequest.etat = "في الإنتظار";
            DateTime dateTimeNow = DateTime.Now; // Return 00/00/0000 00:00:00
            string dateOnly = dateTimeNow.ToShortDateString(); //Return 00/00/0000
            newFormationRequest.dateenreg = dateOnly;
            _context.newFormationRequests.Add(newFormationRequest);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetnewFormationRequest", new { id = newFormationRequest.Id }, newFormationRequest);
        }


        [HttpGet]
        [Route("GetFormationByUserCreator/{userId}")]

        public List<newFormationRequest> GetFormationByUserCreator(string userId)
        {
            List<newFormationRequest> UserFormation = new List<newFormationRequest>();
            UserFormation = _context.newFormationRequests.Where(item => item.idUserCreator == userId).ToList();
            return UserFormation;
        }


        [HttpGet]
        [Route("GetFormationDemand/{userId}")]

        public List<newFormationRequest> GetFormationDemand(string userId)
        {


            List<newFormationRequest> UserFormation = new List<newFormationRequest>();
            List<newFormationRequest> AllFormations = new List<newFormationRequest>();
            ConfigService cs = new ConfigService();
            cs = _contextD.ConfigServices.Where(item => item.serviceId == 4).FirstOrDefault();
            AllFormations = _context.newFormationRequests.ToList();
            for (int i = 0; i < AllFormations.Count; i++)
            {
                if (AllFormations[i].userId1 == userId && AllFormations[i].userEtat1 == "في الإنتظار")
                {
                    UserFormation.Add(AllFormations[i]);
                }

                else if (AllFormations[i].userId2 == userId && AllFormations[i].userEtat2 == "في الإنتظار" && AllFormations[i].userEtat1 == "موافق")
                {
                    UserFormation.Add(AllFormations[i]);
                }

                else if (AllFormations[i].userId3 == userId && AllFormations[i].userEtat3 == "في الإنتظار" && AllFormations[i].userEtat2 == "موافق")
                {
                    UserFormation.Add(AllFormations[i]);
                }

                else if (AllFormations[i].userId4 == userId && AllFormations[i].userEtat4 == "في الإنتظار" && AllFormations[i].userEtat3 == "موافق")
                {
                    UserFormation.Add(AllFormations[i]);
                }

                else if (AllFormations[i].userId5 == userId && AllFormations[i].userEtat5 == "في الإنتظار" && AllFormations[i].userEtat4 == "موافق")
                {
                    UserFormation.Add(AllFormations[i]);
                }

                else if (AllFormations[i].userId6 == userId && AllFormations[i].userEtat6 == "في الإنتظار" && AllFormations[i].userEtat5 == "موافق")
                {
                    UserFormation.Add(AllFormations[i]);
                }

                else if (AllFormations[i].userId7 == userId && AllFormations[i].userEtat7 == "في الإنتظار" && AllFormations[i].userEtat6 == "موافق")
                {
                    UserFormation.Add(AllFormations[i]);
                }

                else if (AllFormations[i].userId8 == userId && AllFormations[i].userEtat8 == "في الإنتظار" && AllFormations[i].userEtat7 == "موافق")
                {
                    UserFormation.Add(AllFormations[i]);
                }


            }


            return UserFormation;
        }



        [HttpGet]
        [Route("GetFormationHistorique/{id}")]

        public newFormationRequest GetFormationHistorique(int id)
        {
            newFormationRequest formation = new newFormationRequest();
            ConfigService cs = new ConfigService();
            formation = _context.newFormationRequests.Where(item => item.Id == id).FirstOrDefault();
            cs = _contextD.ConfigServices.Where(item => item.serviceId == 4).FirstOrDefault();
            string rslt = "";


            // Traiter le cas d'accepter la demande par tt le monde 

            if (formation.etat == "موافق")
            {
                rslt = "لقد تمت الموافقة على الطلب من قبل جميع الأطراف";
            }

            // Traiter le cas de refuser la demande par quelqu'un cas par cas  

            else if (formation.etat == "رفض")
            {
                if (formation.userEtat1 == "رفض")
                {
                    rslt = "لقد تم رفض الطلب من قبل " + cs.roleName1;
                }
                else if (formation.userEtat2 == "رفض")
                {
                    rslt = "لقد تم رفض الطلب من قبل " + cs.roleName2;
                }
                else if (formation.userEtat3 == "رفض")
                {
                    rslt = "لقد تم رفض الطلب من قبل " + cs.roleName3;
                }
                else if (formation.userEtat4 == "رفض")
                {
                    rslt = "لقد تم رفض الطلب من قبل " + cs.roleName4;

                }
                else if (formation.userEtat5 == "رفض")
                {
                    rslt = "لقد تم رفض الطلب من قبل " + cs.roleName5;
                }
                else if (formation.userEtat6 == "رفض")
                {
                    rslt = "لقد تم رفض الطلب من قبل " + cs.roleName6;
                }
                else if (formation.userEtat7 == "رفض")
                {
                    rslt = "لقد تم رفض الطلب من قبل " + cs.roleName7;
                }
                else if (formation.userEtat8 == "رفض")
                {
                    rslt = "لقد تم رفض الطلب من قبل " + cs.roleName8;
                }
            }

            // Traiter les cas d'attente et d'accept cas par cas 
            else
            {
                if (formation.userEtat1 == "في الإنتظار")
                {
                    rslt = " لم تتم معالجة الطلب من قبل " + cs.roleName1;
                }

                else if (formation.userEtat1 == "موافق" && formation.userEtat2 == "في الإنتظار")
                {
                    rslt = "وافق " + cs.roleName1 + " على الطلب ولكن الطلب معلق عند " + cs.roleName2;
                }
                else if (formation.userEtat2 == "موافق" && formation.userEtat3 == "في الإنتظار")
                {
                    rslt = "وافق " + cs.roleName2 + " على الطلب ولكن الطلب معلق عند  " + cs.roleName3;
                }
                else if (formation.userEtat3 == "موافق" && formation.userEtat4 == "في الإنتظار")
                {
                    rslt = "وافق " + cs.roleName3 + " على الطلب ولكن الطلب معلق عند " + cs.roleName4;
                }
                else if (formation.userEtat4 == "موافق" && formation.userEtat5 == "في الإنتظار")
                {
                    rslt = "وافق " + cs.roleName3 + " على الطلب ولكن الطلب معلق عند  " + cs.roleName5;
                }
                else if (formation.userEtat5 == "موافق" && formation.userEtat6 == "في الإنتظار")
                {
                    rslt = "وافق " + cs.roleName5 + " على الطلب ولكن الطلب معلق عند" + cs.roleName6;
                }
                else if (formation.userEtat6 == "موافق" && formation.userEtat7 == "في الإنتظار")
                {
                    rslt = "وافق " + cs.roleName6 + " على الطلب ولكن الطلب معلق عند" + cs.roleName7;
                }
                else if (formation.userEtat7 == "موافق" && formation.userEtat8 == "في الإنتظار")
                {
                    rslt = "وافق " + cs.roleName7 + " على الطلب ولكن الطلب معلق عند" + cs.roleName8;
                }
            }
            formation.attribut6 = rslt;

            return formation;
        }


        [HttpGet]
        [Route("EditDemandByRole/{Id}/{userEtat}")]

        public newFormationRequest EditDemandByRole(int Id, string userEtat)
        {

            newFormationRequest formation = new newFormationRequest();
            ConfigService cs = new ConfigService();
            DateTime dateTimeNow = DateTime.Now; // Return 00/00/0000 00:00:00
            string dateOnly = dateTimeNow.ToShortDateString(); //Return 00/00/0000
            cs = _contextD.ConfigServices.Where(item => item.serviceId == 4).FirstOrDefault();
            formation = _context.newFormationRequests.Where(item => item.Id == Id).FirstOrDefault();

            if (formation.userEtat1 == "في الإنتظار")
            {
                if (userEtat != "رفض")
                {
                    formation.userEtat1 = userEtat;
                    formation.userDate1 = dateOnly;
                    if (cs.rolesNb > 1)
                    {
                        formation.iddir = formation.userId2;
                        formation.nomdir = formation.userName2;

                    }
                }
                else
                {
                    formation.userEtat1 = userEtat;
                    formation.userDate1 = dateOnly;
                    formation.etat = "رفض";
                }

            }
            else if (formation.userEtat1 == "موافق" && formation.userEtat2 == "في الإنتظار")
            {
                if (userEtat != "رفض")
                {
                    formation.userEtat2 = userEtat;
                    formation.userDate2 = dateOnly;
                    if (cs.rolesNb > 2)
                    {
                        formation.iddir = formation.userId3;
                        formation.nomdir = formation.userName3;
                    }
                }
                else
                {
                    formation.userEtat2 = userEtat;
                    formation.userDate2 = dateOnly;
                    formation.etat = "رفض";
                }
            }
            else if (formation.userEtat2 == "موافق" && formation.userEtat3 == "في الإنتظار")
            {
                if (userEtat != "رفض")
                {
                    formation.userEtat3 = userEtat;
                    formation.userDate3 = dateOnly;
                    if (cs.rolesNb > 3)
                    {
                        formation.iddir = formation.userId4;
                        formation.nomdir = formation.userName4;
                    }
                }
                else
                {
                    formation.userEtat3 = userEtat;
                    formation.userDate3 = dateOnly;
                    formation.etat = "رفض";
                }
            }
            else if (formation.userEtat3 == "موافق" && formation.userEtat4 == "في الإنتظار")
            {
                if (userEtat != "رفض")
                {
                    formation.userEtat4 = userEtat;
                    formation.userDate4 = dateOnly;
                    if (cs.rolesNb > 4)
                    {
                        formation.iddir = formation.userId5;
                        formation.nomdir = formation.userName5;
                    }
                }
                else
                {
                    formation.userEtat4 = userEtat;
                    formation.userDate4 = dateOnly;
                    formation.etat = "رفض";
                }
            }
            else if (formation.userEtat4 == "موافق" && formation.userEtat5 == "في الإنتظار")
            {
                if (userEtat != "رفض")
                {
                    formation.userEtat5 = userEtat;
                    formation.userDate5 = dateOnly;
                    if (cs.rolesNb > 5)
                    {
                        formation.iddir = formation.userId6;
                        formation.nomdir = formation.userName6;
                    }
                }
                else
                {
                    formation.userEtat5 = userEtat;
                    formation.userDate5 = dateOnly;
                    formation.etat = "رفض";
                }
            }
            else if (formation.userEtat5 == "موافق" && formation.userEtat6 == "في الإنتظار")
            {
                if (userEtat != "رفض")
                {
                    formation.userEtat6 = userEtat;
                    formation.userDate6 = dateOnly;
                    if (cs.rolesNb > 6)
                    {
                        formation.iddir = formation.userId7;
                        formation.nomdir = formation.userName7;
                    }
                }
                else
                {
                    formation.userEtat6 = userEtat;
                    formation.userDate6 = dateOnly;
                    formation.etat = "رفض";
                }
            }
            else if (formation.userEtat6 == "موافق" && formation.userEtat7 == "في الإنتظار")
            {
                if (userEtat != "رفض")
                {
                    formation.userEtat7 = userEtat;
                    formation.userDate7 = dateOnly;
                    if (cs.rolesNb > 7)
                    {
                        formation.iddir = formation.userId8;
                        formation.nomdir = formation.userName8;
                    }
                }
                else
                {
                    formation.userEtat7 = userEtat;
                    formation.userDate7 = dateOnly;
                    formation.etat = "رفض";
                }
            }
            else if (formation.userEtat7 == "موافق" && formation.userEtat8 == "في الإنتظار")
            {
                if (userEtat != "رفض")
                {
                    formation.userEtat8 = userEtat;
                    formation.userDate8 = dateOnly;
                }
                else
                {
                    formation.userEtat8 = userEtat;
                    formation.userDate8 = dateOnly;
                    formation.etat = "رفض";
                }
            }

            if (cs.rolesNb == 1 && formation.userEtat1 == "موافق")
            {
                formation.etat = "موافق";
            }
            else if (cs.rolesNb == 2 && formation.userEtat2 == "موافق")
            {
                formation.etat = "موافق";

            }
            else if (cs.rolesNb == 3 && formation.userEtat3 == "موافق")
            {
                formation.etat = "موافق";
            }
            else if (cs.rolesNb == 4 && formation.userEtat4 == "موافق")
            {
                formation.etat = "موافق";
            }
            else if (cs.rolesNb == 5 && formation.userEtat5 == "موافق")
            {
                formation.etat = "موافق";
            }
            else if (cs.rolesNb == 6 && formation.userEtat6 == "موافق")
            {
                formation.etat = "موافق";
            }
            else if (cs.rolesNb == 7 && formation.userEtat7 == "موافق")
            {
                formation.etat = "موافق";
            }
            else if (cs.rolesNb == 8 && formation.userEtat8 == "موافق")
            {
                formation.etat = "موافق";
            }


            return formation;

        }
        // DELETE: api/newFormationRequests/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<newFormationRequest>> DeletenewFormationRequest(int id)
        {
            var newFormationRequest = await _context.newFormationRequests.FindAsync(id);
            if (newFormationRequest == null)
            {
                return NotFound();
            }

            _context.newFormationRequests.Remove(newFormationRequest);
            await _context.SaveChangesAsync();

            return newFormationRequest;
        }

        private bool newFormationRequestExists(int id)
        {
            return _context.newFormationRequests.Any(e => e.Id == id);
        }
    }
}
