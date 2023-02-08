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
    public class ResidencesController : ControllerBase
    {
        private readonly FinanceContext _context;
        private readonly DawaaContext _contextD;
        private UserManager<ApplicationUser> UserManager;
        private readonly ApplicationDbContext ApplicationDbContext;
        public ResidencesController(FinanceContext context, DawaaContext contextD,
            UserManager<ApplicationUser> _UserManager, ApplicationDbContext _ApplicationDbContext)
        {
            _context = context;
            _contextD = contextD;
            UserManager = _UserManager;
            ApplicationDbContext = _ApplicationDbContext;
        }

        // GET: api/Residences
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Residence>>> Getresidences()
        {
            return await _context.residences.OrderBy(item => item.Id).ToListAsync();
        }

        // GET: api/Residences/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Residence>> GetResidence(int id)
        {
            var residence = await _context.residences.FindAsync(id);

            if (residence == null)
            {
                return NotFound();
            }

            return residence;
        }

        // PUT: api/Residences/5
        // To protect from overposting attacks, enable the specific proresities you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutResidence(int id, Residence residence)
        {
            if (id != residence.Id)
            {
                return BadRequest();
            }

            _context.Entry(residence).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ResidenceExists(id))
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

        // POST: api/Residences
        // To protect from overposting attacks, enable the specific proresities you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        Dictionary<String, String> residenceVar = new Dictionary<String, String>();

        Dictionary<String, String> csVar = new Dictionary<String, String>();


        [HttpPost]
        public async Task<ActionResult<Residence>> PostResidence(Residence residence)
        {
            // Get Configuration Of the service 

            ConfigService cs = new ConfigService();
            QuerysTable cq = new QuerysTable();
            List<QuerysTable> cqList = new List<QuerysTable>();
            //ApplicationUser user = new ApplicationUser();
            cs = _contextD.ConfigServices.Where(item => item.serviceId == 6).FirstOrDefault();
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
                    object parameterObject = residence.idUserCreator;
                    dir = (ApplicationUser)methodInfo.Invoke(instance, new object[] { residence.idUserCreator });


                }

                residenceVar.Add("residence.userName" + i.ToString(), dir.FullName);
                residenceVar.Add("residence.userId" + i.ToString(), dir.Id);
                residenceVar.Add("residence.userEtat" + i.ToString(), "في الإنتظار");

            }

            // Get resimission Var Values

            List<string> residenceVarValues = residenceVar.Values.ToList();



            ///// Fill resimission Model 

            if (cs.rolesNb == 1)
            {
                residence.userName1 = residenceVar["residence.userName1"];
                residence.userId1 = residenceVar["residence.userId1"];
                residence.userEtat1 = "في الإنتظار";
            }
            else if (cs.rolesNb == 2)
            {
                residence.userName1 = residenceVar["residence.userName1"];
                residence.userId1 = residenceVar["residence.userId1"];
                residence.userEtat1 = "في الإنتظار";
                residence.userName2 = residenceVar["residence.userName2"];
                residence.userId2 = residenceVar["residence.userId2"];
                residence.userEtat2 = "في الإنتظار";
            }
            else if (cs.rolesNb == 3)
            {
                residence.userName1 = residenceVar["residence.userName1"];
                residence.userId1 = residenceVar["residence.userId1"];
                residence.userEtat1 = "في الإنتظار";
                residence.userName2 = residenceVar["residence.userName2"];
                residence.userId2 = residenceVar["residence.userId2"];
                residence.userEtat2 = "في الإنتظار";
                residence.userName3 = residenceVar["residence.userName3"];
                residence.userId3 = residenceVar["residence.userId3"];
                residence.userEtat3 = "في الإنتظار";
            }
            else if (cs.rolesNb == 4)
            {
                residence.userName1 = residenceVar["residence.userName1"];
                residence.userId1 = residenceVar["residence.userId1"];
                residence.userEtat1 = "في الإنتظار";
                residence.userName2 = residenceVar["residence.userName2"];
                residence.userId2 = residenceVar["residence.userId2"];
                residence.userEtat2 = "في الإنتظار";
                residence.userName3 = residenceVar["residence.userName3"];
                residence.userId3 = residenceVar["residence.userId3"];
                residence.userEtat3 = "في الإنتظار";
                residence.userName4 = residenceVar["residence.userName4"];
                residence.userId4 = residenceVar["residence.userId4"];
                residence.userEtat4 = "في الإنتظار";
            }
            else if (cs.rolesNb == 5)
            {
                residence.userName1 = residenceVar["residence.userName1"];
                residence.userId1 = residenceVar["residence.userId1"];
                residence.userEtat1 = "في الإنتظار";
                residence.userName2 = residenceVar["residence.userName2"];
                residence.userId2 = residenceVar["residence.userId2"];
                residence.userEtat2 = "في الإنتظار";
                residence.userName3 = residenceVar["residence.userName3"];
                residence.userId3 = residenceVar["residence.userId3"];
                residence.userEtat3 = "في الإنتظار";
                residence.userName4 = residenceVar["residence.userName4"];
                residence.userId4 = residenceVar["residence.userId4"];
                residence.userEtat4 = "في الإنتظار";
                residence.userName5 = residenceVar["residence.userName5"];
                residence.userId5 = residenceVar["residence.userId5"];
                residence.userEtat5 = "في الإنتظار";
            }
            else if (cs.rolesNb == 6)
            {
                residence.userName1 = residenceVar["residence.userName1"];
                residence.userId1 = residenceVar["residence.userId1"];
                residence.userEtat1 = "في الإنتظار";
                residence.userName2 = residenceVar["residence.userName2"];
                residence.userId2 = residenceVar["residence.userId2"];
                residence.userEtat2 = "في الإنتظار";
                residence.userName3 = residenceVar["residence.userName3"];
                residence.userId3 = residenceVar["residence.userId3"];
                residence.userEtat3 = "في الإنتظار";
                residence.userName4 = residenceVar["residence.userName4"];
                residence.userId4 = residenceVar["residence.userId4"];
                residence.userEtat4 = "في الإنتظار";
                residence.userName5 = residenceVar["residence.userName5"];
                residence.userId5 = residenceVar["residence.userId5"];
                residence.userEtat5 = "في الإنتظار";
                residence.userName6 = residenceVar["residence.userName6"];
                residence.userId6 = residenceVar["residence.userId6"];
                residence.userEtat6 = "في الإنتظار";
            }
            else if (cs.rolesNb == 7)
            {
                residence.userName1 = residenceVar["residence.userName1"];
                residence.userId1 = residenceVar["residence.userId1"];
                residence.userEtat1 = "في الإنتظار";
                residence.userName2 = residenceVar["residence.userName2"];
                residence.userId2 = residenceVar["residence.userId2"];
                residence.userEtat2 = "في الإنتظار";
                residence.userName3 = residenceVar["residence.userName3"];
                residence.userId3 = residenceVar["residence.userId3"];
                residence.userEtat3 = "في الإنتظار";
                residence.userName4 = residenceVar["residence.userName4"];
                residence.userId4 = residenceVar["residence.userId4"];
                residence.userEtat4 = "في الإنتظار";
                residence.userName5 = residenceVar["residence.userName5"];
                residence.userId5 = residenceVar["residence.userId5"];
                residence.userEtat5 = "في الإنتظار";
                residence.userName6 = residenceVar["residence.userName6"];
                residence.userId6 = residenceVar["residence.userId6"];
                residence.userEtat6 = "في الإنتظار";
                residence.userName7 = residenceVar["residence.userName7"];
                residence.userId7 = residenceVar["residence.userId7"];
                residence.userEtat7 = "في الإنتظار";
            }
            else if (cs.rolesNb == 8)
            {
                residence.userName1 = residenceVar["residence.userName1"];
                residence.userId1 = residenceVar["residence.userId1"];
                residence.userEtat1 = "في الإنتظار";
                residence.userName2 = residenceVar["residence.userName2"];
                residence.userId2 = residenceVar["residence.userId2"];
                residence.userEtat2 = "في الإنتظار";
                residence.userName3 = residenceVar["residence.userName3"];
                residence.userId3 = residenceVar["residence.userId3"];
                residence.userEtat3 = "في الإنتظار";
                residence.userName4 = residenceVar["residence.userName4"];
                residence.userId4 = residenceVar["residence.userId4"];
                residence.userEtat4 = "في الإنتظار";
                residence.userName5 = residenceVar["residence.userName5"];
                residence.userId5 = residenceVar["residence.userId5"];
                residence.userEtat5 = "في الإنتظار";
                residence.userName6 = residenceVar["residence.userName6"];
                residence.userId6 = residenceVar["residence.userId6"];
                residence.userEtat6 = "في الإنتظار";
                residence.userName7 = residenceVar["residence.userName7"];
                residence.userId7 = residenceVar["residence.userId7"];
                residence.userEtat7 = "في الإنتظار";
                residence.userName8 = residenceVar["residence.userName8"];
                residence.userId8 = residenceVar["residence.userId8"];
                residence.userEtat8 = "في الإنتظار";
            }

            residence.etat = "في الإنتظار";
            DateTime dateTimeNow = DateTime.Now; // Return 00/00/0000 00:00:00
            string dateOnly = dateTimeNow.ToShortDateString(); //Return 00/00/0000
            residence.datenereg = dateOnly;
            _context.residences.Add(residence);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetResidence", new { id = residence.Id }, residence);
        }


        [HttpGet]
        [Route("GetByUserCreator/{userId}")]

        public List<Residence> GetByUserCreator(string userId)
        {
            List<Residence> UserResidence = new List<Residence>();
            UserResidence = _context.residences.Where(item => item.idUserCreator == userId).ToList();
            return UserResidence;
        }

        // DELETE: api/Residences/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Residence>> DeleteResidence(int id)
        {
            var residence = await _context.residences.FindAsync(id);
            if (residence == null)
            {
                return NotFound();
            }

            _context.residences.Remove(residence);
            await _context.SaveChangesAsync();

            return residence;
        }

        [HttpGet]
        [Route("GetDemand/{userId}")]

        public List<Residence> GetDemand(string userId)
        {


            List<Residence> UserResidences = new List<Residence>();
            List<Residence> AllResidences = new List<Residence>();
            ConfigService cs = new ConfigService();
            cs = _contextD.ConfigServices.Where(item => item.serviceId ==6).FirstOrDefault();
            AllResidences = _context.residences.ToList();
            for (int i = 0; i < AllResidences.Count; i++)
            {
                if (AllResidences[i].userId1 == userId && AllResidences[i].userEtat1 == "في الإنتظار")
                {
                    UserResidences.Add(AllResidences[i]);
                }

                else if (AllResidences[i].userId2 == userId && AllResidences[i].userEtat2 == "في الإنتظار" && AllResidences[i].userEtat1 == "موافق")
                {
                    UserResidences.Add(AllResidences[i]);
                }

                else if (AllResidences[i].userId3 == userId && AllResidences[i].userEtat3 == "في الإنتظار" && AllResidences[i].userEtat2 == "موافق")
                {
                    UserResidences.Add(AllResidences[i]);
                }

                else if (AllResidences[i].userId4 == userId && AllResidences[i].userEtat4 == "في الإنتظار" && AllResidences[i].userEtat3 == "موافق")
                {
                    UserResidences.Add(AllResidences[i]);
                }

                else if (AllResidences[i].userId5 == userId && AllResidences[i].userEtat5 == "في الإنتظار" && AllResidences[i].userEtat4 == "موافق")
                {
                    UserResidences.Add(AllResidences[i]);
                }

                else if (AllResidences[i].userId6 == userId && AllResidences[i].userEtat6 == "في الإنتظار" && AllResidences[i].userEtat5 == "موافق")
                {
                    UserResidences.Add(AllResidences[i]);
                }

                else if (AllResidences[i].userId7 == userId && AllResidences[i].userEtat7 == "في الإنتظار" && AllResidences[i].userEtat6 == "موافق")
                {
                    UserResidences.Add(AllResidences[i]);
                }

                else if (AllResidences[i].userId8 == userId && AllResidences[i].userEtat8 == "في الإنتظار" && AllResidences[i].userEtat7 == "موافق")
                {
                    UserResidences.Add(AllResidences[i]);
                }


            }


            return UserResidences;
        }


        [HttpGet]
        [Route("GetHistorique/{id}")]

        public Residence GetHistorique(int id)
        {
            Residence resi = new Residence();
            ConfigService cs = new ConfigService();
            resi = _context.residences.Where(item => item.Id == id).FirstOrDefault();
            cs = _contextD.ConfigServices.Where(item => item.serviceId == 6).FirstOrDefault();
            string rslt = "";


            // Traiter le cas d'accepter la demande par tt le monde 

            if (resi.etat == "موافق")
            {
                rslt = "لقد تمت الموافقة على الطلب من قبل جميع الأطراف";
            }

            // Traiter le cas de refuser la demande par quelqu'un cas par cas  

            else if (resi.etat == "رفض")
            {
                if (resi.userEtat1 == "رفض")
                {
                    rslt = "لقد تم رفض الطلب من قبل " + cs.roleName1;
                }
                else if (resi.userEtat2 == "رفض")
                {
                    rslt = "لقد تم رفض الطلب من قبل " + cs.roleName2;
                }
                else if (resi.userEtat3 == "رفض")
                {
                    rslt = "لقد تم رفض الطلب من قبل " + cs.roleName3;
                }
                else if (resi.userEtat4 == "رفض")
                {
                    rslt = "لقد تم رفض الطلب من قبل " + cs.roleName4;

                }
                else if (resi.userEtat5 == "رفض")
                {
                    rslt = "لقد تم رفض الطلب من قبل " + cs.roleName5;
                }
                else if (resi.userEtat6 == "رفض")
                {
                    rslt = "لقد تم رفض الطلب من قبل " + cs.roleName6;
                }
                else if (resi.userEtat7 == "رفض")
                {
                    rslt = "لقد تم رفض الطلب من قبل " + cs.roleName7;
                }
                else if (resi.userEtat8 == "رفض")
                {
                    rslt = "لقد تم رفض الطلب من قبل " + cs.roleName8;
                }
            }

            // Traiter les cas d'attente et d'accept cas par cas 
            else
            {
                if (resi.userEtat1 == "في الإنتظار")
                {
                    rslt = " لم تتم معالجة الطلب من قبل " + cs.roleName1;
                }

                else if (resi.userEtat1 == "موافق" && resi.userEtat2 == "في الإنتظار")
                {
                    rslt = "وافق " + cs.roleName1 + " على الطلب ولكن الطلب معلق عند " + cs.roleName2;
                }
                else if (resi.userEtat2 == "موافق" && resi.userEtat3 == "في الإنتظار")
                {
                    rslt = "وافق " + cs.roleName2 + " على الطلب ولكن الطلب معلق عند  " + cs.roleName3;
                }
                else if (resi.userEtat3 == "موافق" && resi.userEtat4 == "في الإنتظار")
                {
                    rslt = "وافق " + cs.roleName3 + " على الطلب ولكن الطلب معلق عند " + cs.roleName4;
                }
                else if (resi.userEtat4 == "موافق" && resi.userEtat5 == "في الإنتظار")
                {
                    rslt = "وافق " + cs.roleName3 + " على الطلب ولكن الطلب معلق عند  " + cs.roleName5;
                }
                else if (resi.userEtat5 == "موافق" && resi.userEtat6 == "في الإنتظار")
                {
                    rslt = "وافق " + cs.roleName5 + " على الطلب ولكن الطلب معلق عند" + cs.roleName6;
                }
                else if (resi.userEtat6 == "موافق" && resi.userEtat7 == "في الإنتظار")
                {
                    rslt = "وافق " + cs.roleName6 + " على الطلب ولكن الطلب معلق عند" + cs.roleName7;
                }
                else if (resi.userEtat7 == "موافق" && resi.userEtat8 == "في الإنتظار")
                {
                    rslt = "وافق " + cs.roleName7 + " على الطلب ولكن الطلب معلق عند" + cs.roleName8;
                }
            }
            resi.attribut6 = rslt;

            return resi;
        }




        [HttpGet]
        [Route("EditDemandByRole/{Id}/{userEtat}")]

        public Residence EditDemandByRole(int Id, string userEtat)
        {

            Residence resi = new Residence();
            ConfigService cs = new ConfigService();
            DateTime dateTimeNow = DateTime.Now; // Return 00/00/0000 00:00:00
            string dateOnly = dateTimeNow.ToShortDateString(); //Return 00/00/0000
            cs = _contextD.ConfigServices.Where(item => item.serviceId == 6).FirstOrDefault();
            resi = _context.residences.Where(item => item.Id == Id).FirstOrDefault();

            if (resi.userEtat1 == "في الإنتظار")
            {
                if (userEtat != "رفض")
                {
                    resi.userEtat1 = userEtat;
                    resi.userDate1 = dateOnly;
                    if (cs.rolesNb > 1)
                    {
                        resi.iddir = resi.userId2;
                        resi.nomdir = resi.userName2;

                    }
                }
                else
                {
                    resi.userEtat1 = userEtat;
                    resi.userDate1 = dateOnly;
                    resi.etat = "رفض";
                }

            }
            else if (resi.userEtat1 == "موافق" && resi.userEtat2 == "في الإنتظار")
            {
                if (userEtat != "رفض")
                {
                    resi.userEtat2 = userEtat;
                    resi.userDate2 = dateOnly;
                    if (cs.rolesNb > 2)
                    {
                        resi.iddir = resi.userId3;
                        resi.nomdir = resi.userName3;
                    }
                }
                else
                {
                    resi.userEtat2 = userEtat;
                    resi.userDate2 = dateOnly;
                    resi.etat = "رفض";
                }
            }
            else if (resi.userEtat2 == "موافق" && resi.userEtat3 == "في الإنتظار")
            {
                if (userEtat != "رفض")
                {
                    resi.userEtat3 = userEtat;
                    resi.userDate3 = dateOnly;
                    if (cs.rolesNb > 3)
                    {
                        resi.iddir = resi.userId4;
                        resi.nomdir = resi.userName4;
                    }
                }
                else
                {
                    resi.userEtat3 = userEtat;
                    resi.userDate3 = dateOnly;
                    resi.etat = "رفض";
                }
            }
            else if (resi.userEtat3 == "موافق" && resi.userEtat4 == "في الإنتظار")
            {
                if (userEtat != "رفض")
                {
                    resi.userEtat4 = userEtat;
                    resi.userDate4 = dateOnly;
                    if (cs.rolesNb > 4)
                    {
                        resi.iddir = resi.userId5;
                        resi.nomdir = resi.userName5;
                    }
                }
                else
                {
                    resi.userEtat4 = userEtat;
                    resi.userDate4 = dateOnly;
                    resi.etat = "رفض";
                }
            }
            else if (resi.userEtat4 == "موافق" && resi.userEtat5 == "في الإنتظار")
            {
                if (userEtat != "رفض")
                {
                    resi.userEtat5 = userEtat;
                    resi.userDate5 = dateOnly;
                    if (cs.rolesNb > 5)
                    {
                        resi.iddir = resi.userId6;
                        resi.nomdir = resi.userName6;
                    }
                }
                else
                {
                    resi.userEtat5 = userEtat;
                    resi.userDate5 = dateOnly;
                    resi.etat = "رفض";
                }
            }
            else if (resi.userEtat5 == "موافق" && resi.userEtat6 == "في الإنتظار")
            {
                if (userEtat != "رفض")
                {
                    resi.userEtat6 = userEtat;
                    resi.userDate6 = dateOnly;
                    if (cs.rolesNb > 6)
                    {
                        resi.iddir = resi.userId7;
                        resi.nomdir = resi.userName7;
                    }
                }
                else
                {
                    resi.userEtat6 = userEtat;
                    resi.userDate6 = dateOnly;
                    resi.etat = "رفض";
                }
            }
            else if (resi.userEtat6 == "موافق" && resi.userEtat7 == "في الإنتظار")
            {
                if (userEtat != "رفض")
                {
                    resi.userEtat7 = userEtat;
                    resi.userDate7 = dateOnly;
                    if (cs.rolesNb > 7)
                    {
                        resi.iddir = resi.userId8;
                        resi.nomdir = resi.userName8;
                    }
                }
                else
                {
                    resi.userEtat7 = userEtat;
                    resi.userDate7 = dateOnly;
                    resi.etat = "رفض";
                }
            }
            else if (resi.userEtat7 == "موافق" && resi.userEtat8 == "في الإنتظار")
            {
                if (userEtat != "رفض")
                {
                    resi.userEtat8 = userEtat;
                    resi.userDate8 = dateOnly;
                }
                else
                {
                    resi.userEtat8 = userEtat;
                    resi.userDate8 = dateOnly;
                    resi.etat = "رفض";
                }
            }

            if (cs.rolesNb == 1 && resi.userEtat1 == "موافق")
            {
                resi.etat = "موافق";
            }
            else if (cs.rolesNb == 2 && resi.userEtat2 == "موافق")
            {
                resi.etat = "موافق";

            }
            else if (cs.rolesNb == 3 && resi.userEtat3 == "موافق")
            {
                resi.etat = "موافق";
            }
            else if (cs.rolesNb == 4 && resi.userEtat4 == "موافق")
            {
                resi.etat = "موافق";
            }
            else if (cs.rolesNb == 5 && resi.userEtat5 == "موافق")
            {
                resi.etat = "موافق";
            }
            else if (cs.rolesNb == 6 && resi.userEtat6 == "موافق")
            {
                resi.etat = "موافق";
            }
            else if (cs.rolesNb == 7 && resi.userEtat7 == "موافق")
            {
                resi.etat = "موافق";
            }
            else if (cs.rolesNb == 8 && resi.userEtat8 == "موافق")
            {
                resi.etat = "موافق";
            }


            return resi;

        }

        private bool ResidenceExists(int id)
        {
            return _context.residences.Any(e => e.Id == id);
        }
    }
}
