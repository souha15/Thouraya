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
using WebApplicationPlateforme.Model.Finance;
using WebApplicationPlateforme.Model.ServicesConfiguration;
using WebApplicationPlateforme.Model.User;
using WebApplicationPlateforme.Services;

namespace WebApplicationPlateforme.Controllers.Finance
{
    [Route("api/[controller]")]
    [ApiController]
    public class DemandeAvancesController : ControllerBase
    {
        private readonly FinanceContext _context;
        private readonly DawaaContext _contextD;
        private UserManager<ApplicationUser> UserManager;
        private readonly ApplicationDbContext ApplicationDbContext;
        public DemandeAvancesController(FinanceContext context, DawaaContext contextD,
            UserManager<ApplicationUser> _UserManager, ApplicationDbContext _ApplicationDbContext)
        {
            _context = context;
            _contextD = contextD;
            UserManager = _UserManager;
            ApplicationDbContext = _ApplicationDbContext;
        }

        // GET: api/DemandeAvances
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DemandeAvance>>> GetdemandeAvances()
        {
            return await _context.demandeAvances.OrderBy(item => item.Id).ToListAsync();
        }

        // GET: api/DemandeAvances/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DemandeAvance>> GetDemandeAvance(int id)
        {
            var demandeAvance = await _context.demandeAvances.FindAsync(id);

            if (demandeAvance == null)
            {
                return NotFound();
            }

            return demandeAvance;
        }

        // PUT: api/DemandeAvances/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDemandeAvance(int id, DemandeAvance demandeAvance)
        {
            if (id != demandeAvance.Id)
            {
                return BadRequest();
            }

            _context.Entry(demandeAvance).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DemandeAvanceExists(id))
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

        // POST: api/DemandeAvances
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.

        Dictionary<String, String> avanceVar = new Dictionary<String, String>();

        Dictionary<String, String> csVar = new Dictionary<String, String>();
        [HttpPost]
        public async Task<ActionResult<DemandeAvance>> PostDemandeAvance(DemandeAvance demandeAvance)
        {
            ConfigService cs = new ConfigService();
            QuerysTable cq = new QuerysTable();
            List<QuerysTable> cqList = new List<QuerysTable>();
            //ApplicationUser user = new ApplicationUser();
            cs = _contextD.ConfigServices.Where(item => item.serviceId == 10).FirstOrDefault();
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
                    object parameterObject = demandeAvance.idUserCreator;
                    dir = (ApplicationUser)methodInfo.Invoke(instance, new object[] { demandeAvance.idUserCreator });


                }

                avanceVar.Add("demandeAvance.userName" + i.ToString(), dir.FullName);
                avanceVar.Add("demandeAvance.userId" + i.ToString(), dir.Id);
                avanceVar.Add("demandeAvance.userEtat" + i.ToString(), "في الإنتظار");

            }

            // Get resimission Var Values

            List<string> residenceVarValues = avanceVar.Values.ToList();



            ///// Fill resimission Model 

            if (cs.rolesNb == 1)
            {
                demandeAvance.userName1 = avanceVar["demandeAvance.userName1"];
                demandeAvance.userId1 = avanceVar["demandeAvance.userId1"];
                demandeAvance.userEtat1 = "في الإنتظار";
            }
            else if (cs.rolesNb == 2)
            {
                demandeAvance.userName1 = avanceVar["demandeAvance.userName1"];
                demandeAvance.userId1 = avanceVar["demandeAvance.userId1"];
                demandeAvance.userEtat1 = "في الإنتظار";
                demandeAvance.userName2 = avanceVar["demandeAvance.userName2"];
                demandeAvance.userId2 = avanceVar["demandeAvance.userId2"];
                demandeAvance.userEtat2 = "في الإنتظار";
            }
            else if (cs.rolesNb == 3)
            {
                demandeAvance.userName1 = avanceVar["demandeAvance.userName1"];
                demandeAvance.userId1 = avanceVar["demandeAvance.userId1"];
                demandeAvance.userEtat1 = "في الإنتظار";
                demandeAvance.userName2 = avanceVar["demandeAvance.userName2"];
                demandeAvance.userId2 = avanceVar["demandeAvance.userId2"];
                demandeAvance.userEtat2 = "في الإنتظار";
                demandeAvance.userName3 = avanceVar["demandeAvance.userName3"];
                demandeAvance.userId3 = avanceVar["demandeAvance.userId3"];
                demandeAvance.userEtat3 = "في الإنتظار";
            }
            else if (cs.rolesNb == 4)
            {
                demandeAvance.userName1 = avanceVar["demandeAvance.userName1"];
                demandeAvance.userId1 = avanceVar["demandeAvance.userId1"];
                demandeAvance.userEtat1 = "في الإنتظار";
                demandeAvance.userName2 = avanceVar["demandeAvance.userName2"];
                demandeAvance.userId2 = avanceVar["demandeAvance.userId2"];
                demandeAvance.userEtat2 = "في الإنتظار";
                demandeAvance.userName3 = avanceVar["demandeAvance.userName3"];
                demandeAvance.userId3 = avanceVar["demandeAvance.userId3"];
                demandeAvance.userEtat3 = "في الإنتظار";
                demandeAvance.userName4 = avanceVar["demandeAvance.userName4"];
                demandeAvance.userId4 = avanceVar["demandeAvance.userId4"];
                demandeAvance.userEtat4 = "في الإنتظار";
            }
            else if (cs.rolesNb == 5)
            {
                demandeAvance.userName1 = avanceVar["demandeAvance.userName1"];
                demandeAvance.userId1 = avanceVar["demandeAvance.userId1"];
                demandeAvance.userEtat1 = "في الإنتظار";
                demandeAvance.userName2 = avanceVar["demandeAvance.userName2"];
                demandeAvance.userId2 = avanceVar["demandeAvance.userId2"];
                demandeAvance.userEtat2 = "في الإنتظار";
                demandeAvance.userName3 = avanceVar["demandeAvance.userName3"];
                demandeAvance.userId3 = avanceVar["demandeAvance.userId3"];
                demandeAvance.userEtat3 = "في الإنتظار";
                demandeAvance.userName4 = avanceVar["demandeAvance.userName4"];
                demandeAvance.userId4 = avanceVar["demandeAvance.userId4"];
                demandeAvance.userEtat4 = "في الإنتظار";
                demandeAvance.userName5 = avanceVar["demandeAvance.userName5"];
                demandeAvance.userId5 = avanceVar["demandeAvance.userId5"];
                demandeAvance.userEtat5 = "في الإنتظار";
            }
            else if (cs.rolesNb == 6)
            {
                demandeAvance.userName1 = avanceVar["demandeAvance.userName1"];
                demandeAvance.userId1 = avanceVar["demandeAvance.userId1"];
                demandeAvance.userEtat1 = "في الإنتظار";
                demandeAvance.userName2 = avanceVar["demandeAvance.userName2"];
                demandeAvance.userId2 = avanceVar["demandeAvance.userId2"];
                demandeAvance.userEtat2 = "في الإنتظار";
                demandeAvance.userName3 = avanceVar["demandeAvance.userName3"];
                demandeAvance.userId3 = avanceVar["demandeAvance.userId3"];
                demandeAvance.userEtat3 = "في الإنتظار";
                demandeAvance.userName4 = avanceVar["demandeAvance.userName4"];
                demandeAvance.userId4 = avanceVar["demandeAvance.userId4"];
                demandeAvance.userEtat4 = "في الإنتظار";
                demandeAvance.userName5 = avanceVar["demandeAvance.userName5"];
                demandeAvance.userId5 = avanceVar["demandeAvance.userId5"];
                demandeAvance.userEtat5 = "في الإنتظار";
                demandeAvance.userName6 = avanceVar["demandeAvance.userName6"];
                demandeAvance.userId6 = avanceVar["demandeAvance.userId6"];
                demandeAvance.userEtat6 = "في الإنتظار";
            }
            else if (cs.rolesNb == 7)
            {
                demandeAvance.userName1 = avanceVar["demandeAvance.userName1"];
                demandeAvance.userId1 = avanceVar["demandeAvance.userId1"];
                demandeAvance.userEtat1 = "في الإنتظار";
                demandeAvance.userName2 = avanceVar["demandeAvance.userName2"];
                demandeAvance.userId2 = avanceVar["demandeAvance.userId2"];
                demandeAvance.userEtat2 = "في الإنتظار";
                demandeAvance.userName3 = avanceVar["demandeAvance.userName3"];
                demandeAvance.userId3 = avanceVar["demandeAvance.userId3"];
                demandeAvance.userEtat3 = "في الإنتظار";
                demandeAvance.userName4 = avanceVar["demandeAvance.userName4"];
                demandeAvance.userId4 = avanceVar["demandeAvance.userId4"];
                demandeAvance.userEtat4 = "في الإنتظار";
                demandeAvance.userName5 = avanceVar["demandeAvance.userName5"];
                demandeAvance.userId5 = avanceVar["demandeAvance.userId5"];
                demandeAvance.userEtat5 = "في الإنتظار";
                demandeAvance.userName6 = avanceVar["demandeAvance.userName6"];
                demandeAvance.userId6 = avanceVar["demandeAvance.userId6"];
                demandeAvance.userEtat6 = "في الإنتظار";
                demandeAvance.userName7 = avanceVar["demandeAvance.userName7"];
                demandeAvance.userId7 = avanceVar["demandeAvance.userId7"];
                demandeAvance.userEtat7 = "في الإنتظار";
            }
            else if (cs.rolesNb == 8)
            {
                demandeAvance.userName1 = avanceVar["demandeAvance.userName1"];
                demandeAvance.userId1 = avanceVar["demandeAvance.userId1"];
                demandeAvance.userEtat1 = "في الإنتظار";
                demandeAvance.userName2 = avanceVar["demandeAvance.userName2"];
                demandeAvance.userId2 = avanceVar["demandeAvance.userId2"];
                demandeAvance.userEtat2 = "في الإنتظار";
                demandeAvance.userName3 = avanceVar["demandeAvance.userName3"];
                demandeAvance.userId3 = avanceVar["demandeAvance.userId3"];
                demandeAvance.userEtat3 = "في الإنتظار";
                demandeAvance.userName4 = avanceVar["demandeAvance.userName4"];
                demandeAvance.userId4 = avanceVar["demandeAvance.userId4"];
                demandeAvance.userEtat4 = "في الإنتظار";
                demandeAvance.userName5 = avanceVar["demandeAvance.userName5"];
                demandeAvance.userId5 = avanceVar["demandeAvance.userId5"];
                demandeAvance.userEtat5 = "في الإنتظار";
                demandeAvance.userName6 = avanceVar["demandeAvance.userName6"];
                demandeAvance.userId6 = avanceVar["demandeAvance.userId6"];
                demandeAvance.userEtat6 = "في الإنتظار";
                demandeAvance.userName7 = avanceVar["demandeAvance.userName7"];
                demandeAvance.userId7 = avanceVar["demandeAvance.userId7"];
                demandeAvance.userEtat7 = "في الإنتظار";
                demandeAvance.userName8 = avanceVar["demandeAvance.userName8"];
                demandeAvance.userId8 = avanceVar["demandeAvance.userId8"];
                demandeAvance.userEtat8 = "في الإنتظار";
            }

            demandeAvance.etat = "في الإنتظار";
            DateTime dateTimeNow = DateTime.Now; // Return 00/00/0000 00:00:00
            string dateOnly = dateTimeNow.ToShortDateString(); //Return 00/00/0000
            demandeAvance.dateenreg = dateOnly;
            _context.demandeAvances.Add(demandeAvance);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDemandeAvance", new { id = demandeAvance.Id }, demandeAvance);
        }

        [HttpGet]
        [Route("GetByUserCreator/{userId}")]

        public List<DemandeAvance> GetByUserCreator(string userId)
        {
            List<DemandeAvance> UserAvance = new List<DemandeAvance>();
            UserAvance = _context.demandeAvances.Where(item => item.idUserCreator == userId).ToList();
            return UserAvance;
        }


        [HttpGet]
        [Route("GetDemand/{userId}")]

        public List<DemandeAvance> GetDemand(string userId)
        {


            List<DemandeAvance> UserAvance = new List<DemandeAvance>();
            List<DemandeAvance> AllAvance = new List<DemandeAvance>();
            ConfigService cs = new ConfigService();
            cs = _contextD.ConfigServices.Where(item => item.serviceId == 10).FirstOrDefault();
            AllAvance = _context.demandeAvances.ToList();
            for (int i = 0; i < AllAvance.Count; i++)
            {
                if (AllAvance[i].userId1 == userId && AllAvance[i].userEtat1 == "في الإنتظار")
                {
                    UserAvance.Add(AllAvance[i]);
                }

                else if (AllAvance[i].userId2 == userId && AllAvance[i].userEtat2 == "في الإنتظار" && AllAvance[i].userEtat1 == "موافق")
                {
                    UserAvance.Add(AllAvance[i]);
                }

                else if (AllAvance[i].userId3 == userId && AllAvance[i].userEtat3 == "في الإنتظار" && AllAvance[i].userEtat2 == "موافق")
                {
                    UserAvance.Add(AllAvance[i]);
                }

                else if (AllAvance[i].userId4 == userId && AllAvance[i].userEtat4 == "في الإنتظار" && AllAvance[i].userEtat3 == "موافق")
                {
                    UserAvance.Add(AllAvance[i]);
                }

                else if (AllAvance[i].userId5 == userId && AllAvance[i].userEtat5 == "في الإنتظار" && AllAvance[i].userEtat4 == "موافق")
                {
                    UserAvance.Add(AllAvance[i]);
                }

                else if (AllAvance[i].userId6 == userId && AllAvance[i].userEtat6 == "في الإنتظار" && AllAvance[i].userEtat5 == "موافق")
                {
                    UserAvance.Add(AllAvance[i]);
                }

                else if (AllAvance[i].userId7 == userId && AllAvance[i].userEtat7 == "في الإنتظار" && AllAvance[i].userEtat6 == "موافق")
                {
                    UserAvance.Add(AllAvance[i]);
                }

                else if (AllAvance[i].userId8 == userId && AllAvance[i].userEtat8 == "في الإنتظار" && AllAvance[i].userEtat7 == "موافق")
                {
                    UserAvance.Add(AllAvance[i]);
                }


            }


            return UserAvance;
        }


        [HttpGet]
        [Route("GetHistorique/{id}")]

        public DemandeAvance GetHistorique(int id)
        {
            DemandeAvance dem = new DemandeAvance();
            ConfigService cs = new ConfigService();
            dem = _context.demandeAvances.Where(item => item.Id == id).FirstOrDefault();
            cs = _contextD.ConfigServices.Where(item => item.serviceId == 10).FirstOrDefault();
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

        public DemandeAvance EditDemandByRole(int Id, string userEtat)
        {

            DemandeAvance dem = new DemandeAvance();
            ConfigService cs = new ConfigService();
            DateTime dateTimeNow = DateTime.Now; // Return 00/00/0000 00:00:00
            string dateOnly = dateTimeNow.ToShortDateString(); //Return 00/00/0000
            cs = _contextD.ConfigServices.Where(item => item.serviceId == 10).FirstOrDefault();
            dem = _context.demandeAvances.Where(item => item.Id == Id).FirstOrDefault();

            if (dem.userEtat1 == "في الإنتظار")
            {
                if (userEtat != "رفض")
                {
                    dem.userEtat1 = userEtat;
                    dem.userDate1 = dateOnly;
                    if (cs.rolesNb > 1)
                    {
                        dem.idD = dem.userId2;
                        dem.nomD = dem.userName2;

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
                        dem.idD = dem.userId3;
                        dem.nomD = dem.userName3;
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
                        dem.idD = dem.userId4;
                        dem.nomD = dem.userName4;
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
                        dem.idD = dem.userId5;
                        dem.nomD = dem.userName5;
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
                        dem.idD = dem.userId6;
                        dem.nomD = dem.userName6;
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
                        dem.idD = dem.userId7;
                        dem.nomD = dem.userName7;
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
                        dem.idD = dem.userId8;
                        dem.nomD = dem.userName8;
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

        // DELETE: api/DemandeAvances/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<DemandeAvance>> DeleteDemandeAvance(int id)
        {
            var demandeAvance = await _context.demandeAvances.FindAsync(id);
            if (demandeAvance == null)
            {
                return NotFound();
            }

            _context.demandeAvances.Remove(demandeAvance);
            await _context.SaveChangesAsync();

            return demandeAvance;
        }

        private bool DemandeAvanceExists(int id)
        {
            return _context.demandeAvances.Any(e => e.Id == id);
        }



        [HttpGet]
        [Route("GetListNotif/{Id}/{userId}")]
        public List<DemandeAvance> GetListNotif(int Id, string userId)
        {
            List<DemandeAvance> ListNotifGlob = new List<DemandeAvance>();
            DemandeAvance NotifId = new DemandeAvance();
            if (Id != 0)
            {
                NotifId = _context.demandeAvances.Where(item => item.Id == Id).FirstOrDefault();
                ListNotifGlob = GetDemand(userId);
                var item = ListNotifGlob.Find(x => x.Id == NotifId.Id);
                ListNotifGlob.Remove(item);
                ListNotifGlob.Insert(ListNotifGlob.Count(), NotifId);
            }
            else
            {
                ListNotifGlob = GetDemand(userId);
            }


            return ListNotifGlob;
        }
    }
}
