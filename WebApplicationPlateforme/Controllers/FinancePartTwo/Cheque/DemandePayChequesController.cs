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
using WebApplicationPlateforme.Model.FinancePartTwo.Cheques;
using WebApplicationPlateforme.Model.ServicesConfiguration;
using WebApplicationPlateforme.Model.User;
using WebApplicationPlateforme.Services;

namespace WebApplicationPlateforme.Controllers.FinancePartTwo.Cheque
{
    [Route("api/[controller]")]
    [ApiController]
    public class DemandePayChequesController : ControllerBase
    {
        private readonly FinanceContext _context;
        private readonly DawaaContext _contextD;
        private UserManager<ApplicationUser> UserManager;
        private readonly ApplicationDbContext ApplicationDbContext;
        public DemandePayChequesController(FinanceContext context, DawaaContext contextD,
            UserManager<ApplicationUser> _UserManager, ApplicationDbContext _ApplicationDbContext)
        {
            _context = context;
            _contextD = contextD;
            UserManager = _UserManager;
            ApplicationDbContext = _ApplicationDbContext;
        }

        // GET: api/DemandePayCheques
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DemandePayCheque>>> GetdemandePayCheques()
        {
            return await _context.demandePayCheques.OrderBy(item => item.Id).ToListAsync();
        }

        // GET: api/DemandePayCheques/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DemandePayCheque>> GetDemandePayCheque(int id)
        {
            var demandePayCheque = await _context.demandePayCheques.FindAsync(id);

            if (demandePayCheque == null)
            {
                return NotFound();
            }

            return demandePayCheque;
        }

        // PUT: api/DemandePayCheques/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDemandePayCheque(int id, DemandePayCheque demandePayCheque)
        {
            if (id != demandePayCheque.Id)
            {
                return BadRequest();
            }

            _context.Entry(demandePayCheque).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DemandePayChequeExists(id))
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

        // POST: api/DemandePayCheques
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
      
        Dictionary<String, String> chequeVar = new Dictionary<String, String>();

        Dictionary<String, String> csVar = new Dictionary<String, String>();

        [HttpPost]
        public async Task<ActionResult<DemandePayCheque>> PostDemandePayCheque(DemandePayCheque demandePayCheque)
        {
            ConfigService cs = new ConfigService();
            QuerysTable cq = new QuerysTable();
            List<QuerysTable> cqList = new List<QuerysTable>();
            //ApplicationUser user = new ApplicationUser();
            cs = _contextD.ConfigServices.Where(item => item.serviceId == 9).FirstOrDefault();
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
                    object parameterObject = demandePayCheque.idUserCreator;
                    dir = (ApplicationUser)methodInfo.Invoke(instance, new object[] { demandePayCheque.idUserCreator });


                }

                chequeVar.Add("demandePayCheque.userName" + i.ToString(), dir.FullName);
                chequeVar.Add("demandePayCheque.userId" + i.ToString(), dir.Id);
                chequeVar.Add("demandePayCheque.userEtat" + i.ToString(), "في الإنتظار");

            }

            // Get resimission Var Values

            List<string> chequeVarValues = chequeVar.Values.ToList();



            ///// Fill resimission Model 

            if (cs.rolesNb == 1)
            {
                demandePayCheque.userName1 = chequeVar["demandePayCheque.userName1"];
                demandePayCheque.userId1 = chequeVar["demandePayCheque.userId1"];
                demandePayCheque.userEtat1 = "في الإنتظار";
            }
            else if (cs.rolesNb == 2)
            {
                demandePayCheque.userName1 = chequeVar["demandePayCheque.userName1"];
                demandePayCheque.userId1 = chequeVar["demandePayCheque.userId1"];
                demandePayCheque.userEtat1 = "في الإنتظار";
                demandePayCheque.userName2 = chequeVar["demandePayCheque.userName2"];
                demandePayCheque.userId2 = chequeVar["demandePayCheque.userId2"];
                demandePayCheque.userEtat2 = "في الإنتظار";
            }
            else if (cs.rolesNb == 3)
            {
                demandePayCheque.userName1 = chequeVar["demandePayCheque.userName1"];
                demandePayCheque.userId1 = chequeVar["demandePayCheque.userId1"];
                demandePayCheque.userEtat1 = "في الإنتظار";
                demandePayCheque.userName2 = chequeVar["demandePayCheque.userName2"];
                demandePayCheque.userId2 = chequeVar["demandePayCheque.userId2"];
                demandePayCheque.userEtat2 = "في الإنتظار";
                demandePayCheque.userName3 = chequeVar["demandePayCheque.userName3"];
                demandePayCheque.userId3 = chequeVar["demandePayCheque.userId3"];
                demandePayCheque.userEtat3 = "في الإنتظار";
            }
            else if (cs.rolesNb == 4)
            {
                demandePayCheque.userName1 = chequeVar["demandePayCheque.userName1"];
                demandePayCheque.userId1 = chequeVar["demandePayCheque.userId1"];
                demandePayCheque.userEtat1 = "في الإنتظار";
                demandePayCheque.userName2 = chequeVar["demandePayCheque.userName2"];
                demandePayCheque.userId2 = chequeVar["demandePayCheque.userId2"];
                demandePayCheque.userEtat2 = "في الإنتظار";
                demandePayCheque.userName3 = chequeVar["demandePayCheque.userName3"];
                demandePayCheque.userId3 = chequeVar["demandePayCheque.userId3"];
                demandePayCheque.userEtat3 = "في الإنتظار";
                demandePayCheque.userName4 = chequeVar["demandePayCheque.userName4"];
                demandePayCheque.userId4 = chequeVar["demandePayCheque.userId4"];
                demandePayCheque.userEtat4 = "في الإنتظار";
            }
            else if (cs.rolesNb == 5)
            {
                demandePayCheque.userName1 = chequeVar["demandePayCheque.userName1"];
                demandePayCheque.userId1 = chequeVar["demandePayCheque.userId1"];
                demandePayCheque.userEtat1 = "في الإنتظار";
                demandePayCheque.userName2 = chequeVar["demandePayCheque.userName2"];
                demandePayCheque.userId2 = chequeVar["demandePayCheque.userId2"];
                demandePayCheque.userEtat2 = "في الإنتظار";
                demandePayCheque.userName3 = chequeVar["demandePayCheque.userName3"];
                demandePayCheque.userId3 = chequeVar["demandePayCheque.userId3"];
                demandePayCheque.userEtat3 = "في الإنتظار";
                demandePayCheque.userName4 = chequeVar["demandePayCheque.userName4"];
                demandePayCheque.userId4 = chequeVar["demandePayCheque.userId4"];
                demandePayCheque.userEtat4 = "في الإنتظار";
                demandePayCheque.userName5 = chequeVar["demandePayCheque.userName5"];
                demandePayCheque.userId5 = chequeVar["demandePayCheque.userId5"];
                demandePayCheque.userEtat5 = "في الإنتظار";
            }
            else if (cs.rolesNb == 6)
            {
                demandePayCheque.userName1 = chequeVar["demandePayCheque.userName1"];
                demandePayCheque.userId1 = chequeVar["demandePayCheque.userId1"];
                demandePayCheque.userEtat1 = "في الإنتظار";
                demandePayCheque.userName2 = chequeVar["demandePayCheque.userName2"];
                demandePayCheque.userId2 = chequeVar["demandePayCheque.userId2"];
                demandePayCheque.userEtat2 = "في الإنتظار";
                demandePayCheque.userName3 = chequeVar["demandePayCheque.userName3"];
                demandePayCheque.userId3 = chequeVar["demandePayCheque.userId3"];
                demandePayCheque.userEtat3 = "في الإنتظار";
                demandePayCheque.userName4 = chequeVar["demandePayCheque.userName4"];
                demandePayCheque.userId4 = chequeVar["demandePayCheque.userId4"];
                demandePayCheque.userEtat4 = "في الإنتظار";
                demandePayCheque.userName5 = chequeVar["demandePayCheque.userName5"];
                demandePayCheque.userId5 = chequeVar["demandePayCheque.userId5"];
                demandePayCheque.userEtat5 = "في الإنتظار";
                demandePayCheque.userName6 = chequeVar["demandePayCheque.userName6"];
                demandePayCheque.userId6 = chequeVar["demandePayCheque.userId6"];
                demandePayCheque.userEtat6 = "في الإنتظار";
            }
            else if (cs.rolesNb == 7)
            {
                demandePayCheque.userName1 = chequeVar["demandePayCheque.userName1"];
                demandePayCheque.userId1 = chequeVar["demandePayCheque.userId1"];
                demandePayCheque.userEtat1 = "في الإنتظار";
                demandePayCheque.userName2 = chequeVar["demandePayCheque.userName2"];
                demandePayCheque.userId2 = chequeVar["demandePayCheque.userId2"];
                demandePayCheque.userEtat2 = "في الإنتظار";
                demandePayCheque.userName3 = chequeVar["demandePayCheque.userName3"];
                demandePayCheque.userId3 = chequeVar["demandePayCheque.userId3"];
                demandePayCheque.userEtat3 = "في الإنتظار";
                demandePayCheque.userName4 = chequeVar["demandePayCheque.userName4"];
                demandePayCheque.userId4 = chequeVar["demandePayCheque.userId4"];
                demandePayCheque.userEtat4 = "في الإنتظار";
                demandePayCheque.userName5 = chequeVar["demandePayCheque.userName5"];
                demandePayCheque.userId5 = chequeVar["demandePayCheque.userId5"];
                demandePayCheque.userEtat5 = "في الإنتظار";
                demandePayCheque.userName6 = chequeVar["demandePayCheque.userName6"];
                demandePayCheque.userId6 = chequeVar["demandePayCheque.userId6"];
                demandePayCheque.userEtat6 = "في الإنتظار";
                demandePayCheque.userName7 = chequeVar["demandePayCheque.userName7"];
                demandePayCheque.userId7 = chequeVar["demandePayCheque.userId7"];
                demandePayCheque.userEtat7 = "في الإنتظار";
            }
            else if (cs.rolesNb == 8)
            {
                demandePayCheque.userName1 = chequeVar["demandePayCheque.userName1"];
                demandePayCheque.userId1 = chequeVar["demandePayCheque.userId1"];
                demandePayCheque.userEtat1 = "في الإنتظار";
                demandePayCheque.userName2 = chequeVar["demandePayCheque.userName2"];
                demandePayCheque.userId2 = chequeVar["demandePayCheque.userId2"];
                demandePayCheque.userEtat2 = "في الإنتظار";
                demandePayCheque.userName3 = chequeVar["demandePayCheque.userName3"];
                demandePayCheque.userId3 = chequeVar["demandePayCheque.userId3"];
                demandePayCheque.userEtat3 = "في الإنتظار";
                demandePayCheque.userName4 = chequeVar["demandePayCheque.userName4"];
                demandePayCheque.userId4 = chequeVar["demandePayCheque.userId4"];
                demandePayCheque.userEtat4 = "في الإنتظار";
                demandePayCheque.userName5 = chequeVar["demandePayCheque.userName5"];
                demandePayCheque.userId5 = chequeVar["demandePayCheque.userId5"];
                demandePayCheque.userEtat5 = "في الإنتظار";
                demandePayCheque.userName6 = chequeVar["demandePayCheque.userName6"];
                demandePayCheque.userId6 = chequeVar["demandePayCheque.userId6"];
                demandePayCheque.userEtat6 = "في الإنتظار";
                demandePayCheque.userName7 = chequeVar["demandePayCheque.userName7"];
                demandePayCheque.userId7 = chequeVar["demandePayCheque.userId7"];
                demandePayCheque.userEtat7 = "في الإنتظار";
                demandePayCheque.userName8 = chequeVar["demandePayCheque.userName8"];
                demandePayCheque.userId8 = chequeVar["demandePayCheque.userId8"];
                demandePayCheque.userEtat8 = "في الإنتظار";
            }

            demandePayCheque.etat = "في الإنتظار";
            DateTime dateTimeNow = DateTime.Now; // Return 00/00/0000 00:00:00
            string dateOnly = dateTimeNow.ToShortDateString(); //Return 00/00/0000
            demandePayCheque.dateenreg = dateOnly;
            _context.demandePayCheques.Add(demandePayCheque);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDemandePayCheque", new { id = demandePayCheque.Id }, demandePayCheque);
        }

        [HttpGet]
        [Route("GetByUserCreator/{userId}")]

        public List<DemandePayCheque> GetByUserCreator(string userId)
        {
            List<DemandePayCheque> UserPayCheques = new List<DemandePayCheque>();
            UserPayCheques = _context.demandePayCheques.Where(item => item.idUserCreator == userId).ToList();
            return UserPayCheques;
        }


        [HttpGet]
        [Route("GetDemand/{userId}")]

        public List<DemandePayCheque> GetDemand(string userId)
        {


            List<DemandePayCheque> UserPayCheques = new List<DemandePayCheque>();
            List<DemandePayCheque> AllPayCheques = new List<DemandePayCheque>();
            ConfigService cs = new ConfigService();
            cs = _contextD.ConfigServices.Where(item => item.serviceId == 9).FirstOrDefault();
            AllPayCheques = _context.demandePayCheques.ToList();
            for (int i = 0; i < AllPayCheques.Count; i++)
            {
                if (AllPayCheques[i].userId1 == userId && AllPayCheques[i].userEtat1 == "في الإنتظار")
                {
                    UserPayCheques.Add(AllPayCheques[i]);
                }

                else if (AllPayCheques[i].userId2 == userId && AllPayCheques[i].userEtat2 == "في الإنتظار" && AllPayCheques[i].userEtat1 == "موافق")
                {
                    UserPayCheques.Add(AllPayCheques[i]);
                }

                else if (AllPayCheques[i].userId3 == userId && AllPayCheques[i].userEtat3 == "في الإنتظار" && AllPayCheques[i].userEtat2 == "موافق")
                {
                    UserPayCheques.Add(AllPayCheques[i]);
                }

                else if (AllPayCheques[i].userId4 == userId && AllPayCheques[i].userEtat4 == "في الإنتظار" && AllPayCheques[i].userEtat3 == "موافق")
                {
                    UserPayCheques.Add(AllPayCheques[i]);
                }

                else if (AllPayCheques[i].userId5 == userId && AllPayCheques[i].userEtat5 == "في الإنتظار" && AllPayCheques[i].userEtat4 == "موافق")
                {
                    UserPayCheques.Add(AllPayCheques[i]);
                }

                else if (AllPayCheques[i].userId6 == userId && AllPayCheques[i].userEtat6 == "في الإنتظار" && AllPayCheques[i].userEtat5 == "موافق")
                {
                    UserPayCheques.Add(AllPayCheques[i]);
                }

                else if (AllPayCheques[i].userId7 == userId && AllPayCheques[i].userEtat7 == "في الإنتظار" && AllPayCheques[i].userEtat6 == "موافق")
                {
                    UserPayCheques.Add(AllPayCheques[i]);
                }

                else if (AllPayCheques[i].userId8 == userId && AllPayCheques[i].userEtat8 == "في الإنتظار" && AllPayCheques[i].userEtat7 == "موافق")
                {
                    UserPayCheques.Add(AllPayCheques[i]);
                }


            }


            return UserPayCheques;
        }


        [HttpGet]
        [Route("GetHistorique/{id}")]

        public DemandePayCheque GetHistorique(int id)
        {
            DemandePayCheque dem = new DemandePayCheque();
            ConfigService cs = new ConfigService();
            dem = _context.demandePayCheques.Where(item => item.Id == id).FirstOrDefault();
            cs = _contextD.ConfigServices.Where(item => item.serviceId == 9).FirstOrDefault();
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

        public DemandePayCheque EditDemandByRole(int Id, string userEtat)
        {

            DemandePayCheque dem = new DemandePayCheque();
            ConfigService cs = new ConfigService();
            DateTime dateTimeNow = DateTime.Now; // Return 00/00/0000 00:00:00
            string dateOnly = dateTimeNow.ToShortDateString(); //Return 00/00/0000
            cs = _contextD.ConfigServices.Where(item => item.serviceId == 9).FirstOrDefault();
            dem = _context.demandePayCheques.Where(item => item.Id == Id).FirstOrDefault();

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

        // DELETE: api/DemandePayCheques/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<DemandePayCheque>> DeleteDemandePayCheque(int id)
        {
            var demandePayCheque = await _context.demandePayCheques.FindAsync(id);
            if (demandePayCheque == null)
            {
                return NotFound();
            }

            _context.demandePayCheques.Remove(demandePayCheque);
            await _context.SaveChangesAsync();

            return demandePayCheque;
        }

        private bool DemandePayChequeExists(int id)
        {
            return _context.demandePayCheques.Any(e => e.Id == id);
        }
    }
}
