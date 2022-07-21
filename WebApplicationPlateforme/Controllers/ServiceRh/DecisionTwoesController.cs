using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
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

            _context.decisionTwos.Add(decisionTwo);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDecisionTwo", new { id = decisionTwo.Id }, decisionTwo);
        }

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

        [HttpGet]
        [Route("GetDecision/{IdUser}")]
        [Obsolete]
        public bool DecisionGet(string IdUser)
        {
                  
            List<DecisionTwo> decionList = new List<DecisionTwo>();

            decionList =  _context.decisionTwos.Where(item => item.employeeid == IdUser          
            ).ToList();
            bool diff = false;
            int i =0;
   
            while (diff == false && i < decionList.Count)
            {

                if (diffbetweenTwoDates(decionList[i].dateenreg) <= 3) 
                {
                    diff = true;
                }
                else
                {
                    i++;
                }
            }
            return diff;

        }


        [HttpGet]
        [Route("DecisionGetByAdmin/{adminId}")]
        [Obsolete]
        public bool DecisionGetByAdmin(int adminId)
        {

            List<DecisionTwo> decionList = new List<DecisionTwo>();

            decionList = _context.decisionTwos.Where(item => (item.adminid == adminId && item.attribut5 =="1")|| item.alladmin == "1"
            ).ToList();
            bool diff = false;
            int i = 0;

            while (diff == false && i < decionList.Count)
            {

                if (diffbetweenTwoDates(decionList[i].dateenreg) <= 3)
                {
                    diff = true;
                }
                else
                {
                    i++;
                }
            }
            return diff;

        }


        [HttpGet]
        [Route("TestDecision/{UserId}/{adminId}")]
        [Obsolete]
        public string TestDecision( string UserId ,int? adminId)
        {

            DecisionTwo decision = new DecisionTwo();
            string resultat = "";
            decision = _context.decisionTwos.Where(item => item.attribut5 == "1" || item.alladmin == "1" || item.employeeid == UserId).FirstOrDefault();

            if (adminId != null){
            if(decision.attribut5 == "1" && decision.adminid == adminId)
            {
                    resultat = "Toadmin";                
            }
            }

            if (decision.employeeid == UserId)
            {
                resultat = "ToUser";                  
            }

            if(decision.alladmin == "1")
            {
                resultat = "ToAll";
            }

            return resultat;

        }

        [HttpGet]
        [Route("DecisionGetAllAdmin")]
        [Obsolete]
        public bool DecisionGetAllAdmin()
        {

            List<DecisionTwo> decionList = new List<DecisionTwo>();

            decionList = _context.decisionTwos.Where(item =>item.attribut5 != "1" && item.alladmin == "1"
            ).ToList();
            bool diff = false;
            int i = 0;

            while (diff == false && i < decionList.Count)
            {

                if (diffbetweenTwoDates(decionList[i].dateenreg) <= 3)
                {
                    diff = true;
                }
                else
                {
                    i++;
                }
            }
            return diff;

        }

        public int diffbetweenTwoDates(string dateEnreg)
        {
            DateTimeOffset value = DateTimeOffset.Now;
            string fmt = "d";
            string date = value.Date.ToString(fmt);
            int diff = (Convert.ToDateTime(date) - Convert.ToDateTime(dateEnreg)).Days;
            return diff;
        }

        private bool DecisionTwoExists(int id)
        {
            return _context.decisionTwos.Any(e => e.Id == id);
        }
    }
}
