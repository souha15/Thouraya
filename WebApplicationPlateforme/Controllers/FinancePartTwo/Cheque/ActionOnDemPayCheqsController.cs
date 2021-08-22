using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.FinancePartTwo.Cheques;

namespace WebApplicationPlateforme.Controllers.FinancePartTwo.Cheque
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActionOnDemPayCheqsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public ActionOnDemPayCheqsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/ActionOnDemPayCheqs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ActionOnDemPayCheq>>> GetactionOnDemPayCheqs()
        {
            return await _context.actionOnDemPayCheqs.ToListAsync();
        }

        // GET: api/ActionOnDemPayCheqs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ActionOnDemPayCheq>> GetActionOnDemPayCheq(int id)
        {
            var actionOnDemPayCheq = await _context.actionOnDemPayCheqs.FindAsync(id);

            if (actionOnDemPayCheq == null)
            {
                return NotFound();
            }

            return actionOnDemPayCheq;
        }

        // PUT: api/ActionOnDemPayCheqs/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutActionOnDemPayCheq(int id, ActionOnDemPayCheq actionOnDemPayCheq)
        {
            if (id != actionOnDemPayCheq.Id)
            {
                return BadRequest();
            }

            _context.Entry(actionOnDemPayCheq).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ActionOnDemPayCheqExists(id))
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

        // POST: api/ActionOnDemPayCheqs
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ActionOnDemPayCheq>> PostActionOnDemPayCheq(ActionOnDemPayCheq actionOnDemPayCheq)
        {
            _context.actionOnDemPayCheqs.Add(actionOnDemPayCheq);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetActionOnDemPayCheq", new { id = actionOnDemPayCheq.Id }, actionOnDemPayCheq);
        }

        // DELETE: api/ActionOnDemPayCheqs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ActionOnDemPayCheq>> DeleteActionOnDemPayCheq(int id)
        {
            var actionOnDemPayCheq = await _context.actionOnDemPayCheqs.FindAsync(id);
            if (actionOnDemPayCheq == null)
            {
                return NotFound();
            }

            _context.actionOnDemPayCheqs.Remove(actionOnDemPayCheq);
            await _context.SaveChangesAsync();

            return actionOnDemPayCheq;
        }

        private bool ActionOnDemPayCheqExists(int id)
        {
            return _context.actionOnDemPayCheqs.Any(e => e.Id == id);
        }
    }
}
