using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Controllers.ServicesConfiguration;
using WebApplicationPlateforme.Controllers.UserControllers;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.ServicesConfiguration;
using WebApplicationPlateforme.Model.User;
using WebApplicationPlateforme.Model.User_Services;
using WebApplicationPlateforme.Services;

namespace WebApplicationPlateforme.Controllers.UserService
{
    [Route("api/[controller]")]
    [ApiController]
    public class PermissionUsController : ControllerBase
    {
        private readonly FinanceContext _context;
        private readonly DawaaContext _contextD;
        private UserManager<ApplicationUser> UserManager;
        private readonly ApplicationDbContext ApplicationDbContext;
        public PermissionUsController(FinanceContext context , DawaaContext contextD,
            UserManager<ApplicationUser> _UserManager, ApplicationDbContext _ApplicationDbContext)
        {
            _context = context;
            _contextD = contextD;
            UserManager = _UserManager;
            ApplicationDbContext = _ApplicationDbContext;

        }

        // GET: api/PermissionUs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PermissionU>>> GetpermissionUs()
        {
            return await _context.permissionUs.OrderBy(item => item.Id).ToListAsync();
        }

        // GET: api/PermissionUs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PermissionU>> GetPermissionU(int id)
        {
            var permissionU = await _context.permissionUs.FindAsync(id);

            if (permissionU == null)
            {
                return NotFound();
            }

            return permissionU;
        }

        // Get Automatic

        // PUT: api/PermissionUs/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPermissionU(int id, PermissionU permissionU)
        {
            if (id != permissionU.Id)
            {
                return BadRequest();
            }

            _context.Entry(permissionU).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PermissionUExists(id))
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

        // POST: api/PermissionUs

        Dictionary<String, String> permissionVar = new Dictionary<String, String>();

        Dictionary<String, String> csVar = new Dictionary<String, String>();

        [HttpPost]

        public async Task<ActionResult<PermissionU>> PostPermissionU(PermissionU permissionU)
        {

            // Get Configuration Of the service 

            ConfigService cs = new ConfigService();
            QuerysTable cq = new QuerysTable();
            List<QuerysTable> cqList = new List<QuerysTable>();
            //ApplicationUser user = new ApplicationUser();
            cs = _contextD.ConfigServices.Where(item => item.serviceId == 2).FirstOrDefault();
            cqList = _contextD.QuerysTables.ToList();

            Type type = typeof(UsersManip);
             //user =  GetUserProfile();
            object[] constructorParameters = new object[]
 {
    UserManager,
    ApplicationDbContext
 };

   

            // Fill RolesId and Permission Var Dic 

            if(cs.rolesNb == 1)
            {
                csVar.Add("cs.roleId1", cs.roleId1);

            }
            else if( cs.rolesNb == 2)
            {
                csVar.Add("cs.roleId1", cs.roleId1);
                csVar.Add("cs.roleId2", cs.roleId2);
    
            }
            else if(cs.rolesNb == 3)
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

            // Get Permission Var Values


            ApplicationUser dir = new ApplicationUser();

            for (int i = 1; i <= cs.rolesNb; i++)
            {
                string roleName = csVarValues[i-1];
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
                    object parameterObject = permissionU.idUserCreator;
                    dir = (ApplicationUser)methodInfo.Invoke(instance, new object[] { permissionU.idUserCreator });
                 

                }
                
                permissionVar.Add("permissionU.userName" + i.ToString(), dir.FullName);
                permissionVar.Add("permissionU.userId" + i.ToString(), dir.Id);
                permissionVar.Add("permissionU.userEtat" + i.ToString(), "في الإنتظار");

            }

            // Get Permission Var Values

            List<string> permissionVarValues = permissionVar.Values.ToList();



            ///// Fill Permission Model 
           
            if(cs.rolesNb == 1)
                {
                permissionU.userName1 = permissionVar["permissionU.userName1"];
                permissionU.userId1 = permissionVar["permissionU.userId1"];
                permissionU.userEtat1 = "في الإنتظار";
            }
            else if (cs.rolesNb == 2)
                {
                    permissionU.userName1 = permissionVar["permissionU.userName1"];
                    permissionU.userId1 = permissionVar["permissionU.userId1"];
                    permissionU.userEtat1 = "في الإنتظار";
                    permissionU.userName2 = permissionVar["permissionU.userName2"];
                    permissionU.userId2 = permissionVar["permissionU.userId2"];
                    permissionU.userEtat2 = "في الإنتظار";
                }
            else if (cs.rolesNb == 3)
            {
                permissionU.userName1 = permissionVar["permissionU.userName1"];
                permissionU.userId1 = permissionVar["permissionU.userId1"];
                permissionU.userEtat1 = "في الإنتظار";
                permissionU.userName2 = permissionVar["permissionU.userName2"];
                permissionU.userId2 = permissionVar["permissionU.userId2"];
                permissionU.userEtat2 = "في الإنتظار";
                permissionU.userName3 = permissionVar["permissionU.userName3"];
                permissionU.userId3 = permissionVar["permissionU.userId3"];
                permissionU.userEtat3 = "في الإنتظار";
            }
            else if (cs.rolesNb == 4)
            {
                permissionU.userName1 = permissionVar["permissionU.userName1"];
                permissionU.userId1 = permissionVar["permissionU.userId1"];
                permissionU.userEtat1 = "في الإنتظار";
                permissionU.userName2 = permissionVar["permissionU.userName2"];
                permissionU.userId2 = permissionVar["permissionU.userId2"];
                permissionU.userEtat2 = "في الإنتظار";
                permissionU.userName3 = permissionVar["permissionU.userName3"];
                permissionU.userId3 = permissionVar["permissionU.userId3"];
                permissionU.userEtat3 = "في الإنتظار";
                permissionU.userName4 = permissionVar["permissionU.userName4"];
                permissionU.userId4 = permissionVar["permissionU.userId4"];
                permissionU.userEtat4 = "في الإنتظار";
            }
            else if (cs.rolesNb == 5)
            {
                permissionU.userName1 = permissionVar["permissionU.userName1"];
                permissionU.userId1 = permissionVar["permissionU.userId1"];
                permissionU.userEtat1 = "في الإنتظار";
                permissionU.userName2 = permissionVar["permissionU.userName2"];
                permissionU.userId2 = permissionVar["permissionU.userId2"];
                permissionU.userEtat2 = "في الإنتظار";
                permissionU.userName3 = permissionVar["permissionU.userName3"];
                permissionU.userId3 = permissionVar["permissionU.userId3"];
                permissionU.userEtat3 = "في الإنتظار";
                permissionU.userName4 = permissionVar["permissionU.userName4"];
                permissionU.userId4 = permissionVar["permissionU.userId4"];
                permissionU.userEtat4 = "في الإنتظار";
                permissionU.userName5 = permissionVar["permissionU.userName5"];
                permissionU.userId5 = permissionVar["permissionU.userId5"];
                permissionU.userEtat5 = "في الإنتظار";
            }
            else if (cs.rolesNb == 6)
            {
                permissionU.userName1 = permissionVar["permissionU.userName1"];
                permissionU.userId1 = permissionVar["permissionU.userId1"];
                permissionU.userEtat1 = "في الإنتظار";
                permissionU.userName2 = permissionVar["permissionU.userName2"];
                permissionU.userId2 = permissionVar["permissionU.userId2"];
                permissionU.userEtat2 = "في الإنتظار";
                permissionU.userName3 = permissionVar["permissionU.userName3"];
                permissionU.userId3 = permissionVar["permissionU.userId3"];
                permissionU.userEtat3 = "في الإنتظار";
                permissionU.userName4 = permissionVar["permissionU.userName4"];
                permissionU.userId4 = permissionVar["permissionU.userId4"];
                permissionU.userEtat4 = "في الإنتظار";
                permissionU.userName5 = permissionVar["permissionU.userName5"];
                permissionU.userId5 = permissionVar["permissionU.userId5"];
                permissionU.userEtat5 = "في الإنتظار";
                permissionU.userName6 = permissionVar["permissionU.userName6"];
                permissionU.userId6 = permissionVar["permissionU.userId6"];
                permissionU.userEtat6 = "في الإنتظار";
            }
            else if (cs.rolesNb == 7)
            {
                permissionU.userName1 = permissionVar["permissionU.userName1"];
                permissionU.userId1 = permissionVar["permissionU.userId1"];
                permissionU.userEtat1 = "في الإنتظار";
                permissionU.userName2 = permissionVar["permissionU.userName2"];
                permissionU.userId2 = permissionVar["permissionU.userId2"];
                permissionU.userEtat2 = "في الإنتظار";
                permissionU.userName3 = permissionVar["permissionU.userName3"];
                permissionU.userId3 = permissionVar["permissionU.userId3"];
                permissionU.userEtat3 = "في الإنتظار";
                permissionU.userName4 = permissionVar["permissionU.userName4"];
                permissionU.userId4 = permissionVar["permissionU.userId4"];
                permissionU.userEtat4 = "في الإنتظار";
                permissionU.userName5 = permissionVar["permissionU.userName5"];
                permissionU.userId5 = permissionVar["permissionU.userId5"];
                permissionU.userEtat5 = "في الإنتظار";
                permissionU.userName6 = permissionVar["permissionU.userName6"];
                permissionU.userId6 = permissionVar["permissionU.userId6"];
                permissionU.userEtat6 = "في الإنتظار";
                permissionU.userName7 = permissionVar["permissionU.userName7"];
                permissionU.userId7 = permissionVar["permissionU.userId7"];
                permissionU.userEtat7 = "في الإنتظار";
            }
            else if (cs.rolesNb == 8)
            {
                permissionU.userName1 = permissionVar["permissionU.userName1"];
                permissionU.userId1 = permissionVar["permissionU.userId1"];
                permissionU.userEtat1 = "في الإنتظار";
                permissionU.userName2 = permissionVar["permissionU.userName2"];
                permissionU.userId2 = permissionVar["permissionU.userId2"];
                permissionU.userEtat2 = "في الإنتظار";
                permissionU.userName3 = permissionVar["permissionU.userName3"];
                permissionU.userId3 = permissionVar["permissionU.userId3"];
                permissionU.userEtat3 = "في الإنتظار";
                permissionU.userName4 = permissionVar["permissionU.userName4"];
                permissionU.userId4 = permissionVar["permissionU.userId4"];
                permissionU.userEtat4 = "في الإنتظار";
                permissionU.userName5 = permissionVar["permissionU.userName5"];
                permissionU.userId5 = permissionVar["permissionU.userId5"];
                permissionU.userEtat5 = "في الإنتظار";
                permissionU.userName6 = permissionVar["permissionU.userName6"];
                permissionU.userId6 = permissionVar["permissionU.userId6"];
                permissionU.userEtat6 = "في الإنتظار";
                permissionU.userName7 = permissionVar["permissionU.userName7"];
                permissionU.userId7 = permissionVar["permissionU.userId7"];
                permissionU.userEtat7 = "في الإنتظار";
                permissionU.userName8 = permissionVar["permissionU.userName8"];
                permissionU.userId8 = permissionVar["permissionU.userId8"];
                permissionU.userEtat8 = "في الإنتظار";
            }

            permissionU.etat = "في الإنتظار";
            DateTime dateTimeNow = DateTime.Now; // Return 00/00/0000 00:00:00
            string dateOnly = dateTimeNow.ToShortDateString(); //Return 00/00/0000
            permissionU.datenereg = dateOnly;
            _context.permissionUs.Add(permissionU);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPermissionU", new { id = permissionU.Id }, permissionU);

        }

     

        [HttpGet]
        [Route("GetPermissionByUserCreator/{userId}")]

        public  List<PermissionU> GetPermissionByUserCreator(string userId)
        {
            List<PermissionU> UserPermisionUs = new List<PermissionU>();
            UserPermisionUs = _context.permissionUs.Where(item => item.idUserCreator == userId).ToList();
            return UserPermisionUs;
        }




        [HttpGet]
        [Route("GetPermissionDemand/{userId}")]

        public List<PermissionU> GetPermissionDemand(string userId)
        {


            List<PermissionU> UserPermisionUs = new List<PermissionU>();
            List<PermissionU> AllPermisionUs = new List<PermissionU>();
            ConfigService cs = new ConfigService();
            cs = _contextD.ConfigServices.Where(item => item.serviceId == 2).FirstOrDefault();
            AllPermisionUs = _context.permissionUs.ToList();
            for(int i = 0; i < AllPermisionUs.Count; i++)
            {
                if(AllPermisionUs[i].userId1 == userId && AllPermisionUs[i].userEtat1 == "في الإنتظار") 
                {
                    UserPermisionUs.Add(AllPermisionUs[i]);
                }

                else if(AllPermisionUs[i].userId2 == userId && AllPermisionUs[i].userEtat2 == "في الإنتظار" && AllPermisionUs[i].userEtat1 == "موافق") 
                {
                    UserPermisionUs.Add(AllPermisionUs[i]);
                }

                else if(AllPermisionUs[i].userId3 == userId && AllPermisionUs[i].userEtat3 == "في الإنتظار" && AllPermisionUs[i].userEtat2 == "موافق") 
                {
                    UserPermisionUs.Add(AllPermisionUs[i]);
                }

                else if(AllPermisionUs[i].userId4 == userId && AllPermisionUs[i].userEtat4 == "في الإنتظار" && AllPermisionUs[i].userEtat3 == "موافق") 
                {
                    UserPermisionUs.Add(AllPermisionUs[i]);
                }

                else if(AllPermisionUs[i].userId5 == userId && AllPermisionUs[i].userEtat5 == "في الإنتظار" && AllPermisionUs[i].userEtat4 == "موافق") 
                {
                    UserPermisionUs.Add(AllPermisionUs[i]);
                }

                else if (AllPermisionUs[i].userId6 == userId && AllPermisionUs[i].userEtat6 == "في الإنتظار" && AllPermisionUs[i].userEtat5 == "موافق")
                {
                    UserPermisionUs.Add(AllPermisionUs[i]);
                }

                else if (AllPermisionUs[i].userId7 == userId && AllPermisionUs[i].userEtat7 == "في الإنتظار" && AllPermisionUs[i].userEtat6 == "موافق")
                {
                    UserPermisionUs.Add(AllPermisionUs[i]);
                }

                else if (AllPermisionUs[i].userId8 == userId && AllPermisionUs[i].userEtat8 == "في الإنتظار" && AllPermisionUs[i].userEtat7 == "موافق")
                {
                    UserPermisionUs.Add(AllPermisionUs[i]);
                }

              
            }

           
            return UserPermisionUs;
        }


        [HttpGet]
        [Route("GetPersmissionHistorique/{id}")]

        public PermissionU GetPersmissionHistorique(int id)
        {
            PermissionU per = new PermissionU();
            ConfigService cs = new ConfigService();
            per = _context.permissionUs.Where(item => item.Id == id).FirstOrDefault();            
            cs = _contextD.ConfigServices.Where(item => item.serviceId == 2).FirstOrDefault();
            string rslt = "";


            // Traiter le cas d'accepter la demande par tt le monde 

            if(per.etat == "موافق")
            {
                rslt = "لقد تمت الموافقة على الطلب من قبل جميع الأطراف";
            }

            // Traiter le cas de refuser la demande par quelqu'un cas par cas  

            else if (per.etat == "رفض")
            {
                if(per.userEtat1 == "رفض")
                {
                    rslt = "لقد تم رفض الطلب من قبل " + cs.roleName1;
                }
                else if (per.userEtat2 == "رفض")
                {
                    rslt= "لقد تم رفض الطلب من قبل " + cs.roleName2;
                }
                else if (per.userEtat3 == "رفض")
                {
                    rslt = "لقد تم رفض الطلب من قبل " + cs.roleName3;
                }
                else if (per.userEtat4 == "رفض")
                {
                    rslt = "لقد تم رفض الطلب من قبل " + cs.roleName4;

                }
                else if (per.userEtat5 == "رفض")
                {
                    rslt = "لقد تم رفض الطلب من قبل " + cs.roleName5;
                }
                else if (per.userEtat6 == "رفض")
                {
                    rslt = "لقد تم رفض الطلب من قبل " + cs.roleName6;
                }
                else if (per.userEtat7 == "رفض")
                {
                    rslt = "لقد تم رفض الطلب من قبل " + cs.roleName7;
                }
                else if (per.userEtat8 == "رفض")
                {
                    rslt = "لقد تم رفض الطلب من قبل " + cs.roleName8;
                }
            }

            // Traiter les cas d'attente et d'accept cas par cas 
            else
            {            
                    if (per.userEtat1 == "في الإنتظار")
                    {
                        rslt = " لم تتم معالجة الطلب من قبل " + cs.roleName1;
                    }

                    else if (per.userEtat1 == "موافق" && per.userEtat2 == "في الإنتظار")
                    {
                        rslt = "وافق " + cs.roleName1 + " على الطلب ولكن الطلب معلق عند " + cs.roleName2;                     
                    }                               
                    else if (per.userEtat2 == "موافق" && per.userEtat3 == "في الإنتظار")
                    {
                        rslt = "وافق " + cs.roleName2 + " على الطلب ولكن الطلب معلق عند  " + cs.roleName3;
                    }
                    else if (per.userEtat3 == "موافق" && per.userEtat4 == "في الإنتظار")
                    {
                        rslt = "وافق " + cs.roleName3 + " على الطلب ولكن الطلب معلق عند " + cs.roleName4;
                    } 
                    else if (per.userEtat4 == "موافق" && per.userEtat5 == "في الإنتظار")
                    {
                        rslt = "وافق " + cs.roleName3 + " على الطلب ولكن الطلب معلق عند  " + cs.roleName5;
                    } 
                    else if (per.userEtat5 == "موافق" && per.userEtat6 == "في الإنتظار")
                    {
                        rslt = "وافق " + cs.roleName5 + " على الطلب ولكن الطلب معلق عند" + cs.roleName6;
                    }
                    else if (per.userEtat6 == "موافق" && per.userEtat7 == "في الإنتظار")
                    {
                        rslt = "وافق " + cs.roleName6 + " على الطلب ولكن الطلب معلق عند" + cs.roleName7;
                    } 
                    else if (per.userEtat7 == "موافق" && per.userEtat8 == "في الإنتظار")
                    {
                        rslt = "وافق " + cs.roleName7 + " على الطلب ولكن الطلب معلق عند" + cs.roleName8;
                    }                     
            }
            per.attribut6 = rslt;

       return per;
        }




        [HttpGet]
        [Route("EditDemandByRole/{Id}/{userEtat}")]

        public PermissionU EditDemandByRole(int Id, string userEtat)
        {
            
            PermissionU per = new PermissionU();
            ConfigService cs = new ConfigService();
            DateTime dateTimeNow = DateTime.Now; // Return 00/00/0000 00:00:00
            string dateOnly = dateTimeNow.ToShortDateString(); //Return 00/00/0000
            cs = _contextD.ConfigServices.Where(item => item.serviceId == 2).FirstOrDefault();
            per = _context.permissionUs.Where(item => item.Id == Id).FirstOrDefault();
           
            if(per.userEtat1 == "في الإنتظار")
            {
                if(userEtat != "رفض")
                {
                    per.userEtat1 = userEtat;
                    per.userDate1 = dateOnly;
                    if(cs.rolesNb>1)
                    {
                        per.iddir = per.userId2;
                        per.nomdir = per.userName2;

                    }
                }
                else
                {
                    per.userEtat1 = userEtat;
                    per.userDate1 = dateOnly;
                    per.etat = "رفض";         
                }
            
            }else if(per.userEtat1 == "موافق" && per.userEtat2 == "في الإنتظار")
            {
                if (userEtat != "رفض")
                {
                    per.userEtat2 = userEtat;
                    per.userDate2 = dateOnly;
                    if (cs.rolesNb > 2)
                    {
                        per.iddir = per.userId3;
                        per.nomdir = per.userName3;
                    }
                }
                else
                {
                    per.userEtat2 = userEtat;
                    per.userDate2 = dateOnly;
                    per.etat = "رفض";
                }
            }
            else if(per.userEtat2 == "موافق" && per.userEtat3 == "في الإنتظار")
            {
                if (userEtat != "رفض")
                {
                    per.userEtat3 = userEtat;
                    per.userDate3 = dateOnly;
                    if (cs.rolesNb > 3)
                    {
                        per.iddir = per.userId4;
                        per.nomdir = per.userName4;
                    }
                }
                else
                {
                    per.userEtat3 = userEtat;
                    per.userDate3 = dateOnly;
                    per.etat = "رفض";
                }
            } else if(per.userEtat3 == "موافق" && per.userEtat4 == "في الإنتظار")
            {
                if (userEtat != "رفض")
                {
                    per.userEtat4 = userEtat;
                    per.userDate4 = dateOnly;
                    if (cs.rolesNb > 4)
                    {
                        per.iddir = per.userId5;
                        per.nomdir = per.userName5;
                    }
                }
                else
                {
                    per.userEtat4 = userEtat;
                    per.userDate4 = dateOnly;
                    per.etat = "رفض";
                }
            } else if(per.userEtat4 == "موافق" && per.userEtat5 == "في الإنتظار")
            {
                if (userEtat != "رفض")
                {
                    per.userEtat5 = userEtat;
                    per.userDate5 = dateOnly;
                    if (cs.rolesNb > 5)
                    {
                        per.iddir = per.userId6;
                        per.nomdir = per.userName6;
                    }
                }
                else
                {
                    per.userEtat5 = userEtat;
                    per.userDate5 = dateOnly;
                    per.etat = "رفض";
                }
            } else if(per.userEtat5 == "موافق" && per.userEtat6 == "في الإنتظار")
            {
                if (userEtat != "رفض")
                {
                    per.userEtat6 = userEtat;
                    per.userDate6 = dateOnly;
                    if (cs.rolesNb > 6)
                    {
                        per.iddir = per.userId7;
                        per.nomdir = per.userName7;
                    }
                }
                else
                {
                    per.userEtat6 = userEtat;
                    per.userDate6 = dateOnly;
                    per.etat = "رفض";
                }
            }else if(per.userEtat6 == "موافق" && per.userEtat7 == "في الإنتظار")
            {
                if (userEtat != "رفض")
                {
                    per.userEtat7 = userEtat;
                    per.userDate7 = dateOnly;
                    if (cs.rolesNb > 7)
                    {
                        per.iddir = per.userId8;
                        per.nomdir = per.userName8;
                    }
                }
                else
                {
                    per.userEtat7 = userEtat;
                    per.userDate7 = dateOnly;
                    per.etat = "رفض";
                }
            }else if(per.userEtat7 == "موافق" && per.userEtat8 == "في الإنتظار")
            {
                if (userEtat != "رفض")
                {
                    per.userEtat8 = userEtat;
                    per.userDate8 = dateOnly;
                }
                else
                {
                    per.userEtat8 = userEtat;
                    per.userDate8 = dateOnly;
                    per.etat = "رفض";
                }
            }
          
            if (cs.rolesNb == 1 && per.userEtat1 == "موافق")
            {
                per.etat = "موافق";
            }
            else if (cs.rolesNb == 2 && per.userEtat2 == "موافق")
            {
                per.etat = "موافق";
                
            }
            else if (cs.rolesNb == 3 && per.userEtat3 == "موافق")
            {
                per.etat = "موافق";
            }else if (cs.rolesNb == 4 && per.userEtat4 == "موافق")
            {
                per.etat = "موافق";
            }else if (cs.rolesNb == 5 && per.userEtat5 == "موافق")
            {
                per.etat = "موافق";
            }else if (cs.rolesNb == 6 && per.userEtat6 == "موافق")
            {
                per.etat = "موافق";
            }else if (cs.rolesNb == 7 && per.userEtat7 == "موافق")
            {
                per.etat = "موافق";
            }
            else if (cs.rolesNb == 8 && per.userEtat8 == "موافق")
            {
                per.etat = "موافق";
            }
    

            return per;

        }


        // DELETE: api/PermissionUs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<PermissionU>> DeletePermissionU(int id)
        {

            var permissionU = await _context.permissionUs.FindAsync(id);
            if (permissionU == null)
            {
                return NotFound();
            }

            _context.permissionUs.Remove(permissionU);
            await _context.SaveChangesAsync();

            return permissionU;
        }

        private bool PermissionUExists(int id)
        {
            return _context.permissionUs.Any(e => e.Id == id);
        }
    }
}
