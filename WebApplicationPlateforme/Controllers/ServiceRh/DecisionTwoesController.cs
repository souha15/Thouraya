using System;
using System.Collections.Generic;
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
            return await _context.decisionTwos.ToListAsync();
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

        private bool DecisionTwoExists(int id)
        {
            return _context.decisionTwos.Any(e => e.Id == id);
        }
    }
}
