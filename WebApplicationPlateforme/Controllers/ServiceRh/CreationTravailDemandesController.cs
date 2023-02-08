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
    public class CreationTravailDemandesController : ControllerBase
    {
        private readonly FinanceContext _context;
        private readonly DawaaContext _contextD;
        private UserManager<ApplicationUser> UserManager;
        private readonly ApplicationDbContext ApplicationDbContext;
        public CreationTravailDemandesController(FinanceContext context, DawaaContext contextD,
            UserManager<ApplicationUser> _UserManager, ApplicationDbContext _ApplicationDbContext)
        {
            _context = context;
            _contextD = contextD;
            UserManager = _UserManager;
            ApplicationDbContext = _ApplicationDbContext;
        }

        // GET: api/CreationTravailDemandes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CreationTravailDemande>>> GetcreationTravailDemandes()
        {
            return await _context.creationTravailDemandes.OrderBy(item => item.Id).ToListAsync();
        }

        // GET: api/CreationTravailDemandes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CreationTravailDemande>> GetCreationTravailDemande(int id)
        {
            var creationTravailDemande = await _context.creationTravailDemandes.FindAsync(id);

            if (creationTravailDemande == null)
            {
                return NotFound();
            }

            return creationTravailDemande;
        }

        // PUT: api/CreationTravailDemandes/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCreationTravailDemande(int id, CreationTravailDemande creationTravailDemande)
        {
            if (id != creationTravailDemande.Id)
            {
                return BadRequest();
            }

            _context.Entry(creationTravailDemande).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CreationTravailDemandeExists(id))
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

        // POST: api/CreationTravailDemandes
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        Dictionary<String, String> creationtravailVar = new Dictionary<String, String>();

        Dictionary<String, String> csVar = new Dictionary<String, String>();


        [HttpPost]
        public async Task<ActionResult<CreationTravailDemande>> PostCreationTravailDemande(CreationTravailDemande creationTravailDemande)
        {
            ConfigService cs = new ConfigService();
            QuerysTable cq = new QuerysTable();
            List<QuerysTable> cqList = new List<QuerysTable>();
            //ApplicationUser user = new ApplicationUser();
            cs = _contextD.ConfigServices.Where(item => item.serviceId == 8).FirstOrDefault();
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
                    object parameterObject = creationTravailDemande.idUserCreator;
                    dir = (ApplicationUser)methodInfo.Invoke(instance, new object[] { creationTravailDemande.idUserCreator });


                }

                creationtravailVar.Add("creationTravailDemande.userName" + i.ToString(), dir.FullName);
                creationtravailVar.Add("creationTravailDemande.userId" + i.ToString(), dir.Id);
                creationtravailVar.Add("creationTravailDemande.userEtat" + i.ToString(), "في الإنتظار");

            }

            // Get resimission Var Values

            List<string> residenceVarValues = creationtravailVar.Values.ToList();



            ///// Fill resimission Model 

            if (cs.rolesNb == 1)
            {
                creationTravailDemande.userName1 = creationtravailVar["creationTravailDemande.userName1"];
                creationTravailDemande.userId1 = creationtravailVar["creationTravailDemande.userId1"];
                creationTravailDemande.userEtat1 = "في الإنتظار";
            }
            else if (cs.rolesNb == 2)
            {
                creationTravailDemande.userName1 = creationtravailVar["creationTravailDemande.userName1"];
                creationTravailDemande.userId1 = creationtravailVar["creationTravailDemande.userId1"];
                creationTravailDemande.userEtat1 = "في الإنتظار";
                creationTravailDemande.userName2 = creationtravailVar["creationTravailDemande.userName2"];
                creationTravailDemande.userId2 = creationtravailVar["creationTravailDemande.userId2"];
                creationTravailDemande.userEtat2 = "في الإنتظار";
            }
            else if (cs.rolesNb == 3)
            {
                creationTravailDemande.userName1 = creationtravailVar["creationTravailDemande.userName1"];
                creationTravailDemande.userId1 = creationtravailVar["creationTravailDemande.userId1"];
                creationTravailDemande.userEtat1 = "في الإنتظار";
                creationTravailDemande.userName2 = creationtravailVar["creationTravailDemande.userName2"];
                creationTravailDemande.userId2 = creationtravailVar["creationTravailDemande.userId2"];
                creationTravailDemande.userEtat2 = "في الإنتظار";
                creationTravailDemande.userName3 = creationtravailVar["creationTravailDemande.userName3"];
                creationTravailDemande.userId3 = creationtravailVar["creationTravailDemande.userId3"];
                creationTravailDemande.userEtat3 = "في الإنتظار";
            }
            else if (cs.rolesNb == 4)
            {
                creationTravailDemande.userName1 = creationtravailVar["creationTravailDemande.userName1"];
                creationTravailDemande.userId1 = creationtravailVar["creationTravailDemande.userId1"];
                creationTravailDemande.userEtat1 = "في الإنتظار";
                creationTravailDemande.userName2 = creationtravailVar["creationTravailDemande.userName2"];
                creationTravailDemande.userId2 = creationtravailVar["creationTravailDemande.userId2"];
                creationTravailDemande.userEtat2 = "في الإنتظار";
                creationTravailDemande.userName3 = creationtravailVar["creationTravailDemande.userName3"];
                creationTravailDemande.userId3 = creationtravailVar["creationTravailDemande.userId3"];
                creationTravailDemande.userEtat3 = "في الإنتظار";
                creationTravailDemande.userName4 = creationtravailVar["creationTravailDemande.userName4"];
                creationTravailDemande.userId4 = creationtravailVar["creationTravailDemande.userId4"];
                creationTravailDemande.userEtat4 = "في الإنتظار";
            }
            else if (cs.rolesNb == 5)
            {
                creationTravailDemande.userName1 = creationtravailVar["creationTravailDemande.userName1"];
                creationTravailDemande.userId1 = creationtravailVar["creationTravailDemande.userId1"];
                creationTravailDemande.userEtat1 = "في الإنتظار";
                creationTravailDemande.userName2 = creationtravailVar["creationTravailDemande.userName2"];
                creationTravailDemande.userId2 = creationtravailVar["creationTravailDemande.userId2"];
                creationTravailDemande.userEtat2 = "في الإنتظار";
                creationTravailDemande.userName3 = creationtravailVar["creationTravailDemande.userName3"];
                creationTravailDemande.userId3 = creationtravailVar["creationTravailDemande.userId3"];
                creationTravailDemande.userEtat3 = "في الإنتظار";
                creationTravailDemande.userName4 = creationtravailVar["creationTravailDemande.userName4"];
                creationTravailDemande.userId4 = creationtravailVar["creationTravailDemande.userId4"];
                creationTravailDemande.userEtat4 = "في الإنتظار";
                creationTravailDemande.userName5 = creationtravailVar["creationTravailDemande.userName5"];
                creationTravailDemande.userId5 = creationtravailVar["creationTravailDemande.userId5"];
                creationTravailDemande.userEtat5 = "في الإنتظار";
            }
            else if (cs.rolesNb == 6)
            {
                creationTravailDemande.userName1 = creationtravailVar["creationTravailDemande.userName1"];
                creationTravailDemande.userId1 = creationtravailVar["creationTravailDemande.userId1"];
                creationTravailDemande.userEtat1 = "في الإنتظار";
                creationTravailDemande.userName2 = creationtravailVar["creationTravailDemande.userName2"];
                creationTravailDemande.userId2 = creationtravailVar["creationTravailDemande.userId2"];
                creationTravailDemande.userEtat2 = "في الإنتظار";
                creationTravailDemande.userName3 = creationtravailVar["creationTravailDemande.userName3"];
                creationTravailDemande.userId3 = creationtravailVar["creationTravailDemande.userId3"];
                creationTravailDemande.userEtat3 = "في الإنتظار";
                creationTravailDemande.userName4 = creationtravailVar["creationTravailDemande.userName4"];
                creationTravailDemande.userId4 = creationtravailVar["creationTravailDemande.userId4"];
                creationTravailDemande.userEtat4 = "في الإنتظار";
                creationTravailDemande.userName5 = creationtravailVar["creationTravailDemande.userName5"];
                creationTravailDemande.userId5 = creationtravailVar["creationTravailDemande.userId5"];
                creationTravailDemande.userEtat5 = "في الإنتظار";
                creationTravailDemande.userName6 = creationtravailVar["creationTravailDemande.userName6"];
                creationTravailDemande.userId6 = creationtravailVar["creationTravailDemande.userId6"];
                creationTravailDemande.userEtat6 = "في الإنتظار";
            }
            else if (cs.rolesNb == 7)
            {
                creationTravailDemande.userName1 = creationtravailVar["creationTravailDemande.userName1"];
                creationTravailDemande.userId1 = creationtravailVar["creationTravailDemande.userId1"];
                creationTravailDemande.userEtat1 = "في الإنتظار";
                creationTravailDemande.userName2 = creationtravailVar["creationTravailDemande.userName2"];
                creationTravailDemande.userId2 = creationtravailVar["creationTravailDemande.userId2"];
                creationTravailDemande.userEtat2 = "في الإنتظار";
                creationTravailDemande.userName3 = creationtravailVar["creationTravailDemande.userName3"];
                creationTravailDemande.userId3 = creationtravailVar["creationTravailDemande.userId3"];
                creationTravailDemande.userEtat3 = "في الإنتظار";
                creationTravailDemande.userName4 = creationtravailVar["creationTravailDemande.userName4"];
                creationTravailDemande.userId4 = creationtravailVar["creationTravailDemande.userId4"];
                creationTravailDemande.userEtat4 = "في الإنتظار";
                creationTravailDemande.userName5 = creationtravailVar["creationTravailDemande.userName5"];
                creationTravailDemande.userId5 = creationtravailVar["creationTravailDemande.userId5"];
                creationTravailDemande.userEtat5 = "في الإنتظار";
                creationTravailDemande.userName6 = creationtravailVar["creationTravailDemande.userName6"];
                creationTravailDemande.userId6 = creationtravailVar["creationTravailDemande.userId6"];
                creationTravailDemande.userEtat6 = "في الإنتظار";
                creationTravailDemande.userName7 = creationtravailVar["creationTravailDemande.userName7"];
                creationTravailDemande.userId7 = creationtravailVar["creationTravailDemande.userId7"];
                creationTravailDemande.userEtat7 = "في الإنتظار";
            }
            else if (cs.rolesNb == 8)
            {
                creationTravailDemande.userName1 = creationtravailVar["creationTravailDemande.userName1"];
                creationTravailDemande.userId1 = creationtravailVar["creationTravailDemande.userId1"];
                creationTravailDemande.userEtat1 = "في الإنتظار";
                creationTravailDemande.userName2 = creationtravailVar["creationTravailDemande.userName2"];
                creationTravailDemande.userId2 = creationtravailVar["creationTravailDemande.userId2"];
                creationTravailDemande.userEtat2 = "في الإنتظار";
                creationTravailDemande.userName3 = creationtravailVar["creationTravailDemande.userName3"];
                creationTravailDemande.userId3 = creationtravailVar["creationTravailDemande.userId3"];
                creationTravailDemande.userEtat3 = "في الإنتظار";
                creationTravailDemande.userName4 = creationtravailVar["creationTravailDemande.userName4"];
                creationTravailDemande.userId4 = creationtravailVar["creationTravailDemande.userId4"];
                creationTravailDemande.userEtat4 = "في الإنتظار";
                creationTravailDemande.userName5 = creationtravailVar["creationTravailDemande.userName5"];
                creationTravailDemande.userId5 = creationtravailVar["creationTravailDemande.userId5"];
                creationTravailDemande.userEtat5 = "في الإنتظار";
                creationTravailDemande.userName6 = creationtravailVar["creationTravailDemande.userName6"];
                creationTravailDemande.userId6 = creationtravailVar["creationTravailDemande.userId6"];
                creationTravailDemande.userEtat6 = "في الإنتظار";
                creationTravailDemande.userName7 = creationtravailVar["creationTravailDemande.userName7"];
                creationTravailDemande.userId7 = creationtravailVar["creationTravailDemande.userId7"];
                creationTravailDemande.userEtat7 = "في الإنتظار";
                creationTravailDemande.userName8 = creationtravailVar["creationTravailDemande.userName8"];
                creationTravailDemande.userId8 = creationtravailVar["creationTravailDemande.userId8"];
                creationTravailDemande.userEtat8 = "في الإنتظار";
            }

            creationTravailDemande.etat = "في الإنتظار";
            DateTime dateTimeNow = DateTime.Now; // Return 00/00/0000 00:00:00
            string dateOnly = dateTimeNow.ToShortDateString(); //Return 00/00/0000
            creationTravailDemande.dateenreg = dateOnly;
            _context.creationTravailDemandes.Add(creationTravailDemande);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCreationTravailDemande", new { id = creationTravailDemande.Id }, creationTravailDemande);
        }



        [HttpGet]
        [Route("GetByUserCreator/{userId}")]

        public List<CreationTravailDemande> GetByUserCreator(string userId)
        {
            List<CreationTravailDemande> UserCreationTravail = new List<CreationTravailDemande>();
            UserCreationTravail = _context.creationTravailDemandes.Where(item => item.idUserCreator == userId).ToList();
            return UserCreationTravail;
        }


        [HttpGet]
        [Route("GetDemand/{userId}")]

        public List<CreationTravailDemande> GetDemand(string userId)
        {


            List<CreationTravailDemande> UserCreationTravail = new List<CreationTravailDemande>();
            List<CreationTravailDemande> AllCreationTravail = new List<CreationTravailDemande>();
            ConfigService cs = new ConfigService();
            cs = _contextD.ConfigServices.Where(item => item.serviceId == 8).FirstOrDefault();
            AllCreationTravail = _context.creationTravailDemandes.ToList();
            for (int i = 0; i < AllCreationTravail.Count; i++)
            {
                if (AllCreationTravail[i].userId1 == userId && AllCreationTravail[i].userEtat1 == "في الإنتظار")
                {
                    UserCreationTravail.Add(AllCreationTravail[i]);
                }

                else if (AllCreationTravail[i].userId2 == userId && AllCreationTravail[i].userEtat2 == "في الإنتظار" && AllCreationTravail[i].userEtat1 == "موافق")
                {
                    UserCreationTravail.Add(AllCreationTravail[i]);
                }

                else if (AllCreationTravail[i].userId3 == userId && AllCreationTravail[i].userEtat3 == "في الإنتظار" && AllCreationTravail[i].userEtat2 == "موافق")
                {
                    UserCreationTravail.Add(AllCreationTravail[i]);
                }

                else if (AllCreationTravail[i].userId4 == userId && AllCreationTravail[i].userEtat4 == "في الإنتظار" && AllCreationTravail[i].userEtat3 == "موافق")
                {
                    UserCreationTravail.Add(AllCreationTravail[i]);
                }

                else if (AllCreationTravail[i].userId5 == userId && AllCreationTravail[i].userEtat5 == "في الإنتظار" && AllCreationTravail[i].userEtat4 == "موافق")
                {
                    UserCreationTravail.Add(AllCreationTravail[i]);
                }

                else if (AllCreationTravail[i].userId6 == userId && AllCreationTravail[i].userEtat6 == "في الإنتظار" && AllCreationTravail[i].userEtat5 == "موافق")
                {
                    UserCreationTravail.Add(AllCreationTravail[i]);
                }

                else if (AllCreationTravail[i].userId7 == userId && AllCreationTravail[i].userEtat7 == "في الإنتظار" && AllCreationTravail[i].userEtat6 == "موافق")
                {
                    UserCreationTravail.Add(AllCreationTravail[i]);
                }

                else if (AllCreationTravail[i].userId8 == userId && AllCreationTravail[i].userEtat8 == "في الإنتظار" && AllCreationTravail[i].userEtat7 == "موافق")
                {
                    UserCreationTravail.Add(AllCreationTravail[i]);
                }


            }


            return UserCreationTravail;
        }


        [HttpGet]
        [Route("GetHistorique/{id}")]

        public CreationTravailDemande GetHistorique(int id)
        {
            CreationTravailDemande dem = new CreationTravailDemande();
            ConfigService cs = new ConfigService();
            dem = _context.creationTravailDemandes.Where(item => item.Id == id).FirstOrDefault();
            cs = _contextD.ConfigServices.Where(item => item.serviceId == 8).FirstOrDefault();
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

        public CreationTravailDemande EditDemandByRole(int Id, string userEtat)
        {

            CreationTravailDemande dem = new CreationTravailDemande();
            ConfigService cs = new ConfigService();
            DateTime dateTimeNow = DateTime.Now; // Return 00/00/0000 00:00:00
            string dateOnly = dateTimeNow.ToShortDateString(); //Return 00/00/0000
            cs = _contextD.ConfigServices.Where(item => item.serviceId == 8).FirstOrDefault();
            dem = _context.creationTravailDemandes.Where(item => item.Id == Id).FirstOrDefault();

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
        // DELETE: api/CreationTravailDemandes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<CreationTravailDemande>> DeleteCreationTravailDemande(int id)
        {
            var creationTravailDemande = await _context.creationTravailDemandes.FindAsync(id);
            if (creationTravailDemande == null)
            {
                return NotFound();
            }

            _context.creationTravailDemandes.Remove(creationTravailDemande);
            await _context.SaveChangesAsync();

            return creationTravailDemande;
        }

        private bool CreationTravailDemandeExists(int id)
        {
            return _context.creationTravailDemandes.Any(e => e.Id == id);
        }
    }
}
