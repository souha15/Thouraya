using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Decision;

namespace WebApplicationPlateforme.Controllers.Decisions
{
    [Route("api/[controller]")]
    [ApiController]
    public class DecisionDecisifsController : ControllerBase
    {
        private readonly DawaaContext _context;

        public DecisionDecisifsController(DawaaContext context)
        {
            _context = context;
        }

        // GET: api/DecisionDecisifs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DecisionDecisif>>> GetDecisionDecisifs()
        {
            return await _context.DecisionDecisifs.ToListAsync();
        }

        // GET: api/DecisionDecisifs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DecisionDecisif>> GetDecisionDecisif(int id)
        {
            var decisionDecisif = await _context.DecisionDecisifs.FindAsync(id);

            if (decisionDecisif == null)
            {
                return NotFound();
            }

            return decisionDecisif;
        }

        // PUT: api/DecisionDecisifs/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDecisionDecisif(int id, DecisionDecisif decisionDecisif)
        {
            if (id != decisionDecisif.Id)
            {
                return BadRequest();
            }

            _context.Entry(decisionDecisif).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DecisionDecisifExists(id))
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

        // POST: api/DecisionDecisifs
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<DecisionDecisif>> PostDecisionDecisif(DecisionDecisif decisionDecisif)
        {
            _context.DecisionDecisifs.Add(decisionDecisif);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDecisionDecisif", new { id = decisionDecisif.Id }, decisionDecisif);
        }

        // DELETE: api/DecisionDecisifs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<DecisionDecisif>> DeleteDecisionDecisif(int id)
        {
            var decisionDecisif = await _context.DecisionDecisifs.FindAsync(id);
            if (decisionDecisif == null)
            {
                return NotFound();
            }

            _context.DecisionDecisifs.Remove(decisionDecisif);
            await _context.SaveChangesAsync();

            return decisionDecisif;
        }

        private bool DecisionDecisifExists(int id)
        {
            return _context.DecisionDecisifs.Any(e => e.Id == id);
        }
    }
}
