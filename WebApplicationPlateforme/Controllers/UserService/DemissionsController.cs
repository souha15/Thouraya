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
using WebApplicationPlateforme.Model.ServicesConfiguration;
using WebApplicationPlateforme.Model.User;
using WebApplicationPlateforme.Model.User_Services;
using WebApplicationPlateforme.Services;

namespace WebApplicationPlateforme.Controllers.UserService
{
    [Route("api/[controller]")]
    [ApiController]
    public class DemissionsController : ControllerBase
    {
        private readonly FinanceContext _context;
        private readonly DawaaContext _contextD;
        private UserManager<ApplicationUser> UserManager;
        private readonly ApplicationDbContext ApplicationDbContext;

        public DemissionsController(FinanceContext context, DawaaContext contextD,
            UserManager<ApplicationUser> _UserManager, ApplicationDbContext _ApplicationDbContext)
        {
            _context = context;
            _contextD = contextD;
            UserManager = _UserManager;
            ApplicationDbContext = _ApplicationDbContext;
        }

        // GET: api/Demissions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Demission>>> Getdemissions()
        {
            return await _context.demissions.OrderBy(item => item.Id).ToListAsync();
        }

        // GET: api/Demissions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Demission>> GetDemission(int id)
        {
            var demission = await _context.demissions.FindAsync(id);

            if (demission == null)
            {
                return NotFound();
            }

            return demission;
        }

        // PUT: api/Demissions/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDemission(int id, Demission demission)
        {
            if (id != demission.Id)
            {
                return BadRequest();
            }

            _context.Entry(demission).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DemissionExists(id))
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

        // POST: api/Demissions
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.

        Dictionary<String, String> demissionVar = new Dictionary<String, String>();

        Dictionary<String, String> csVar = new Dictionary<String, String>();

        [HttpPost]
        public async Task<ActionResult<Demission>> PostDemission(Demission demission)
        {
            // Get Configuration Of the service 

            ConfigService cs = new ConfigService();
            QuerysTable cq = new QuerysTable();
            List<QuerysTable> cqList = new List<QuerysTable>();
            //ApplicationUser user = new ApplicationUser();
            cs = _contextD.ConfigServices.Where(item => item.serviceId == 11).FirstOrDefault();
            cqList = _contextD.QuerysTables.ToList();

            Type type = typeof(UsersManip);
            //user =  GetUserProfile();
            object[] constructorParameters = new object[]
 {
    UserManager,
    ApplicationDbContext
 };



            // Fill RolesId and resimission Var Dic 

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

            // Get resimission Var Values


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
                    object parameterObject = demission.idUserCreator;
                    dir = (ApplicationUser)methodInfo.Invoke(instance, new object[] { demission.idUserCreator });


                }

                demissionVar.Add("demission.userName" + i.ToString(), dir.FullName);
                demissionVar.Add("demission.userId" + i.ToString(), dir.Id);
                demissionVar.Add("demission.userEtat" + i.ToString(), "في الإنتظار");

            }

            // Get resimission Var Values

            List<string> residenceVarValues = demissionVar.Values.ToList();



            ///// Fill resimission Model 

            if (cs.rolesNb == 1)
            {
                demission.userName1 = demissionVar["demission.userName1"];
                demission.userId1 = demissionVar["demission.userId1"];
                demission.userEtat1 = "في الإنتظار";
            }
            else if (cs.rolesNb == 2)
            {
                demission.userName1 = demissionVar["demission.userName1"];
                demission.userId1 = demissionVar["demission.userId1"];
                demission.userEtat1 = "في الإنتظار";
                demission.userName2 = demissionVar["demission.userName2"];
                demission.userId2 = demissionVar["demission.userId2"];
                demission.userEtat2 = "في الإنتظار";
            }
            else if (cs.rolesNb == 3)
            {
                demission.userName1 = demissionVar["demission.userName1"];
                demission.userId1 = demissionVar["demission.userId1"];
                demission.userEtat1 = "في الإنتظار";
                demission.userName2 = demissionVar["demission.userName2"];
                demission.userId2 = demissionVar["demission.userId2"];
                demission.userEtat2 = "في الإنتظار";
                demission.userName3 = demissionVar["demission.userName3"];
                demission.userId3 = demissionVar["demission.userId3"];
                demission.userEtat3 = "في الإنتظار";
            }
            else if (cs.rolesNb == 4)
            {
                demission.userName1 = demissionVar["demission.userName1"];
                demission.userId1 = demissionVar["demission.userId1"];
                demission.userEtat1 = "في الإنتظار";
                demission.userName2 = demissionVar["demission.userName2"];
                demission.userId2 = demissionVar["demission.userId2"];
                demission.userEtat2 = "في الإنتظار";
                demission.userName3 = demissionVar["demission.userName3"];
                demission.userId3 = demissionVar["demission.userId3"];
                demission.userEtat3 = "في الإنتظار";
                demission.userName4 = demissionVar["demission.userName4"];
                demission.userId4 = demissionVar["demission.userId4"];
                demission.userEtat4 = "في الإنتظار";
            }
            else if (cs.rolesNb == 5)
            {
                demission.userName1 = demissionVar["demission.userName1"];
                demission.userId1 = demissionVar["demission.userId1"];
                demission.userEtat1 = "في الإنتظار";
                demission.userName2 = demissionVar["demission.userName2"];
                demission.userId2 = demissionVar["demission.userId2"];
                demission.userEtat2 = "في الإنتظار";
                demission.userName3 = demissionVar["demission.userName3"];
                demission.userId3 = demissionVar["demission.userId3"];
                demission.userEtat3 = "في الإنتظار";
                demission.userName4 = demissionVar["demission.userName4"];
                demission.userId4 = demissionVar["demission.userId4"];
                demission.userEtat4 = "في الإنتظار";
                demission.userName5 = demissionVar["demission.userName5"];
                demission.userId5 = demissionVar["demission.userId5"];
                demission.userEtat5 = "في الإنتظار";
            }
            else if (cs.rolesNb == 6)
            {
                demission.userName1 = demissionVar["demission.userName1"];
                demission.userId1 = demissionVar["demission.userId1"];
                demission.userEtat1 = "في الإنتظار";
                demission.userName2 = demissionVar["demission.userName2"];
                demission.userId2 = demissionVar["demission.userId2"];
                demission.userEtat2 = "في الإنتظار";
                demission.userName3 = demissionVar["demission.userName3"];
                demission.userId3 = demissionVar["demission.userId3"];
                demission.userEtat3 = "في الإنتظار";
                demission.userName4 = demissionVar["demission.userName4"];
                demission.userId4 = demissionVar["demission.userId4"];
                demission.userEtat4 = "في الإنتظار";
                demission.userName5 = demissionVar["demission.userName5"];
                demission.userId5 = demissionVar["demission.userId5"];
                demission.userEtat5 = "في الإنتظار";
                demission.userName6 = demissionVar["demission.userName6"];
                demission.userId6 = demissionVar["demission.userId6"];
                demission.userEtat6 = "في الإنتظار";
            }
            else if (cs.rolesNb == 7)
            {
                demission.userName1 = demissionVar["demission.userName1"];
                demission.userId1 = demissionVar["demission.userId1"];
                demission.userEtat1 = "في الإنتظار";
                demission.userName2 = demissionVar["demission.userName2"];
                demission.userId2 = demissionVar["demission.userId2"];
                demission.userEtat2 = "في الإنتظار";
                demission.userName3 = demissionVar["demission.userName3"];
                demission.userId3 = demissionVar["demission.userId3"];
                demission.userEtat3 = "في الإنتظار";
                demission.userName4 = demissionVar["demission.userName4"];
                demission.userId4 = demissionVar["demission.userId4"];
                demission.userEtat4 = "في الإنتظار";
                demission.userName5 = demissionVar["demission.userName5"];
                demission.userId5 = demissionVar["demission.userId5"];
                demission.userEtat5 = "في الإنتظار";
                demission.userName6 = demissionVar["demission.userName6"];
                demission.userId6 = demissionVar["demission.userId6"];
                demission.userEtat6 = "في الإنتظار";
                demission.userName7 = demissionVar["demission.userName7"];
                demission.userId7 = demissionVar["demission.userId7"];
                demission.userEtat7 = "في الإنتظار";
            }
            else if (cs.rolesNb == 8)
            {
                demission.userName1 = demissionVar["demission.userName1"];
                demission.userId1 = demissionVar["demission.userId1"];
                demission.userEtat1 = "في الإنتظار";
                demission.userName2 = demissionVar["demission.userName2"];
                demission.userId2 = demissionVar["demission.userId2"];
                demission.userEtat2 = "في الإنتظار";
                demission.userName3 = demissionVar["demission.userName3"];
                demission.userId3 = demissionVar["demission.userId3"];
                demission.userEtat3 = "في الإنتظار";
                demission.userName4 = demissionVar["demission.userName4"];
                demission.userId4 = demissionVar["demission.userId4"];
                demission.userEtat4 = "في الإنتظار";
                demission.userName5 = demissionVar["demission.userName5"];
                demission.userId5 = demissionVar["demission.userId5"];
                demission.userEtat5 = "في الإنتظار";
                demission.userName6 = demissionVar["demission.userName6"];
                demission.userId6 = demissionVar["demission.userId6"];
                demission.userEtat6 = "في الإنتظار";
                demission.userName7 = demissionVar["demission.userName7"];
                demission.userId7 = demissionVar["demission.userId7"];
                demission.userEtat7 = "في الإنتظار";
                demission.userName8 = demissionVar["demission.userName8"];
                demission.userId8 = demissionVar["demission.userId8"];
                demission.userEtat8 = "في الإنتظار";
            }

            demission.etat = "في الإنتظار";
            DateTime dateTimeNow = DateTime.Now; // Return 00/00/0000 00:00:00
            string dateOnly = dateTimeNow.ToShortDateString(); //Return 00/00/0000
            demission.datenereg = dateOnly;
            _context.demissions.Add(demission);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDemission", new { id = demission.Id }, demission);
        }


        [HttpGet]
        [Route("GetByUserCreator/{userId}")]

        public List<Demission> GetByUserCreator(string userId)
        {
            List<Demission> UserDemission = new List<Demission>();
            UserDemission = _context.demissions.Where(item => item.idUserCreator == userId).ToList();
            return UserDemission;
        }


        [HttpGet]
        [Route("GetDemand/{userId}")]

        public List<Demission> GetDemand(string userId)
        {


            List<Demission> UserDemission = new List<Demission>();
            List<Demission> AllDemissions = new List<Demission>();
            ConfigService cs = new ConfigService();
            cs = _contextD.ConfigServices.Where(item => item.serviceId == 11).FirstOrDefault();
            AllDemissions = _context.demissions.ToList();
            for (int i = 0; i < AllDemissions.Count; i++)
            {
                if (AllDemissions[i].userId1 == userId && AllDemissions[i].userEtat1 == "في الإنتظار")
                {
                    UserDemission.Add(AllDemissions[i]);
                }

                else if (AllDemissions[i].userId2 == userId && AllDemissions[i].userEtat2 == "في الإنتظار" && AllDemissions[i].userEtat1 == "موافق")
                {
                    UserDemission.Add(AllDemissions[i]);
                }

                else if (AllDemissions[i].userId3 == userId && AllDemissions[i].userEtat3 == "في الإنتظار" && AllDemissions[i].userEtat2 == "موافق")
                {
                    UserDemission.Add(AllDemissions[i]);
                }

                else if (AllDemissions[i].userId4 == userId && AllDemissions[i].userEtat4 == "في الإنتظار" && AllDemissions[i].userEtat3 == "موافق")
                {
                    UserDemission.Add(AllDemissions[i]);
                }

                else if (AllDemissions[i].userId5 == userId && AllDemissions[i].userEtat5 == "في الإنتظار" && AllDemissions[i].userEtat4 == "موافق")
                {
                    UserDemission.Add(AllDemissions[i]);
                }

                else if (AllDemissions[i].userId6 == userId && AllDemissions[i].userEtat6 == "في الإنتظار" && AllDemissions[i].userEtat5 == "موافق")
                {
                    UserDemission.Add(AllDemissions[i]);
                }

                else if (AllDemissions[i].userId7 == userId && AllDemissions[i].userEtat7 == "في الإنتظار" && AllDemissions[i].userEtat6 == "موافق")
                {
                    UserDemission.Add(AllDemissions[i]);
                }

                else if (AllDemissions[i].userId8 == userId && AllDemissions[i].userEtat8 == "في الإنتظار" && AllDemissions[i].userEtat7 == "موافق")
                {
                    UserDemission.Add(AllDemissions[i]);
                }


            }


            return UserDemission;
        }


        [HttpGet]
        [Route("GetHistorique/{id}")]

        public Demission GetHistorique(int id)
        {
            Demission dem = new Demission();
            ConfigService cs = new ConfigService();
            dem = _context.demissions.Where(item => item.Id == id).FirstOrDefault();
            cs = _contextD.ConfigServices.Where(item => item.serviceId == 11).FirstOrDefault();
            string rslt = "";


            // Traiter le cas d'accepter la demande par tt le monde 

            if (dem.etat == "موافق")
            {
                rslt = "لقد تمت الموافقة على الطلب من قبل جميع الأطراف";
            }

            // Traiter le cas de refuser la demande par quelqu'un cas par cas  

            else if (dem.etat == "رفض")
            {
                if (dem.userEtat1 == "رفض")
                {
                    rslt = "لقد تم رفض الطلب من قبل " + cs.roleName1;
                }
                else if (dem.userEtat2 == "رفض")
                {
                    rslt = "لقد تم رفض الطلب من قبل " + cs.roleName2;
                }
                else if (dem.userEtat3 == "رفض")
                {
                    rslt = "لقد تم رفض الطلب من قبل " + cs.roleName3;
                }
                else if (dem.userEtat4 == "رفض")
                {
                    rslt = "لقد تم رفض الطلب من قبل " + cs.roleName4;

                }
                else if (dem.userEtat5 == "رفض")
                {
                    rslt = "لقد تم رفض الطلب من قبل " + cs.roleName5;
                }
                else if (dem.userEtat6 == "رفض")
                {
                    rslt = "لقد تم رفض الطلب من قبل " + cs.roleName6;
                }
                else if (dem.userEtat7 == "رفض")
                {
                    rslt = "لقد تم رفض الطلب من قبل " + cs.roleName7;
                }
                else if (dem.userEtat8 == "رفض")
                {
                    rslt = "لقد تم رفض الطلب من قبل " + cs.roleName8;
                }
            }

            // Traiter les cas d'attente et d'accept cas par cas 
            else
            {
                if (dem.userEtat1 == "في الإنتظار")
                {
                    rslt = " لم تتم معالجة الطلب من قبل " + cs.roleName1;
                }

                else if (dem.userEtat1 == "موافق" && dem.userEtat2 == "في الإنتظار")
                {
                    rslt = "وافق " + cs.roleName1 + " على الطلب ولكن الطلب معلق عند " + cs.roleName2;
                }
                else if (dem.userEtat2 == "موافق" && dem.userEtat3 == "في الإنتظار")
                {
                    rslt = "وافق " + cs.roleName2 + " على الطلب ولكن الطلب معلق عند  " + cs.roleName3;
                }
                else if (dem.userEtat3 == "موافق" && dem.userEtat4 == "في الإنتظار")
                {
                    rslt = "وافق " + cs.roleName3 + " على الطلب ولكن الطلب معلق عند " + cs.roleName4;
                }
                else if (dem.userEtat4 == "موافق" && dem.userEtat5 == "في الإنتظار")
                {
                    rslt = "وافق " + cs.roleName3 + " على الطلب ولكن الطلب معلق عند  " + cs.roleName5;
                }
                else if (dem.userEtat5 == "موافق" && dem.userEtat6 == "في الإنتظار")
                {
                    rslt = "وافق " + cs.roleName5 + " على الطلب ولكن الطلب معلق عند" + cs.roleName6;
                }
                else if (dem.userEtat6 == "موافق" && dem.userEtat7 == "في الإنتظار")
                {
                    rslt = "وافق " + cs.roleName6 + " على الطلب ولكن الطلب معلق عند" + cs.roleName7;
                }
                else if (dem.userEtat7 == "موافق" && dem.userEtat8 == "في الإنتظار")
                {
                    rslt = "وافق " + cs.roleName7 + " على الطلب ولكن الطلب معلق عند" + cs.roleName8;
                }
            }
            dem.attribut6 = rslt;

            return dem;
        }




        [HttpGet]
        [Route("EditDemandByRole/{Id}/{userEtat}")]

        public Demission EditDemandByRole(int Id, string userEtat)
        {

            Demission dem = new Demission();
            ConfigService cs = new ConfigService();
            DateTime dateTimeNow = DateTime.Now; // Return 00/00/0000 00:00:00
            string dateOnly = dateTimeNow.ToShortDateString(); //Return 00/00/0000
            cs = _contextD.ConfigServices.Where(item => item.serviceId == 11).FirstOrDefault();
            dem = _context.demissions.Where(item => item.Id == Id).FirstOrDefault();

            if (dem.userEtat1 == "في الإنتظار")
            {
                if (userEtat != "رفض")
                {
                    dem.userEtat1 = userEtat;
                    dem.userDate1 = dateOnly;
                    if (cs.rolesNb > 1)
                    {
                        dem.iddir = dem.userId2;
                        dem.nomdir = dem.userName2;

                    }
                }
                else
                {
                    dem.userEtat1 = userEtat;
                    dem.userDate1 = dateOnly;
                    dem.etat = "رفض";
                }

            }
            else if (dem.userEtat1 == "موافق" && dem.userEtat2 == "في الإنتظار")
            {
                if (userEtat != "رفض")
                {
                    dem.userEtat2 = userEtat;
                    dem.userDate2 = dateOnly;
                    if (cs.rolesNb > 2)
                    {
                        dem.iddir = dem.userId3;
                        dem.nomdir = dem.userName3;
                    }
                }
                else
                {
                    dem.userEtat2 = userEtat;
                    dem.userDate2 = dateOnly;
                    dem.etat = "رفض";
                }
            }
            else if (dem.userEtat2 == "موافق" && dem.userEtat3 == "في الإنتظار")
            {
                if (userEtat != "رفض")
                {
                    dem.userEtat3 = userEtat;
                    dem.userDate3 = dateOnly;
                    if (cs.rolesNb > 3)
                    {
                        dem.iddir = dem.userId4;
                        dem.nomdir = dem.userName4;
                    }
                }
                else
                {
                    dem.userEtat3 = userEtat;
                    dem.userDate3 = dateOnly;
                    dem.etat = "رفض";
                }
            }
            else if (dem.userEtat3 == "موافق" && dem.userEtat4 == "في الإنتظار")
            {
                if (userEtat != "رفض")
                {
                    dem.userEtat4 = userEtat;
                    dem.userDate4 = dateOnly;
                    if (cs.rolesNb > 4)
                    {
                        dem.iddir = dem.userId5;
                        dem.nomdir = dem.userName5;
                    }
                }
                else
                {
                    dem.userEtat4 = userEtat;
                    dem.userDate4 = dateOnly;
                    dem.etat = "رفض";
                }
            }
            else if (dem.userEtat4 == "موافق" && dem.userEtat5 == "في الإنتظار")
            {
                if (userEtat != "رفض")
                {
                    dem.userEtat5 = userEtat;
                    dem.userDate5 = dateOnly;
                    if (cs.rolesNb > 5)
                    {
                        dem.iddir = dem.userId6;
                        dem.nomdir = dem.userName6;
                    }
                }
                else
                {
                    dem.userEtat5 = userEtat;
                    dem.userDate5 = dateOnly;
                    dem.etat = "رفض";
                }
            }
            else if (dem.userEtat5 == "موافق" && dem.userEtat6 == "في الإنتظار")
            {
                if (userEtat != "رفض")
                {
                    dem.userEtat6 = userEtat;
                    dem.userDate6 = dateOnly;
                    if (cs.rolesNb > 6)
                    {
                        dem.iddir = dem.userId7;
                        dem.nomdir = dem.userName7;
                    }
                }
                else
                {
                    dem.userEtat6 = userEtat;
                    dem.userDate6 = dateOnly;
                    dem.etat = "رفض";
                }
            }
            else if (dem.userEtat6 == "موافق" && dem.userEtat7 == "في الإنتظار")
            {
                if (userEtat != "رفض")
                {
                    dem.userEtat7 = userEtat;
                    dem.userDate7 = dateOnly;
                    if (cs.rolesNb > 7)
                    {
                        dem.iddir = dem.userId8;
                        dem.nomdir = dem.userName8;
                    }
                }
                else
                {
                    dem.userEtat7 = userEtat;
                    dem.userDate7 = dateOnly;
                    dem.etat = "رفض";
                }
            }
            else if (dem.userEtat7 == "موافق" && dem.userEtat8 == "في الإنتظار")
            {
                if (userEtat != "رفض")
                {
                    dem.userEtat8 = userEtat;
                    dem.userDate8 = dateOnly;
                }
                else
                {
                    dem.userEtat8 = userEtat;
                    dem.userDate8 = dateOnly;
                    dem.etat = "رفض";
                }
            }

            if (cs.rolesNb == 1 && dem.userEtat1 == "موافق")
            {
                dem.etat = "موافق";
            }
            else if (cs.rolesNb == 2 && dem.userEtat2 == "موافق")
            {
                dem.etat = "موافق";

            }
            else if (cs.rolesNb == 3 && dem.userEtat3 == "موافق")
            {
                dem.etat = "موافق";
            }
            else if (cs.rolesNb == 4 && dem.userEtat4 == "موافق")
            {
                dem.etat = "موافق";
            }
            else if (cs.rolesNb == 5 && dem.userEtat5 == "موافق")
            {
                dem.etat = "موافق";
            }
            else if (cs.rolesNb == 6 && dem.userEtat6 == "موافق")
            {
                dem.etat = "موافق";
            }
            else if (cs.rolesNb == 7 && dem.userEtat7 == "موافق")
            {
                dem.etat = "موافق";
            }
            else if (cs.rolesNb == 8 && dem.userEtat8 == "موافق")
            {
                dem.etat = "موافق";
            }


            return dem;

        }


        // DELETE: api/Demissions/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Demission>> DeleteDemission(int id)
        {
            var demission = await _context.demissions.FindAsync(id);
            if (demission == null)
            {
                return NotFound();
            }

            _context.demissions.Remove(demission);
            await _context.SaveChangesAsync();

            return demission;
        }

        private bool DemissionExists(int id)
        {
            return _context.demissions.Any(e => e.Id == id);
        }
    }
}
