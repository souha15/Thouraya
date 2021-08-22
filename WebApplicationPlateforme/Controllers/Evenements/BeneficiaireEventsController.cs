using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Evenements;

namespace WebApplicationPlateforme.Controllers.Evenements
{
    [Route("api/[controller]")]
    [ApiController]
    public class BeneficiaireEventsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public BeneficiaireEventsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/BeneficiaireEvents
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BeneficiaireEvent>>> GetbeneficiaireEvents()
        {
            return await _context.beneficiaireEvents.ToListAsync();
        }

        // GET: api/BeneficiaireEvents/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BeneficiaireEvent>> GetBeneficiaireEvent(int id)
        {
            var beneficiaireEvent = await _context.beneficiaireEvents.FindAsync(id);

            if (beneficiaireEvent == null)
            {
                return NotFound();
            }

            return beneficiaireEvent;
        }

        // PUT: api/BeneficiaireEvents/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBeneficiaireEvent(int id, BeneficiaireEvent beneficiaireEvent)
        {
            if (id != beneficiaireEvent.Id)
            {
                return BadRequest();
            }

            _context.Entry(beneficiaireEvent).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BeneficiaireEventExists(id))
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

        // POST: api/BeneficiaireEvents
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<BeneficiaireEvent>> PostBeneficiaireEvent(BeneficiaireEvent beneficiaireEvent)
        {
            _context.beneficiaireEvents.Add(beneficiaireEvent);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBeneficiaireEvent", new { id = beneficiaireEvent.Id }, beneficiaireEvent);
        }

        // DELETE: api/BeneficiaireEvents/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<BeneficiaireEvent>> DeleteBeneficiaireEvent(int id)
        {
            var beneficiaireEvent = await _context.beneficiaireEvents.FindAsync(id);
            if (beneficiaireEvent == null)
            {
                return NotFound();
            }

            _context.beneficiaireEvents.Remove(beneficiaireEvent);
            await _context.SaveChangesAsync();

            return beneficiaireEvent;
        }

        private bool BeneficiaireEventExists(int id)
        {
            return _context.beneficiaireEvents.Any(e => e.Id == id);
        }
    }
}
