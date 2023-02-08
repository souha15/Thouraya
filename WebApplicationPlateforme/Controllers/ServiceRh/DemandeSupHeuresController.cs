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
    public class DemandeSupHeuresController : ControllerBase
    {
        private readonly FinanceContext _context;
        private readonly DawaaContext _contextD;
        private UserManager<ApplicationUser> UserManager;
        private readonly ApplicationDbContext ApplicationDbContext;
        public DemandeSupHeuresController(FinanceContext context, DawaaContext contextD,
            UserManager<ApplicationUser> _UserManager, ApplicationDbContext _ApplicationDbContext)
        {
            _context = context;
            _contextD = contextD;
            UserManager = _UserManager;
            ApplicationDbContext = _ApplicationDbContext;
        }

        // GET: api/DemandeSupHeures
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DemandeSupHeure>>> GetdemandeSupHeures()
        {
            return await _context.demandeSupHeures.OrderBy(item => item.Id).ToListAsync();
        }

        // GET: api/DemandeSupHeures/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DemandeSupHeure>> GetDemandeSupHeure(int id)
        {
            var demandeSupHeure = await _context.demandeSupHeures.FindAsync(id);

            if (demandeSupHeure == null)
            {
                return NotFound();
            }

            return demandeSupHeure;
        }

        // PUT: api/DemandeSupHeures/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDemandeSupHeure(int id, DemandeSupHeure demandeSupHeure)
        {
            if (id != demandeSupHeure.Id)
            {
                return BadRequest();
            }

            _context.Entry(demandeSupHeure).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DemandeSupHeureExists(id))
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

        // POST: api/DemandeSupHeures
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.

        Dictionary<String, String> suppheureVar = new Dictionary<String, String>();

        Dictionary<String, String> csVar = new Dictionary<String, String>();


        [HttpPost]
        public async Task<ActionResult<DemandeSupHeure>> PostDemandeSupHeure(DemandeSupHeure demandeSupHeure)
        {
            // Get Configuration Of the service 

            ConfigService cs = new ConfigService();
            QuerysTable cq = new QuerysTable();
            List<QuerysTable> cqList = new List<QuerysTable>();
            //ApplicationUser user = new ApplicationUser();
            cs = _contextD.ConfigServices.Where(item => item.serviceId == 7).FirstOrDefault();
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
                    object parameterObject = demandeSupHeure.idUserCreator;
                    dir = (ApplicationUser)methodInfo.Invoke(instance, new object[] { demandeSupHeure.idUserCreator });


                }

                suppheureVar.Add("demandeSupHeure.userName" + i.ToString(), dir.FullName);
                suppheureVar.Add("demandeSupHeure.userId" + i.ToString(), dir.Id);
                suppheureVar.Add("demandeSupHeure.userEtat" + i.ToString(), "في الإنتظار");

            }

            // Get resimission Var Values

            List<string> residenceVarValues = suppheureVar.Values.ToList();



            ///// Fill resimission Model 

            if (cs.rolesNb == 1)
            {
                demandeSupHeure.userName1 = suppheureVar["demandeSupHeure.userName1"];
                demandeSupHeure.userId1 = suppheureVar["demandeSupHeure.userId1"];
                demandeSupHeure.userEtat1 = "في الإنتظار";
            }
            else if (cs.rolesNb == 2)
            {
                demandeSupHeure.userName1 = suppheureVar["demandeSupHeure.userName1"];
                demandeSupHeure.userId1 = suppheureVar["demandeSupHeure.userId1"];
                demandeSupHeure.userEtat1 = "في الإنتظار";
                demandeSupHeure.userName2 = suppheureVar["demandeSupHeure.userName2"];
                demandeSupHeure.userId2 = suppheureVar["demandeSupHeure.userId2"];
                demandeSupHeure.userEtat2 = "في الإنتظار";
            }
            else if (cs.rolesNb == 3)
            {
                demandeSupHeure.userName1 = suppheureVar["demandeSupHeure.userName1"];
                demandeSupHeure.userId1 = suppheureVar["demandeSupHeure.userId1"];
                demandeSupHeure.userEtat1 = "في الإنتظار";
                demandeSupHeure.userName2 = suppheureVar["demandeSupHeure.userName2"];
                demandeSupHeure.userId2 = suppheureVar["demandeSupHeure.userId2"];
                demandeSupHeure.userEtat2 = "في الإنتظار";
                demandeSupHeure.userName3 = suppheureVar["demandeSupHeure.userName3"];
                demandeSupHeure.userId3 = suppheureVar["demandeSupHeure.userId3"];
                demandeSupHeure.userEtat3 = "في الإنتظار";
            }
            else if (cs.rolesNb == 4)
            {
                demandeSupHeure.userName1 = suppheureVar["demandeSupHeure.userName1"];
                demandeSupHeure.userId1 = suppheureVar["demandeSupHeure.userId1"];
                demandeSupHeure.userEtat1 = "في الإنتظار";
                demandeSupHeure.userName2 = suppheureVar["demandeSupHeure.userName2"];
                demandeSupHeure.userId2 = suppheureVar["demandeSupHeure.userId2"];
                demandeSupHeure.userEtat2 = "في الإنتظار";
                demandeSupHeure.userName3 = suppheureVar["demandeSupHeure.userName3"];
                demandeSupHeure.userId3 = suppheureVar["demandeSupHeure.userId3"];
                demandeSupHeure.userEtat3 = "في الإنتظار";
                demandeSupHeure.userName4 = suppheureVar["demandeSupHeure.userName4"];
                demandeSupHeure.userId4 = suppheureVar["demandeSupHeure.userId4"];
                demandeSupHeure.userEtat4 = "في الإنتظار";
            }
            else if (cs.rolesNb == 5)
            {
                demandeSupHeure.userName1 = suppheureVar["demandeSupHeure.userName1"];
                demandeSupHeure.userId1 = suppheureVar["demandeSupHeure.userId1"];
                demandeSupHeure.userEtat1 = "في الإنتظار";
                demandeSupHeure.userName2 = suppheureVar["demandeSupHeure.userName2"];
                demandeSupHeure.userId2 = suppheureVar["demandeSupHeure.userId2"];
                demandeSupHeure.userEtat2 = "في الإنتظار";
                demandeSupHeure.userName3 = suppheureVar["demandeSupHeure.userName3"];
                demandeSupHeure.userId3 = suppheureVar["demandeSupHeure.userId3"];
                demandeSupHeure.userEtat3 = "في الإنتظار";
                demandeSupHeure.userName4 = suppheureVar["demandeSupHeure.userName4"];
                demandeSupHeure.userId4 = suppheureVar["demandeSupHeure.userId4"];
                demandeSupHeure.userEtat4 = "في الإنتظار";
                demandeSupHeure.userName5 = suppheureVar["demandeSupHeure.userName5"];
                demandeSupHeure.userId5 = suppheureVar["demandeSupHeure.userId5"];
                demandeSupHeure.userEtat5 = "في الإنتظار";
            }
            else if (cs.rolesNb == 6)
            {
                demandeSupHeure.userName1 = suppheureVar["demandeSupHeure.userName1"];
                demandeSupHeure.userId1 = suppheureVar["demandeSupHeure.userId1"];
                demandeSupHeure.userEtat1 = "في الإنتظار";
                demandeSupHeure.userName2 = suppheureVar["demandeSupHeure.userName2"];
                demandeSupHeure.userId2 = suppheureVar["demandeSupHeure.userId2"];
                demandeSupHeure.userEtat2 = "في الإنتظار";
                demandeSupHeure.userName3 = suppheureVar["demandeSupHeure.userName3"];
                demandeSupHeure.userId3 = suppheureVar["demandeSupHeure.userId3"];
                demandeSupHeure.userEtat3 = "في الإنتظار";
                demandeSupHeure.userName4 = suppheureVar["demandeSupHeure.userName4"];
                demandeSupHeure.userId4 = suppheureVar["demandeSupHeure.userId4"];
                demandeSupHeure.userEtat4 = "في الإنتظار";
                demandeSupHeure.userName5 = suppheureVar["demandeSupHeure.userName5"];
                demandeSupHeure.userId5 = suppheureVar["demandeSupHeure.userId5"];
                demandeSupHeure.userEtat5 = "في الإنتظار";
                demandeSupHeure.userName6 = suppheureVar["demandeSupHeure.userName6"];
                demandeSupHeure.userId6 = suppheureVar["demandeSupHeure.userId6"];
                demandeSupHeure.userEtat6 = "في الإنتظار";
            }
            else if (cs.rolesNb == 7)
            {
                demandeSupHeure.userName1 = suppheureVar["demandeSupHeure.userName1"];
                demandeSupHeure.userId1 = suppheureVar["demandeSupHeure.userId1"];
                demandeSupHeure.userEtat1 = "في الإنتظار";
                demandeSupHeure.userName2 = suppheureVar["demandeSupHeure.userName2"];
                demandeSupHeure.userId2 = suppheureVar["demandeSupHeure.userId2"];
                demandeSupHeure.userEtat2 = "في الإنتظار";
                demandeSupHeure.userName3 = suppheureVar["demandeSupHeure.userName3"];
                demandeSupHeure.userId3 = suppheureVar["demandeSupHeure.userId3"];
                demandeSupHeure.userEtat3 = "في الإنتظار";
                demandeSupHeure.userName4 = suppheureVar["demandeSupHeure.userName4"];
                demandeSupHeure.userId4 = suppheureVar["demandeSupHeure.userId4"];
                demandeSupHeure.userEtat4 = "في الإنتظار";
                demandeSupHeure.userName5 = suppheureVar["demandeSupHeure.userName5"];
                demandeSupHeure.userId5 = suppheureVar["demandeSupHeure.userId5"];
                demandeSupHeure.userEtat5 = "في الإنتظار";
                demandeSupHeure.userName6 = suppheureVar["demandeSupHeure.userName6"];
                demandeSupHeure.userId6 = suppheureVar["demandeSupHeure.userId6"];
                demandeSupHeure.userEtat6 = "في الإنتظار";
                demandeSupHeure.userName7 = suppheureVar["demandeSupHeure.userName7"];
                demandeSupHeure.userId7 = suppheureVar["demandeSupHeure.userId7"];
                demandeSupHeure.userEtat7 = "في الإنتظار";
            }
            else if (cs.rolesNb == 8)
            {
                demandeSupHeure.userName1 = suppheureVar["demandeSupHeure.userName1"];
                demandeSupHeure.userId1 = suppheureVar["demandeSupHeure.userId1"];
                demandeSupHeure.userEtat1 = "في الإنتظار";
                demandeSupHeure.userName2 = suppheureVar["demandeSupHeure.userName2"];
                demandeSupHeure.userId2 = suppheureVar["demandeSupHeure.userId2"];
                demandeSupHeure.userEtat2 = "في الإنتظار";
                demandeSupHeure.userName3 = suppheureVar["demandeSupHeure.userName3"];
                demandeSupHeure.userId3 = suppheureVar["demandeSupHeure.userId3"];
                demandeSupHeure.userEtat3 = "في الإنتظار";
                demandeSupHeure.userName4 = suppheureVar["demandeSupHeure.userName4"];
                demandeSupHeure.userId4 = suppheureVar["demandeSupHeure.userId4"];
                demandeSupHeure.userEtat4 = "في الإنتظار";
                demandeSupHeure.userName5 = suppheureVar["demandeSupHeure.userName5"];
                demandeSupHeure.userId5 = suppheureVar["demandeSupHeure.userId5"];
                demandeSupHeure.userEtat5 = "في الإنتظار";
                demandeSupHeure.userName6 = suppheureVar["demandeSupHeure.userName6"];
                demandeSupHeure.userId6 = suppheureVar["demandeSupHeure.userId6"];
                demandeSupHeure.userEtat6 = "في الإنتظار";
                demandeSupHeure.userName7 = suppheureVar["demandeSupHeure.userName7"];
                demandeSupHeure.userId7 = suppheureVar["demandeSupHeure.userId7"];
                demandeSupHeure.userEtat7 = "في الإنتظار";
                demandeSupHeure.userName8 = suppheureVar["demandeSupHeure.userName8"];
                demandeSupHeure.userId8 = suppheureVar["demandeSupHeure.userId8"];
                demandeSupHeure.userEtat8 = "في الإنتظار";
            }

            demandeSupHeure.etat = "في الإنتظار";
            DateTime dateTimeNow = DateTime.Now; // Return 00/00/0000 00:00:00
            string dateOnly = dateTimeNow.ToShortDateString(); //Return 00/00/0000
            demandeSupHeure.dateenreg = dateOnly;
            _context.demandeSupHeures.Add(demandeSupHeure);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDemandeSupHeure", new { id = demandeSupHeure.Id }, demandeSupHeure);
        }


        [HttpGet]
        [Route("GetByUserCreator/{userId}")]

        public List<DemandeSupHeure> GetByUserCreator(string userId)
        {
            List<DemandeSupHeure> UserSuppHeure = new List<DemandeSupHeure>();
            UserSuppHeure = _context.demandeSupHeures.Where(item => item.idUserCreator == userId).ToList();
            return UserSuppHeure;
        }

        [HttpGet]
        [Route("GetDemand/{userId}")]

        public List<DemandeSupHeure> GetDemand(string userId)
        {


            List<DemandeSupHeure> UserSupHeure = new List<DemandeSupHeure>();
            List<DemandeSupHeure> AllSupHeure = new List<DemandeSupHeure>();
            ConfigService cs = new ConfigService();
            cs = _contextD.ConfigServices.Where(item => item.serviceId == 7).FirstOrDefault();
            AllSupHeure = _context.demandeSupHeures.ToList();
            for (int i = 0; i < AllSupHeure.Count; i++)
            {
                if (AllSupHeure[i].userId1 == userId && AllSupHeure[i].userEtat1 == "في الإنتظار")
                {
                    UserSupHeure.Add(AllSupHeure[i]);
                }

                else if (AllSupHeure[i].userId2 == userId && AllSupHeure[i].userEtat2 == "في الإنتظار" && AllSupHeure[i].userEtat1 == "موافق")
                {
                    UserSupHeure.Add(AllSupHeure[i]);
                }

                else if (AllSupHeure[i].userId3 == userId && AllSupHeure[i].userEtat3 == "في الإنتظار" && AllSupHeure[i].userEtat2 == "موافق")
                {
                    UserSupHeure.Add(AllSupHeure[i]);
                }

                else if (AllSupHeure[i].userId4 == userId && AllSupHeure[i].userEtat4 == "في الإنتظار" && AllSupHeure[i].userEtat3 == "موافق")
                {
                    UserSupHeure.Add(AllSupHeure[i]);
                }

                else if (AllSupHeure[i].userId5 == userId && AllSupHeure[i].userEtat5 == "في الإنتظار" && AllSupHeure[i].userEtat4 == "موافق")
                {
                    UserSupHeure.Add(AllSupHeure[i]);
                }

                else if (AllSupHeure[i].userId6 == userId && AllSupHeure[i].userEtat6 == "في الإنتظار" && AllSupHeure[i].userEtat5 == "موافق")
                {
                    UserSupHeure.Add(AllSupHeure[i]);
                }

                else if (AllSupHeure[i].userId7 == userId && AllSupHeure[i].userEtat7 == "في الإنتظار" && AllSupHeure[i].userEtat6 == "موافق")
                {
                    UserSupHeure.Add(AllSupHeure[i]);
                }

                else if (AllSupHeure[i].userId8 == userId && AllSupHeure[i].userEtat8 == "في الإنتظار" && AllSupHeure[i].userEtat7 == "موافق")
                {
                    UserSupHeure.Add(AllSupHeure[i]);
                }


            }


            return UserSupHeure;
        }


        [HttpGet]
        [Route("GetHistorique/{id}")]

        public DemandeSupHeure GetHistorique(int id)
        {
            DemandeSupHeure supp = new DemandeSupHeure();
            ConfigService cs = new ConfigService();
            supp = _context.demandeSupHeures.Where(item => item.Id == id).FirstOrDefault();
            cs = _contextD.ConfigServices.Where(item => item.serviceId == 7).FirstOrDefault();
            string rslt = "";


            // Traiter le cas d'accepter la demande par tt le monde 

            if (supp.etat == "موافق")
            {
                rslt = "لقد تمت الموافقة على الطلب من قبل جميع الأطراف";
            }

            // Traiter le cas de refuser la demande par quelqu'un cas par cas  

            else if (supp.etat == "رفض")
            {
                if (supp.userEtat1 == "رفض")
                {
                    rslt = "لقد تم رفض الطلب من قبل " + cs.roleName1;
                }
                else if (supp.userEtat2 == "رفض")
                {
                    rslt = "لقد تم رفض الطلب من قبل " + cs.roleName2;
                }
                else if (supp.userEtat3 == "رفض")
                {
                    rslt = "لقد تم رفض الطلب من قبل " + cs.roleName3;
                }
                else if (supp.userEtat4 == "رفض")
                {
                    rslt = "لقد تم رفض الطلب من قبل " + cs.roleName4;

                }
                else if (supp.userEtat5 == "رفض")
                {
                    rslt = "لقد تم رفض الطلب من قبل " + cs.roleName5;
                }
                else if (supp.userEtat6 == "رفض")
                {
                    rslt = "لقد تم رفض الطلب من قبل " + cs.roleName6;
                }
                else if (supp.userEtat7 == "رفض")
                {
                    rslt = "لقد تم رفض الطلب من قبل " + cs.roleName7;
                }
                else if (supp.userEtat8 == "رفض")
                {
                    rslt = "لقد تم رفض الطلب من قبل " + cs.roleName8;
                }
            }

            // Traiter les cas d'attente et d'accept cas par cas 
            else
            {
                if (supp.userEtat1 == "في الإنتظار")
                {
                    rslt = " لم تتم معالجة الطلب من قبل " + cs.roleName1;
                }

                else if (supp.userEtat1 == "موافق" && supp.userEtat2 == "في الإنتظار")
                {
                    rslt = "وافق " + cs.roleName1 + " على الطلب ولكن الطلب معلق عند " + cs.roleName2;
                }
                else if (supp.userEtat2 == "موافق" && supp.userEtat3 == "في الإنتظار")
                {
                    rslt = "وافق " + cs.roleName2 + " على الطلب ولكن الطلب معلق عند  " + cs.roleName3;
                }
                else if (supp.userEtat3 == "موافق" && supp.userEtat4 == "في الإنتظار")
                {
                    rslt = "وافق " + cs.roleName3 + " على الطلب ولكن الطلب معلق عند " + cs.roleName4;
                }
                else if (supp.userEtat4 == "موافق" && supp.userEtat5 == "في الإنتظار")
                {
                    rslt = "وافق " + cs.roleName3 + " على الطلب ولكن الطلب معلق عند  " + cs.roleName5;
                }
                else if (supp.userEtat5 == "موافق" && supp.userEtat6 == "في الإنتظار")
                {
                    rslt = "وافق " + cs.roleName5 + " على الطلب ولكن الطلب معلق عند" + cs.roleName6;
                }
                else if (supp.userEtat6 == "موافق" && supp.userEtat7 == "في الإنتظار")
                {
                    rslt = "وافق " + cs.roleName6 + " على الطلب ولكن الطلب معلق عند" + cs.roleName7;
                }
                else if (supp.userEtat7 == "موافق" && supp.userEtat8 == "في الإنتظار")
                {
                    rslt = "وافق " + cs.roleName7 + " على الطلب ولكن الطلب معلق عند" + cs.roleName8;
                }
            }
            supp.attribut6 = rslt;

            return supp;
        }




        [HttpGet]
        [Route("EditDemandByRole/{Id}/{userEtat}")]

        public DemandeSupHeure EditDemandByRole(int Id, string userEtat)
        {

            DemandeSupHeure supp = new DemandeSupHeure();
            ConfigService cs = new ConfigService();
            DateTime dateTimeNow = DateTime.Now; // Return 00/00/0000 00:00:00
            string dateOnly = dateTimeNow.ToShortDateString(); //Return 00/00/0000
            cs = _contextD.ConfigServices.Where(item => item.serviceId == 7).FirstOrDefault();
            supp = _context.demandeSupHeures.Where(item => item.Id == Id).FirstOrDefault();

            if (supp.userEtat1 == "في الإنتظار")
            {
                if (userEtat != "رفض")
                {
                    supp.userEtat1 = userEtat;
                    supp.userDate1 = dateOnly;
                    if (cs.rolesNb > 1)
                    {
                        supp.iddir = supp.userId2;
                        supp.nomdir = supp.userName2;

                    }
                }
                else
                {
                    supp.userEtat1 = userEtat;
                    supp.userDate1 = dateOnly;
                    supp.etat = "رفض";
                }

            }
            else if (supp.userEtat1 == "موافق" && supp.userEtat2 == "في الإنتظار")
            {
                if (userEtat != "رفض")
                {
                    supp.userEtat2 = userEtat;
                    supp.userDate2 = dateOnly;
                    if (cs.rolesNb > 2)
                    {
                        supp.iddir = supp.userId3;
                        supp.nomdir = supp.userName3;
                    }
                }
                else
                {
                    supp.userEtat2 = userEtat;
                    supp.userDate2 = dateOnly;
                    supp.etat = "رفض";
                }
            }
            else if (supp.userEtat2 == "موافق" && supp.userEtat3 == "في الإنتظار")
            {
                if (userEtat != "رفض")
                {
                    supp.userEtat3 = userEtat;
                    supp.userDate3 = dateOnly;
                    if (cs.rolesNb > 3)
                    {
                        supp.iddir = supp.userId4;
                        supp.nomdir = supp.userName4;
                    }
                }
                else
                {
                    supp.userEtat3 = userEtat;
                    supp.userDate3 = dateOnly;
                    supp.etat = "رفض";
                }
            }
            else if (supp.userEtat3 == "موافق" && supp.userEtat4 == "في الإنتظار")
            {
                if (userEtat != "رفض")
                {
                    supp.userEtat4 = userEtat;
                    supp.userDate4 = dateOnly;
                    if (cs.rolesNb > 4)
                    {
                        supp.iddir = supp.userId5;
                        supp.nomdir = supp.userName5;
                    }
                }
                else
                {
                    supp.userEtat4 = userEtat;
                    supp.userDate4 = dateOnly;
                    supp.etat = "رفض";
                }
            }
            else if (supp.userEtat4 == "موافق" && supp.userEtat5 == "في الإنتظار")
            {
                if (userEtat != "رفض")
                {
                    supp.userEtat5 = userEtat;
                    supp.userDate5 = dateOnly;
                    if (cs.rolesNb > 5)
                    {
                        supp.iddir = supp.userId6;
                        supp.nomdir = supp.userName6;
                    }
                }
                else
                {
                    supp.userEtat5 = userEtat;
                    supp.userDate5 = dateOnly;
                    supp.etat = "رفض";
                }
            }
            else if (supp.userEtat5 == "موافق" && supp.userEtat6 == "في الإنتظار")
            {
                if (userEtat != "رفض")
                {
                    supp.userEtat6 = userEtat;
                    supp.userDate6 = dateOnly;
                    if (cs.rolesNb > 6)
                    {
                        supp.iddir = supp.userId7;
                        supp.nomdir = supp.userName7;
                    }
                }
                else
                {
                    supp.userEtat6 = userEtat;
                    supp.userDate6 = dateOnly;
                    supp.etat = "رفض";
                }
            }
            else if (supp.userEtat6 == "موافق" && supp.userEtat7 == "في الإنتظار")
            {
                if (userEtat != "رفض")
                {
                    supp.userEtat7 = userEtat;
                    supp.userDate7 = dateOnly;
                    if (cs.rolesNb > 7)
                    {
                        supp.iddir = supp.userId8;
                        supp.nomdir = supp.userName8;
                    }
                }
                else
                {
                    supp.userEtat7 = userEtat;
                    supp.userDate7 = dateOnly;
                    supp.etat = "رفض";
                }
            }
            else if (supp.userEtat7 == "موافق" && supp.userEtat8 == "في الإنتظار")
            {
                if (userEtat != "رفض")
                {
                    supp.userEtat8 = userEtat;
                    supp.userDate8 = dateOnly;
                }
                else
                {
                    supp.userEtat8 = userEtat;
                    supp.userDate8 = dateOnly;
                    supp.etat = "رفض";
                }
            }

            if (cs.rolesNb == 1 && supp.userEtat1 == "موافق")
            {
                supp.etat = "موافق";
            }
            else if (cs.rolesNb == 2 && supp.userEtat2 == "موافق")
            {
                supp.etat = "موافق";

            }
            else if (cs.rolesNb == 3 && supp.userEtat3 == "موافق")
            {
                supp.etat = "موافق";
            }
            else if (cs.rolesNb == 4 && supp.userEtat4 == "موافق")
            {
                supp.etat = "موافق";
            }
            else if (cs.rolesNb == 5 && supp.userEtat5 == "موافق")
            {
                supp.etat = "موافق";
            }
            else if (cs.rolesNb == 6 && supp.userEtat6 == "موافق")
            {
                supp.etat = "موافق";
            }
            else if (cs.rolesNb == 7 && supp.userEtat7 == "موافق")
            {
                supp.etat = "موافق";
            }
            else if (cs.rolesNb == 8 && supp.userEtat8 == "موافق")
            {
                supp.etat = "موافق";
            }


            return supp;

        }

        // DELETE: api/DemandeSupHeures/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<DemandeSupHeure>> DeleteDemandeSupHeure(int id)
        {
            var demandeSupHeure = await _context.demandeSupHeures.FindAsync(id);
            if (demandeSupHeure == null)
            {
                return NotFound();
            }

            _context.demandeSupHeures.Remove(demandeSupHeure);
            await _context.SaveChangesAsync();

            return demandeSupHeure;
        }

        private bool DemandeSupHeureExists(int id)
        {
            return _context.demandeSupHeures.Any(e => e.Id == id);
        }
    }
}
