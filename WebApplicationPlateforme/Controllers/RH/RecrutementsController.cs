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
    public class RecrutementsController : ControllerBase
    {
        private readonly FinanceContext _context;
        private readonly DawaaContext _contextD;
        private UserManager<ApplicationUser> UserManager;
        private readonly ApplicationDbContext ApplicationDbContext;

        public RecrutementsController(FinanceContext context, DawaaContext contextD,
            UserManager<ApplicationUser> _UserManager, ApplicationDbContext _ApplicationDbContext)
        {
            _context = context;
            _contextD = contextD;
            UserManager = _UserManager;
            ApplicationDbContext = _ApplicationDbContext;
        }

        // GET: api/Recrutements
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Recrutement>>> Getrecrutements()
        {
            return await _context.recrutements.OrderBy(item => item.Id).ToListAsync();
        }

        // GET: api/Recrutements/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Recrutement>> GetRecrutement(int id)
        {
            var recrutement = await _context.recrutements.FindAsync(id);

            if (recrutement == null)
            {
                return NotFound();
            }

            return recrutement;
        }

        // PUT: api/Recrutements/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRecrutement(int id, Recrutement recrutement)
        {
            if (id != recrutement.Id)
            {
                return BadRequest();
            }

            _context.Entry(recrutement).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RecrutementExists(id))
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

        // POST: api/Recrutements
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.

        Dictionary<String, String> recrutementVar = new Dictionary<String, String>();

        Dictionary<String, String> csVar = new Dictionary<String, String>();
        [HttpPost]
        public async Task<ActionResult<Recrutement>> PostRecrutement(Recrutement recrutement)
        {
            ConfigService cs = new ConfigService();
            QuerysTable cq = new QuerysTable();
            List<QuerysTable> cqList = new List<QuerysTable>();
            //ApplicationUser user = new ApplicationUser();
            cs = _contextD.ConfigServices.Where(item => item.serviceId == 19).FirstOrDefault();
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
                    object parameterObject = recrutement.idUserCreator;
                    dir = (ApplicationUser)methodInfo.Invoke(instance, new object[] { recrutement.idUserCreator });


                }

                recrutementVar.Add("recrutement.userName" + i.ToString(), dir.FullName);
                recrutementVar.Add("recrutement.userId" + i.ToString(), dir.Id);
                recrutementVar.Add("recrutement.userEtat" + i.ToString(), "في الإنتظار");

            }

            // Get resimission Var Values

            List<string> residenceVarValues = recrutementVar.Values.ToList();



            ///// Fill resimission Model 

            if (cs.rolesNb == 1)
            {
                recrutement.userName1 = recrutementVar["recrutement.userName1"];
                recrutement.userId1 = recrutementVar["recrutement.userId1"];
                recrutement.userEtat1 = "في الإنتظار";
            }
            else if (cs.rolesNb == 2)
            {
                recrutement.userName1 = recrutementVar["recrutement.userName1"];
                recrutement.userId1 = recrutementVar["recrutement.userId1"];
                recrutement.userEtat1 = "في الإنتظار";
                recrutement.userName2 = recrutementVar["recrutement.userName2"];
                recrutement.userId2 = recrutementVar["recrutement.userId2"];
                recrutement.userEtat2 = "في الإنتظار";
            }
            else if (cs.rolesNb == 3)
            {
                recrutement.userName1 = recrutementVar["recrutement.userName1"];
                recrutement.userId1 = recrutementVar["recrutement.userId1"];
                recrutement.userEtat1 = "في الإنتظار";
                recrutement.userName2 = recrutementVar["recrutement.userName2"];
                recrutement.userId2 = recrutementVar["recrutement.userId2"];
                recrutement.userEtat2 = "في الإنتظار";
                recrutement.userName3 = recrutementVar["recrutement.userName3"];
                recrutement.userId3 = recrutementVar["recrutement.userId3"];
                recrutement.userEtat3 = "في الإنتظار";
            }
            else if (cs.rolesNb == 4)
            {
                recrutement.userName1 = recrutementVar["recrutement.userName1"];
                recrutement.userId1 = recrutementVar["recrutement.userId1"];
                recrutement.userEtat1 = "في الإنتظار";
                recrutement.userName2 = recrutementVar["recrutement.userName2"];
                recrutement.userId2 = recrutementVar["recrutement.userId2"];
                recrutement.userEtat2 = "في الإنتظار";
                recrutement.userName3 = recrutementVar["recrutement.userName3"];
                recrutement.userId3 = recrutementVar["recrutement.userId3"];
                recrutement.userEtat3 = "في الإنتظار";
                recrutement.userName4 = recrutementVar["recrutement.userName4"];
                recrutement.userId4 = recrutementVar["recrutement.userId4"];
                recrutement.userEtat4 = "في الإنتظار";
            }
            else if (cs.rolesNb == 5)
            {
                recrutement.userName1 = recrutementVar["recrutement.userName1"];
                recrutement.userId1 = recrutementVar["recrutement.userId1"];
                recrutement.userEtat1 = "في الإنتظار";
                recrutement.userName2 = recrutementVar["recrutement.userName2"];
                recrutement.userId2 = recrutementVar["recrutement.userId2"];
                recrutement.userEtat2 = "في الإنتظار";
                recrutement.userName3 = recrutementVar["recrutement.userName3"];
                recrutement.userId3 = recrutementVar["recrutement.userId3"];
                recrutement.userEtat3 = "في الإنتظار";
                recrutement.userName4 = recrutementVar["recrutement.userName4"];
                recrutement.userId4 = recrutementVar["recrutement.userId4"];
                recrutement.userEtat4 = "في الإنتظار";
                recrutement.userName5 = recrutementVar["recrutement.userName5"];
                recrutement.userId5 = recrutementVar["recrutement.userId5"];
                recrutement.userEtat5 = "في الإنتظار";
            }
            else if (cs.rolesNb == 6)
            {
                recrutement.userName1 = recrutementVar["recrutement.userName1"];
                recrutement.userId1 = recrutementVar["recrutement.userId1"];
                recrutement.userEtat1 = "في الإنتظار";
                recrutement.userName2 = recrutementVar["recrutement.userName2"];
                recrutement.userId2 = recrutementVar["recrutement.userId2"];
                recrutement.userEtat2 = "في الإنتظار";
                recrutement.userName3 = recrutementVar["recrutement.userName3"];
                recrutement.userId3 = recrutementVar["recrutement.userId3"];
                recrutement.userEtat3 = "في الإنتظار";
                recrutement.userName4 = recrutementVar["recrutement.userName4"];
                recrutement.userId4 = recrutementVar["recrutement.userId4"];
                recrutement.userEtat4 = "في الإنتظار";
                recrutement.userName5 = recrutementVar["recrutement.userName5"];
                recrutement.userId5 = recrutementVar["recrutement.userId5"];
                recrutement.userEtat5 = "في الإنتظار";
                recrutement.userName6 = recrutementVar["recrutement.userName6"];
                recrutement.userId6 = recrutementVar["recrutement.userId6"];
                recrutement.userEtat6 = "في الإنتظار";
            }
            else if (cs.rolesNb == 7)
            {
                recrutement.userName1 = recrutementVar["recrutement.userName1"];
                recrutement.userId1 = recrutementVar["recrutement.userId1"];
                recrutement.userEtat1 = "في الإنتظار";
                recrutement.userName2 = recrutementVar["recrutement.userName2"];
                recrutement.userId2 = recrutementVar["recrutement.userId2"];
                recrutement.userEtat2 = "في الإنتظار";
                recrutement.userName3 = recrutementVar["recrutement.userName3"];
                recrutement.userId3 = recrutementVar["recrutement.userId3"];
                recrutement.userEtat3 = "في الإنتظار";
                recrutement.userName4 = recrutementVar["recrutement.userName4"];
                recrutement.userId4 = recrutementVar["recrutement.userId4"];
                recrutement.userEtat4 = "في الإنتظار";
                recrutement.userName5 = recrutementVar["recrutement.userName5"];
                recrutement.userId5 = recrutementVar["recrutement.userId5"];
                recrutement.userEtat5 = "في الإنتظار";
                recrutement.userName6 = recrutementVar["recrutement.userName6"];
                recrutement.userId6 = recrutementVar["recrutement.userId6"];
                recrutement.userEtat6 = "في الإنتظار";
                recrutement.userName7 = recrutementVar["recrutement.userName7"];
                recrutement.userId7 = recrutementVar["recrutement.userId7"];
                recrutement.userEtat7 = "في الإنتظار";
            }
            else if (cs.rolesNb == 8)
            {
                recrutement.userName1 = recrutementVar["recrutement.userName1"];
                recrutement.userId1 = recrutementVar["recrutement.userId1"];
                recrutement.userEtat1 = "في الإنتظار";
                recrutement.userName2 = recrutementVar["recrutement.userName2"];
                recrutement.userId2 = recrutementVar["recrutement.userId2"];
                recrutement.userEtat2 = "في الإنتظار";
                recrutement.userName3 = recrutementVar["recrutement.userName3"];
                recrutement.userId3 = recrutementVar["recrutement.userId3"];
                recrutement.userEtat3 = "في الإنتظار";
                recrutement.userName4 = recrutementVar["recrutement.userName4"];
                recrutement.userId4 = recrutementVar["recrutement.userId4"];
                recrutement.userEtat4 = "في الإنتظار";
                recrutement.userName5 = recrutementVar["recrutement.userName5"];
                recrutement.userId5 = recrutementVar["recrutement.userId5"];
                recrutement.userEtat5 = "في الإنتظار";
                recrutement.userName6 = recrutementVar["recrutement.userName6"];
                recrutement.userId6 = recrutementVar["recrutement.userId6"];
                recrutement.userEtat6 = "في الإنتظار";
                recrutement.userName7 = recrutementVar["recrutement.userName7"];
                recrutement.userId7 = recrutementVar["recrutement.userId7"];
                recrutement.userEtat7 = "في الإنتظار";
                recrutement.userName8 = recrutementVar["recrutement.userName8"];
                recrutement.userId8 = recrutementVar["recrutement.userId8"];
                recrutement.userEtat8 = "في الإنتظار";
            }

            recrutement.etat = "في الإنتظار";
            DateTime dateTimeNow = DateTime.Now; // Return 00/00/0000 00:00:00
            string dateOnly = dateTimeNow.ToShortDateString(); //Return 00/00/0000
            recrutement.dateenreg = dateOnly;
            _context.recrutements.Add(recrutement);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRecrutement", new { id = recrutement.Id }, recrutement);
        }


        [HttpGet]
        [Route("GetByUserCreator/{userId}")]

        public List<Recrutement> GetByUserCreator(string userId)
        {
            List<Recrutement> UserDemission = new List<Recrutement>();
            UserDemission = _context.recrutements.Where(item => item.idUserCreator == userId).ToList();
            return UserDemission;
        }


        [HttpGet]
        [Route("GetDemand/{userId}")]

        public List<Recrutement> GetDemand(string userId)
        {


            List<Recrutement> UserRec = new List<Recrutement>();
            List<Recrutement> AllRecrutement = new List<Recrutement>();
            ConfigService cs = new ConfigService();
            cs = _contextD.ConfigServices.Where(item => item.serviceId == 19).FirstOrDefault();
            AllRecrutement = _context.recrutements.ToList();
            for (int i = 0; i < AllRecrutement.Count; i++)
            {
                if (AllRecrutement[i].userId1 == userId && AllRecrutement[i].userEtat1 == "في الإنتظار")
                {
                    UserRec.Add(AllRecrutement[i]);
                }

                else if (AllRecrutement[i].userId2 == userId && AllRecrutement[i].userEtat2 == "في الإنتظار" && AllRecrutement[i].userEtat1 == "موافق")
                {
                    UserRec.Add(AllRecrutement[i]);
                }

                else if (AllRecrutement[i].userId3 == userId && AllRecrutement[i].userEtat3 == "في الإنتظار" && AllRecrutement[i].userEtat2 == "موافق")
                {
                    UserRec.Add(AllRecrutement[i]);
                }

                else if (AllRecrutement[i].userId4 == userId && AllRecrutement[i].userEtat4 == "في الإنتظار" && AllRecrutement[i].userEtat3 == "موافق")
                {
                    UserRec.Add(AllRecrutement[i]);
                }

                else if (AllRecrutement[i].userId5 == userId && AllRecrutement[i].userEtat5 == "في الإنتظار" && AllRecrutement[i].userEtat4 == "موافق")
                {
                    UserRec.Add(AllRecrutement[i]);
                }

                else if (AllRecrutement[i].userId6 == userId && AllRecrutement[i].userEtat6 == "في الإنتظار" && AllRecrutement[i].userEtat5 == "موافق")
                {
                    UserRec.Add(AllRecrutement[i]);
                }

                else if (AllRecrutement[i].userId7 == userId && AllRecrutement[i].userEtat7 == "في الإنتظار" && AllRecrutement[i].userEtat6 == "موافق")
                {
                    UserRec.Add(AllRecrutement[i]);
                }

                else if (AllRecrutement[i].userId8 == userId && AllRecrutement[i].userEtat8 == "في الإنتظار" && AllRecrutement[i].userEtat7 == "موافق")
                {
                    UserRec.Add(AllRecrutement[i]);
                }


            }


            return UserRec;
        }


        [HttpGet]
        [Route("GetHistorique/{id}")]

        public Recrutement GetHistorique(int id)
        {
            Recrutement dem = new Recrutement();
            ConfigService cs = new ConfigService();
            dem = _context.recrutements.Where(item => item.Id == id).FirstOrDefault();
            cs = _contextD.ConfigServices.Where(item => item.serviceId == 19).FirstOrDefault();
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

        public Recrutement EditDemandByRole(int Id, string userEtat)
        {

            Recrutement dem = new Recrutement();
            ConfigService cs = new ConfigService();
            DateTime dateTimeNow = DateTime.Now; // Return 00/00/0000 00:00:00
            string dateOnly = dateTimeNow.ToShortDateString(); //Return 00/00/0000
            cs = _contextD.ConfigServices.Where(item => item.serviceId == 19).FirstOrDefault();
            dem = _context.recrutements.Where(item => item.Id == Id).FirstOrDefault();

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
        // DELETE: api/Recrutements/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Recrutement>> DeleteRecrutement(int id)
        {
            var recrutement = await _context.recrutements.FindAsync(id);
            if (recrutement == null)
            {
                return NotFound();
            }

            _context.recrutements.Remove(recrutement);
            await _context.SaveChangesAsync();

            return recrutement;
        }

        private bool RecrutementExists(int id)
        {
            return _context.recrutements.Any(e => e.Id == id);
        }
    }
}
