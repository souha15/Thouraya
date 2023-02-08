using System;
using System.Collections.Generic;
using System.Globalization;
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
    public class CongesController : ControllerBase
    {
        private readonly FinanceContext _context;
        private readonly DawaaContext _contextD;
        private UserManager<ApplicationUser> UserManager;
        private readonly ApplicationDbContext ApplicationDbContext;

        public CongesController(FinanceContext context, DawaaContext contextD,
           UserManager<ApplicationUser> _UserManager, ApplicationDbContext _ApplicationDbContext)
        {
            _context = context;
            _contextD = contextD;
            UserManager = _UserManager;
            ApplicationDbContext = _ApplicationDbContext;

        }

        // GET: api/Conges
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Conge>>> Getconges()
        {
            return await _context.conges.OrderBy(item=> item.Id).ToListAsync();
        }

        // GET: api/Conges/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Conge>> GetConge(int id)
        {
            var conge = await _context.conges.FindAsync(id);

            if (conge == null)
            {
                return NotFound();
            }

            return conge;
        }

        // PUT: api/Conges/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutConge(int id, Conge conge)
        {
            if (id != conge.Id)
            {
                return BadRequest();
            }

            _context.Entry(conge).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CongeExists(id))
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

        // POST: api/Conges
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.

        Dictionary<String, String> congeVar = new Dictionary<String, String>();

        Dictionary<String, String> csVar = new Dictionary<String, String>();

        [HttpPost]
        public async Task<ActionResult<Conge>> PostConge(Conge conge)
        {
            // Get Configuration Of the service 

            ConfigService cs = new ConfigService();
            QuerysTable cq = new QuerysTable();
            List<QuerysTable> cqList = new List<QuerysTable>();
            //ApplicationUser user = new ApplicationUser();
            cs = _contextD.ConfigServices.Where(item => item.serviceId == 1).FirstOrDefault();
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
                    object parameterObject = conge.idUserCreator;
                    dir = (ApplicationUser)methodInfo.Invoke(instance, new object[] { conge.idUserCreator });


                }

                congeVar.Add("conge.userName" + i.ToString(), dir.FullName);
                congeVar.Add("conge.userId" + i.ToString(), dir.Id);
                congeVar.Add("conge.userEtat" + i.ToString(), "في الإنتظار");

            }

            // Get Permission Var Values

            List<string> congeVarValues = congeVar.Values.ToList();



            ///// Fill Permission Model 

            if (cs.rolesNb == 1)
            {
                conge.userName1 = congeVar["conge.userName1"];
                conge.userId1 = congeVar["conge.userId1"];
                conge.userEtat1 = "في الإنتظار";
            }
            else if (cs.rolesNb == 2)
            {
                conge.userName1 = congeVar["conge.userName1"];
                conge.userId1 = congeVar["conge.userId1"];
                conge.userEtat1 = "في الإنتظار";
                conge.userName2 = congeVar["conge.userName2"];
                conge.userId2 = congeVar["conge.userId2"];
                conge.userEtat2 = "في الإنتظار";
            }
            else if (cs.rolesNb == 3)
            {
                conge.userName1 = congeVar["conge.userName1"];
                conge.userId1 = congeVar["conge.userId1"];
                conge.userEtat1 = "في الإنتظار";
                conge.userName2 = congeVar["conge.userName2"];
                conge.userId2 = congeVar["conge.userId2"];
                conge.userEtat2 = "في الإنتظار";
                conge.userName3 = congeVar["conge.userName3"];
                conge.userId3 = congeVar["conge.userId3"];
                conge.userEtat3 = "في الإنتظار";
            }
            else if (cs.rolesNb == 4)
            {
                conge.userName1 = congeVar["conge.userName1"];
                conge.userId1 = congeVar["conge.userId1"];
                conge.userEtat1 = "في الإنتظار";
                conge.userName2 = congeVar["conge.userName2"];
                conge.userId2 = congeVar["conge.userId2"];
                conge.userEtat2 = "في الإنتظار";
                conge.userName3 = congeVar["conge.userName3"];
                conge.userId3 = congeVar["conge.userId3"];
                conge.userEtat3 = "في الإنتظار";
                conge.userName4 = congeVar["conge.userName4"];
                conge.userId4 = congeVar["conge.userId4"];
                conge.userEtat4 = "في الإنتظار";
            }
            else if (cs.rolesNb == 5)
            {
                conge.userName1 = congeVar["conge.userName1"];
                conge.userId1 = congeVar["conge.userId1"];
                conge.userEtat1 = "في الإنتظار";
                conge.userName2 = congeVar["conge.userName2"];
                conge.userId2 = congeVar["conge.userId2"];
                conge.userEtat2 = "في الإنتظار";
                conge.userName3 = congeVar["conge.userName3"];
                conge.userId3 = congeVar["conge.userId3"];
                conge.userEtat3 = "في الإنتظار";
                conge.userName4 = congeVar["conge.userName4"];
                conge.userId4 = congeVar["conge.userId4"];
                conge.userEtat4 = "في الإنتظار";
                conge.userName5 = congeVar["conge.userName5"];
                conge.userId5 = congeVar["conge.userId5"];
                conge.userEtat5 = "في الإنتظار";
            }
            else if (cs.rolesNb == 6)
            {
                conge.userName1 = congeVar["conge.userName1"];
                conge.userId1 = congeVar["conge.userId1"];
                conge.userEtat1 = "في الإنتظار";
                conge.userName2 = congeVar["conge.userName2"];
                conge.userId2 = congeVar["conge.userId2"];
                conge.userEtat2 = "في الإنتظار";
                conge.userName3 = congeVar["conge.userName3"];
                conge.userId3 = congeVar["conge.userId3"];
                conge.userEtat3 = "في الإنتظار";
                conge.userName4 = congeVar["conge.userName4"];
                conge.userId4 = congeVar["conge.userId4"];
                conge.userEtat4 = "في الإنتظار";
                conge.userName5 = congeVar["conge.userName5"];
                conge.userId5 = congeVar["conge.userId5"];
                conge.userEtat5 = "في الإنتظار";
                conge.userName6 = congeVar["conge.userName6"];
                conge.userId6 = congeVar["conge.userId6"];
                conge.userEtat6 = "في الإنتظار";
            }
            else if (cs.rolesNb == 7)
            {
                conge.userName1 = congeVar["conge.userName1"];
                conge.userId1 = congeVar["conge.userId1"];
                conge.userEtat1 = "في الإنتظار";
                conge.userName2 = congeVar["conge.userName2"];
                conge.userId2 = congeVar["conge.userId2"];
                conge.userEtat2 = "في الإنتظار";
                conge.userName3 = congeVar["conge.userName3"];
                conge.userId3 = congeVar["conge.userId3"];
                conge.userEtat3 = "في الإنتظار";
                conge.userName4 = congeVar["conge.userName4"];
                conge.userId4 = congeVar["conge.userId4"];
                conge.userEtat4 = "في الإنتظار";
                conge.userName5 = congeVar["conge.userName5"];
                conge.userId5 = congeVar["conge.userId5"];
                conge.userEtat5 = "في الإنتظار";
                conge.userName6 = congeVar["conge.userName6"];
                conge.userId6 = congeVar["conge.userId6"];
                conge.userEtat6 = "في الإنتظار";
                conge.userName7 = congeVar["conge.userName7"];
                conge.userId7 = congeVar["conge.userId7"];
                conge.userEtat7 = "في الإنتظار";
            }
            else if (cs.rolesNb == 8)
            {
                conge.userName1 = congeVar["conge.userName1"];
                conge.userId1 = congeVar["conge.userId1"];
                conge.userEtat1 = "في الإنتظار";
                conge.userName2 = congeVar["conge.userName2"];
                conge.userId2 = congeVar["conge.userId2"];
                conge.userEtat2 = "في الإنتظار";
                conge.userName3 = congeVar["conge.userName3"];
                conge.userId3 = congeVar["conge.userId3"];
                conge.userEtat3 = "في الإنتظار";
                conge.userName4 = congeVar["conge.userName4"];
                conge.userId4 = congeVar["conge.userId4"];
                conge.userEtat4 = "في الإنتظار";
                conge.userName5 = congeVar["conge.userName5"];
                conge.userId5 = congeVar["conge.userId5"];
                conge.userEtat5 = "في الإنتظار";
                conge.userName6 = congeVar["conge.userName6"];
                conge.userId6 = congeVar["conge.userId6"];
                conge.userEtat6 = "في الإنتظار";
                conge.userName7 = congeVar["conge.userName7"];
                conge.userId7 = congeVar["conge.userId7"];
                conge.userEtat7 = "في الإنتظار";
                conge.userName8 = congeVar["conge.userName8"];
                conge.userId8 = congeVar["conge.userId8"];
                conge.userEtat8 = "في الإنتظار";
            }

            conge.etat = "في الإنتظار";
            DateTime dateTimeNow = DateTime.Now; // Return 00/00/0000 00:00:00
            string dateOnly = dateTimeNow.ToShortDateString(); //Return 00/00/0000
            conge.dateenreg = dateOnly;
            _context.conges.Add(conge);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetConge", new { id = conge.Id }, conge);


        }


        [HttpGet]
        [Route("GetCongeByUserCreator/{userId}")]

        public List<Conge> GetCongeByUserCreator(string userId)
        {
            List<Conge> UserConges = new List<Conge>();
            UserConges = _context.conges.Where(item => item.idUserCreator == userId).ToList();
            return UserConges;
        }


        [HttpGet]
        [Route("GetCongeDemand/{userId}")]

        public List<Conge> GetCongeDemand(string userId)
        {


            List<Conge> UserConges = new List<Conge>();
            List<Conge> AllConges = new List<Conge>();
            ConfigService cs = new ConfigService();
            cs = _contextD.ConfigServices.Where(item => item.serviceId == 1).FirstOrDefault();
            AllConges = _context.conges.ToList();
            for (int i = 0; i < AllConges.Count; i++)
            {
                if (AllConges[i].userId1 == userId && AllConges[i].userEtat1 == "في الإنتظار")
                {
                    UserConges.Add(AllConges[i]);
                }

                else if (AllConges[i].userId2 == userId && AllConges[i].userEtat2 == "في الإنتظار" && AllConges[i].userEtat1 == "موافق")
                {
                    UserConges.Add(AllConges[i]);
                }

                else if (AllConges[i].userId3 == userId && AllConges[i].userEtat3 == "في الإنتظار" && AllConges[i].userEtat2 == "موافق")
                {
                    UserConges.Add(AllConges[i]);
                }

                else if (AllConges[i].userId4 == userId && AllConges[i].userEtat4 == "في الإنتظار" && AllConges[i].userEtat3 == "موافق")
                {
                    UserConges.Add(AllConges[i]);
                }

                else if (AllConges[i].userId5 == userId && AllConges[i].userEtat5 == "في الإنتظار" && AllConges[i].userEtat4 == "موافق")
                {
                    UserConges.Add(AllConges[i]);
                }

                else if (AllConges[i].userId6 == userId && AllConges[i].userEtat6 == "في الإنتظار" && AllConges[i].userEtat5 == "موافق")
                {
                    UserConges.Add(AllConges[i]);
                }

                else if (AllConges[i].userId7 == userId && AllConges[i].userEtat7 == "في الإنتظار" && AllConges[i].userEtat6 == "موافق")
                {
                    UserConges.Add(AllConges[i]);
                }

                else if (AllConges[i].userId8 == userId && AllConges[i].userEtat8 == "في الإنتظار" && AllConges[i].userEtat7 == "موافق")
                {
                    UserConges.Add(AllConges[i]);
                }


            }


            return UserConges;
        }

        [HttpGet]
        [Route("GetCongeHistorique/{id}")]

        public Conge GetCongeHistorique(int id)
        {
            Conge conge = new Conge();
            ConfigService cs = new ConfigService();
            conge = _context.conges.Where(item => item.Id == id).FirstOrDefault();
            cs = _contextD.ConfigServices.Where(item => item.serviceId == 1).FirstOrDefault();
            string rslt = "";


            // Traiter le cas d'accepter la demande par tt le monde 

            if (conge.etat == "موافق")
            {
                rslt = "لقد تمت الموافقة على الطلب من قبل جميع الأطراف";
            }

            // Traiter le cas de refuser la demande par quelqu'un cas par cas  

            else if (conge.etat == "رفض")
            {
                if (conge.userEtat1 == "رفض")
                {
                    rslt = "لقد تم رفض الطلب من قبل " + cs.roleName1;
                }
                else if (conge.userEtat2 == "رفض")
                {
                    rslt = "لقد تم رفض الطلب من قبل " + cs.roleName2;
                }
                else if (conge.userEtat3 == "رفض")
                {
                    rslt = "لقد تم رفض الطلب من قبل " + cs.roleName3;
                }
                else if (conge.userEtat4 == "رفض")
                {
                    rslt = "لقد تم رفض الطلب من قبل " + cs.roleName4;

                }
                else if (conge.userEtat5 == "رفض")
                {
                    rslt = "لقد تم رفض الطلب من قبل " + cs.roleName5;
                }
                else if (conge.userEtat6 == "رفض")
                {
                    rslt = "لقد تم رفض الطلب من قبل " + cs.roleName6;
                }
                else if (conge.userEtat7 == "رفض")
                {
                    rslt = "لقد تم رفض الطلب من قبل " + cs.roleName7;
                }
                else if (conge.userEtat8 == "رفض")
                {
                    rslt = "لقد تم رفض الطلب من قبل " + cs.roleName8;
                }
            }

            // Traiter les cas d'attente et d'accept cas par cas 
            else
            {
                if (conge.userEtat1 == "في الإنتظار")
                {
                    rslt = " لم تتم معالجة الطلب من قبل " + cs.roleName1;
                }

                else if (conge.userEtat1 == "موافق" && conge.userEtat2 == "في الإنتظار")
                {
                    rslt = "وافق " + cs.roleName1 + " على الطلب ولكن الطلب معلق عند " + cs.roleName2;
                }
                else if (conge.userEtat2 == "موافق" && conge.userEtat3 == "في الإنتظار")
                {
                    rslt = "وافق " + cs.roleName2 + " على الطلب ولكن الطلب معلق عند  " + cs.roleName3;
                }
                else if (conge.userEtat3 == "موافق" && conge.userEtat4 == "في الإنتظار")
                {
                    rslt = "وافق " + cs.roleName3 + " على الطلب ولكن الطلب معلق عند " + cs.roleName4;
                }
                else if (conge.userEtat4 == "موافق" && conge.userEtat5 == "في الإنتظار")
                {
                    rslt = "وافق " + cs.roleName3 + " على الطلب ولكن الطلب معلق عند  " + cs.roleName5;
                }
                else if (conge.userEtat5 == "موافق" && conge.userEtat6 == "في الإنتظار")
                {
                    rslt = "وافق " + cs.roleName5 + " على الطلب ولكن الطلب معلق عند" + cs.roleName6;
                }
                else if (conge.userEtat6 == "موافق" && conge.userEtat7 == "في الإنتظار")
                {
                    rslt = "وافق " + cs.roleName6 + " على الطلب ولكن الطلب معلق عند" + cs.roleName7;
                }
                else if (conge.userEtat7 == "موافق" && conge.userEtat8 == "في الإنتظار")
                {
                    rslt = "وافق " + cs.roleName7 + " على الطلب ولكن الطلب معلق عند" + cs.roleName8;
                }
            }
            conge.attribut6 = rslt;

            return conge;
        }
        
        [HttpGet]
        [Route("EditDemandByRole/{Id}/{userEtat}")]

        public Conge EditDemandByRole(int Id, string userEtat)
        {
            
            Conge conge = new Conge();
            ConfigService cs = new ConfigService();
            DateTime dateTimeNow = DateTime.Now; // Return 00/00/0000 00:00:00
            string dateOnly = dateTimeNow.ToShortDateString(); //Return 00/00/0000
            cs = _contextD.ConfigServices.Where(item => item.serviceId == 1).FirstOrDefault();
            conge = _context.conges.Where(item => item.Id == Id).FirstOrDefault();
           
            if(conge.userEtat1 == "في الإنتظار")
            {
                if(userEtat != "رفض")
                {
                    conge.userEtat1 = userEtat;
                    conge.userDate1 = dateOnly;
                    if(cs.rolesNb>1)
                    {
                        conge.directeurid = conge.userId2;
                        conge.directeurnom = conge.userName2;

                    }
                }
                else
                {
                    conge.userEtat1 = userEtat;
                    conge.userDate1 = dateOnly;
                    conge.etat = "رفض";         
                }
            
            }else if(conge.userEtat1 == "موافق" && conge.userEtat2 == "في الإنتظار")
            {
                if (userEtat != "رفض")
                {
                    conge.userEtat2 = userEtat;
                    conge.userDate2 = dateOnly;
                    if (cs.rolesNb > 2)
                    {
                        conge.directeurid = conge.userId3;
                        conge.directeurnom = conge.userName3;
                    }
                }
                else
                {
                    conge.userEtat2 = userEtat;
                    conge.userDate2 = dateOnly;
                    conge.etat = "رفض";
                }
            }
            else if(conge.userEtat2 == "موافق" && conge.userEtat3 == "في الإنتظار")
            {
                if (userEtat != "رفض")
                {
                    conge.userEtat3 = userEtat;
                    conge.userDate3 = dateOnly;
                    if (cs.rolesNb > 3)
                    {
                        conge.directeurid = conge.userId4;
                        conge.directeurnom = conge.userName4;
                    }
                }
                else
                {
                    conge.userEtat3 = userEtat;
                    conge.userDate3 = dateOnly;
                    conge.etat = "رفض";
                }
            } else if(conge.userEtat3 == "موافق" && conge.userEtat4 == "في الإنتظار")
            {
                if (userEtat != "رفض")
                {
                    conge.userEtat4 = userEtat;
                    conge.userDate4 = dateOnly;
                    if (cs.rolesNb > 4)
                    {
                        conge.directeurid = conge.userId5;
                        conge.directeurnom = conge.userName5;
                    }
                }
                else
                {
                    conge.userEtat4 = userEtat;
                    conge.userDate4 = dateOnly;
                    conge.etat = "رفض";
                }
            } else if(conge.userEtat4 == "موافق" && conge.userEtat5 == "في الإنتظار")
            {
                if (userEtat != "رفض")
                {
                    conge.userEtat5 = userEtat;
                    conge.userDate5 = dateOnly;
                    if (cs.rolesNb > 5)
                    {
                        conge.directeurid = conge.userId6;
                        conge.directeurnom = conge.userName6;
                    }
                }
                else
                {
                    conge.userEtat5 = userEtat;
                    conge.userDate5 = dateOnly;
                    conge.etat = "رفض";
                }
            } else if(conge.userEtat5 == "موافق" && conge.userEtat6 == "في الإنتظار")
            {
                if (userEtat != "رفض")
                {
                    conge.userEtat6 = userEtat;
                    conge.userDate6 = dateOnly;
                    if (cs.rolesNb > 6)
                    {
                        conge.directeurid = conge.userId7;
                        conge.directeurnom = conge.userName7;
                    }
                }
                else
                {
                    conge.userEtat6 = userEtat;
                    conge.userDate6 = dateOnly;
                    conge.etat = "رفض";
                }
            }else if(conge.userEtat6 == "موافق" && conge.userEtat7 == "في الإنتظار")
            {
                if (userEtat != "رفض")
                {
                    conge.userEtat7 = userEtat;
                    conge.userDate7 = dateOnly;
                    if (cs.rolesNb > 7)
                    {
                        conge.directeurid = conge.userId8;
                        conge.directeurnom = conge.userName8;
                    }
                }
                else
                {
                    conge.userEtat7 = userEtat;
                    conge.userDate7 = dateOnly;
                    conge.etat = "رفض";
                }
            }else if(conge.userEtat7 == "موافق" && conge.userEtat8 == "في الإنتظار")
            {
                if (userEtat != "رفض")
                {
                    conge.userEtat8 = userEtat;
                    conge.userDate8 = dateOnly;
                }
                else
                {
                    conge.userEtat8 = userEtat;
                    conge.userDate8 = dateOnly;
                    conge.etat = "رفض";
                }
            }
          
            if (cs.rolesNb == 1 && conge.userEtat1 == "موافق")
            {
                conge.etat = "موافق";
            }
            else if (cs.rolesNb == 2 && conge.userEtat2 == "موافق")
            {
                conge.etat = "موافق";

            }
            else if (cs.rolesNb == 3 && conge.userEtat3 == "موافق")
            {
                conge.etat = "موافق";
            }
            else if (cs.rolesNb == 4 && conge.userEtat4 == "موافق")
            {
                conge.etat = "موافق";
            }
            else if (cs.rolesNb == 5 && conge.userEtat5 == "موافق")
            {
                conge.etat = "موافق";
            }
            else if (cs.rolesNb == 6 && conge.userEtat6 == "موافق")
            {
                conge.etat = "موافق";
            }
            else if (cs.rolesNb == 7 && conge.userEtat7 == "موافق")
            {
                conge.etat = "موافق";
            }
            else if (cs.rolesNb == 8 && conge.userEtat8 == "موافق")
            {
                conge.etat = "موافق";
            }
    

            return conge;

        }

        [HttpGet]
        [Route("TestTheLastUser/{Id}")]

        public Boolean TestTheLastUser(int Id)
        {
            Boolean test = false;
            Conge conge = new Conge();
            ConfigService cs = new ConfigService();
            cs = _contextD.ConfigServices.Where(item => item.serviceId == 1).FirstOrDefault();
            conge = _context.conges.Where(item => item.Id == Id).FirstOrDefault();
            if (cs.rolesNb == 1 && conge.userEtat1 == "موافق")
            {
                test = true;
            }
            else if (cs.rolesNb == 2 && conge.userEtat2 == "موافق")
            {
                test = true;

            }
            else if (cs.rolesNb == 3 && conge.userEtat3 == "موافق")
            {
                test = true;
            }
            else if (cs.rolesNb == 4 && conge.userEtat4 == "موافق")
            {
                test = true;
            }
            else if (cs.rolesNb == 5 && conge.userEtat5 == "موافق")
            {
                test = true;
            }
            else if (cs.rolesNb == 6 && conge.userEtat6 == "موافق")
            {
                test = true;
            }
            else if (cs.rolesNb == 7 && conge.userEtat7 == "موافق")
            {
                test = true;
            }
            else if (cs.rolesNb == 8 && conge.userEtat8 == "موافق")
            {
                test = true;
            }
            else
            {
                test = false; 
            }


            return test;

        }

        
        [HttpPut]
        [Route("CreditSoldeReduit/{idUser}/{id}")]
        public SoldeConge CreditSoldeReduit(string idUser, int id)
        {
            SoldeConge soldeConge = new SoldeConge();
            soldeConge = _context.soldeConges.Where(item => item.idUserCreator == idUser).FirstOrDefault();
            Conge conge = new Conge();
            conge = _context.conges.Where(item => item.Id == id).FirstOrDefault();
            string typeConge = conge.type;
            decimal dec;
            if(typeConge == "إجازة إضطرارية")
            {
                if(decimal.TryParse(soldeConge.soldeurgent, System.Globalization.NumberStyles.Any, CultureInfo.InvariantCulture, out dec))
                {
                    soldeConge.soldeurgent = (dec - Int32.Parse(conge.duree)).ToString().Replace(",", ".");
                }
                else
                {
                    soldeConge.soldeurgent = (Int32.Parse(soldeConge.soldeurgent) - Int32.Parse(conge.duree)).ToString();
                }
               
            }
            else if (typeConge == "إجازة إستثنائية")
            {
                if (decimal.TryParse(soldeConge.soldemaladie, System.Globalization.NumberStyles.Any, CultureInfo.InvariantCulture, out dec))
                {
                    soldeConge.soldemaladie = (dec - Int32.Parse(conge.duree)).ToString().Replace(",", ".");
                }
                else
                {
                    soldeConge.soldemaladie = (Int32.Parse(soldeConge.soldemaladie) - Int32.Parse(conge.duree)).ToString();
                }
               
            }else if (typeConge == "إجازة إعتيادية")
            {
                if (decimal.TryParse(soldeConge.soldenormal, System.Globalization.NumberStyles.Any, CultureInfo.InvariantCulture, out dec))
                {
                    soldeConge.soldenormal = (dec - Int32.Parse(conge.duree)).ToString().Replace(",", ".");
                }
                else
                {
                    soldeConge.soldenormal = (Int32.Parse(soldeConge.soldenormal) - Int32.Parse(conge.duree)).ToString();
                }
            
            }
         
            _context.Entry(soldeConge).State = EntityState.Modified;
            
            _context.SaveChangesAsync();
            
            
            return soldeConge;
        }


       


        // DELETE: api/Conges/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Conge>> DeleteConge(int id)
        {
            var conge = await _context.conges.FindAsync(id);
            if (conge == null)
            {
                return NotFound();
            }

            _context.conges.Remove(conge);
            await _context.SaveChangesAsync();

            return conge;
        }

        private bool CongeExists(int id)
        {
            return _context.conges.Any(e => e.Id == id);
        }
    }
}
