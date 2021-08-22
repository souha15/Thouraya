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
    public class DepenseEventsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public DepenseEventsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/DepenseEvents
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DepenseEvent>>> GetdepenseEvents()
        {
            return await _context.depenseEvents.ToListAsync();
        }

        // GET: api/DepenseEvents/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DepenseEvent>> GetDepenseEvent(int id)
        {
            var depenseEvent = await _context.depenseEvents.FindAsync(id);

            if (depenseEvent == null)
            {
                return NotFound();
            }

            return depenseEvent;
        }

        // PUT: api/DepenseEvents/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDepenseEvent(int id, DepenseEvent depenseEvent)
        {
            if (id != depenseEvent.Id)
            {
                return BadRequest();
            }

            _context.Entry(depenseEvent).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DepenseEventExists(id))
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

        // POST: api/DepenseEvents
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<DepenseEvent>> PostDepenseEvent(DepenseEvent depenseEvent)
        {
            _context.depenseEvents.Add(depenseEvent);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDepenseEvent", new { id = depenseEvent.Id }, depenseEvent);
        }

        // DELETE: api/DepenseEvents/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<DepenseEvent>> DeleteDepenseEvent(int id)
        {
            var depenseEvent = await _context.depenseEvents.FindAsync(id);
            if (depenseEvent == null)
            {
                return NotFound();
            }

            _context.depenseEvents.Remove(depenseEvent);
            await _context.SaveChangesAsync();

            return depenseEvent;
        }

        private bool DepenseEventExists(int id)
        {
            return _context.depenseEvents.Any(e => e.Id == id);
        }
    }
}
