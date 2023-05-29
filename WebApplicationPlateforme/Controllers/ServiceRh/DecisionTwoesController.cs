using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.ServiceRh;

namespace WebApplicationPlateforme.Controllers.ServiceRh
{
    [Route("api/[controller]")]
    [ApiController]
    public class DecisionTwoesController : ControllerBase
    {
        private readonly FinanceContext _context;

        public DecisionTwoesController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/DecisionTwoes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DecisionTwo>>> GetdecisionTwos()
        {
            return await _context.decisionTwos.OrderBy(item => item.Id).ToListAsync();
        }

        // GET: api/DecisionTwoes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DecisionTwo>> GetDecisionTwo(int id)
        {
            var decisionTwo = await _context.decisionTwos.FindAsync(id);

            if (decisionTwo == null)
            {
                return NotFound();
            }

            return decisionTwo;
        }

        // PUT: api/DecisionTwoes/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDecisionTwo(int id, DecisionTwo decisionTwo)
        {
            if (id != decisionTwo.Id)
            {
                return BadRequest();
            }

            _context.Entry(decisionTwo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DecisionTwoExists(id))
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

        // POST: api/DecisionTwoes
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<DecisionTwo>> PostDecisionTwo(DecisionTwo decisionTwo)
        {
            DateTimeOffset value = DateTimeOffset.Now;
            string fmt = "dd/MM/yyyy";
            DateTime date = value.Date;

            decisionTwo.attribut2 = date.Day.ToString();
            decisionTwo.attribut3 = date.Month.ToString();
            decisionTwo.attribut4 = date.Year.ToString();
            decisionTwo.dateenreg = value.Date.ToString(fmt);
            decisionTwo.attribut6 = decisionTwo.attribut4 + "-" + decisionTwo.attribut3 + "-" + decisionTwo.attribut2;
            _context.decisionTwos.Add(decisionTwo);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDecisionTwo", new { id = decisionTwo.Id }, decisionTwo);
        }

        [HttpGet]
        [Route("GetDecisionAllAdmin")]

        public DecisionTwo GetDecisionAllAdmin()
        {
            DecisionTwo Decision = new DecisionTwo();
            Decision = _context.decisionTwos.Where(item => item.alladmin == "1").OrderByDescending(item => item.Id).FirstOrDefault();
            return Decision;
        }

        [HttpGet]
        [Route("GetDecisionToUser/{UserId}")]

        public DecisionTwo GetDecisionToUser(string UserId)
        {
            DecisionTwo Decision = new DecisionTwo();
            Decision = _context.decisionTwos.Where(item => item.employeeid == UserId).OrderByDescending(item => item.Id).FirstOrDefault();
            return Decision;
        }


        [HttpGet]
        [Route("GetDecisionToAdmin/{adminId}")]

        public DecisionTwo GetDecisionToAdmin(int? adminId)
        {
            DecisionTwo Decision = new DecisionTwo();
            if (adminId != null)
            {
                Decision = _context.decisionTwos.Where(item => item.attribut5 == "1" && item.adminid == adminId).OrderByDescending(item => item.Id).FirstOrDefault();
            }
            return Decision;
        }

        //[HttpGet]
        //[Route("TestDecision/{UserId}/{adminId}")]

        //public List<DecisionTwo> TestDecision(string UserId, int? adminId)
        //{
        //    List<DecisionTwo> ListDecision = new List<DecisionTwo>();
        //    List<DecisionTwo> ListDecisionRslt = new List<DecisionTwo>();

        //    DateTimeOffset value = DateTimeOffset.Now;
        //    string fmt = "dd/MM/yyyy";
        //    string date = value.Date.ToString();
        //    ListDecision =  _context.decisionTwos.Where(item => item.attribut5 == "1" || item.alladmin == "1" || item.employeeid == UserId).ToList();
        //    int i = 0;
        //    Boolean rslt = false;
        //    if (ListDecision.Count > 0)
        //    {
        //        while (i < ListDecision.Count() && rslt == false )
        //        {
        //            if(adminId != null) { 
        //            if(ListDecision[i].alladmin == "1" && Convert.ToDateTime(date, CultureInfo.InvariantCulture) <= Convert.ToDateTime(ListDecision[i].attribut6, CultureInfo.InvariantCulture))
        //            {
        //                rslt = true;
        //                ListDecisionRslt.Add(ListDecision[i]);
        //            }
        //            else if(ListDecision[i].attribut5 =="1" && ListDecision[i].adminid == adminId && Convert.ToDateTime(date, CultureInfo.InvariantCulture) <= Convert.ToDateTime(ListDecision[i].attribut6, CultureInfo.InvariantCulture))
        //            {
        //                rslt = true;
        //                ListDecisionRslt.Add(ListDecision[i]);
        //            }
        //            else if(ListDecision[i].employeeid == UserId && Convert.ToDateTime(date, CultureInfo.InvariantCulture) <= Convert.ToDateTime(ListDecision[i].attribut6, CultureInfo.InvariantCulture))
        //            {

        //                rslt = true;
        //                ListDecisionRslt.Add(ListDecision[i]);
        //            }

        //            }
        //            else
        //            {
        //                if (ListDecision[i].alladmin == "1" && Convert.ToDateTime(date, CultureInfo.InvariantCulture) <= Convert.ToDateTime(ListDecision[i].attribut6, CultureInfo.InvariantCulture))
        //                {
        //                    rslt = true;
        //                    ListDecisionRslt.Add(ListDecision[i]);
        //                }

        //                else if (ListDecision[i].employeeid == UserId && Convert.ToDateTime(date, CultureInfo.InvariantCulture) <= Convert.ToDateTime(ListDecision[i].attribut6, CultureInfo.InvariantCulture))
        //                {

        //                    rslt = true;
        //                    ListDecisionRslt.Add(ListDecision[i]);
        //                }
        //            }
        //            i++;
        //        }
        //    }


        //    return ListDecisionRslt;
        //}

        // DELETE: api/DecisionTwoes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<DecisionTwo>> DeleteDecisionTwo(int id)
        {
            var decisionTwo = await _context.decisionTwos.FindAsync(id);
            if (decisionTwo == null)
            {
                return NotFound();
            }

            _context.decisionTwos.Remove(decisionTwo);
            await _context.SaveChangesAsync();

            return decisionTwo;
        }

        //[HttpGet]
        //[Route("GetDecision/{IdUser}")]
        //[Obsolete]
        //public bool DecisionGet(string IdUser)
        //{

        //    List<DecisionTwo> decionList = new List<DecisionTwo>();

        //    decionList =  _context.decisionTwos.Where(item => item.employeeid == IdUser          
        //    ).ToList();
        //    bool diff = false;
        //    int i =0;

        //    while (diff == false && i < decionList.Count)
        //    {

        //        if (diffbetweenTwoDates(decionList[i].dateenreg) <= 3) 
        //        {
        //            diff = true;
        //        }
        //        else
        //        {
        //            i++;
        //        }
        //    }
        //    return diff;

        //}


        //[HttpGet]
        //[Route("DecisionGetByAdmin/{adminId}")]
        //[Obsolete]
        //public bool DecisionGetByAdmin(int adminId)
        //{

        //    List<DecisionTwo> decionList = new List<DecisionTwo>();

        //    decionList = _context.decisionTwos.Where(item => (item.adminid == adminId && item.attribut5 =="1")|| item.alladmin == "1"
        //    ).ToList();
        //    bool diff = false;
        //    int i = 0;

        //    while (diff == false && i < decionList.Count)
        //    {

        //        if (diffbetweenTwoDates(decionList[i].dateenreg) <= 3)
        //        {
        //            diff = true;
        //        }
        //        else
        //        {
        //            i++;
        //        }
        //    }
        //    return diff;

        //}


        //[HttpGet]
        //[Route("TestDecision/{UserId}/{adminId}")]
        //[Obsolete]
        //public List<DecisionTwo> TestDecision(string UserId, int? adminId)
        //{

        //    List<DecisionTwo> decisionList = new List<DecisionTwo>();
        //    List<DecisionTwo> decisionListResult = new List<DecisionTwo>();
        //    string resultat = "no";
        //    int i = 0;
        //    decisionList = _context.decisionTwos.Where(item => item.attribut5 == "1" || item.alladmin == "1" || item.employeeid == UserId).ToList();
        //    while (resultat == "no" && i < decisionList.Count())
        //    {
        //        if (decisionList[i].adminid != 0)
        //        {
        //            if (decisionList[i].attribut5 == "1" && decisionList[i].adminid == adminId && diffbetweenTwoDates(decisionList[i].dateenreg) <= 3)
        //            {
        //                resultat = "yes";
        //                decisionListResult.Add(decisionList[i]);
        //            }
        //        }
        //        else if (decisionList[i].adminid == 0 && (diffbetweenTwoDates(decisionList[i].dateenreg) <= 3 && diffbetweenTwoDates(decisionList[i].dateenreg) >= 0))
        //        {

        //            if (decisionList[i].employeeid == UserId && (diffbetweenTwoDates(decisionList[i].dateenreg) <= 3 && diffbetweenTwoDates(decisionList[i].dateenreg) >= 0))
        //            {

        //                resultat = "yes";
        //                decisionListResult.Add(decisionList[i]);
        //            }

        //            if (decisionList[i].alladmin == "1" && (diffbetweenTwoDates(decisionList[i].dateenreg) <= 3 && diffbetweenTwoDates(decisionList[i].dateenreg) >= 0))
        //            {

        //                resultat = "yes";
        //                decisionListResult.Add(decisionList[i]);

        //            }
        //        }
        //        else
        //        {
        //            resultat = "no";
        //        }
        //        i++;
        //    }


        //    return decisionListResult;

        //}

        //[HttpGet]
        //[Route("DecisionGetAllAdmin")]
        //[Obsolete]
        //public bool DecisionGetAllAdmin()
        //{

        //    List<DecisionTwo> decionList = new List<DecisionTwo>();

        //    decionList = _context.decisionTwos.Where(item =>item.attribut5 != "1" && item.alladmin == "1"
        //    ).ToList();
        //    bool diff = false;
        //    int i = 0;

        //    while (diff == false && i < decionList.Count)
        //    {

        //        if (diffbetweenTwoDates(decionList[i].dateenreg) <= 3)
        //        {
        //            diff = true;
        //        }
        //        else
        //        {
        //            i++;
        //        }
        //    }
        //    return diff;

        //}

        public int diffbetweenTwoDates(string dateEnreg)
        {
            DateTimeOffset value = DateTimeOffset.Now;
            string fmt = "d";
            string date = value.Date.ToString(fmt);
            int diff = (Convert.ToDateTime(date, CultureInfo.InvariantCulture) - Convert.ToDateTime(dateEnreg, CultureInfo.InvariantCulture)).Days;
            return diff;
        }

        private bool DecisionTwoExists(int id)
        {
            return _context.decisionTwos.Any(e => e.Id == id);
        }
    }
}
