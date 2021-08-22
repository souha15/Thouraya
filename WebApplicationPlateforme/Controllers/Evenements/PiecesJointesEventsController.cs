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
    public class PiecesJointesEventsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public PiecesJointesEventsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/PiecesJointesEvents
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PiecesJointesEvents>>> GetpiecesJointesEvents()
        {
            return await _context.piecesJointesEvents.ToListAsync();
        }

        // GET: api/PiecesJointesEvents/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PiecesJointesEvents>> GetPiecesJointesEvents(int id)
        {
            var piecesJointesEvents = await _context.piecesJointesEvents.FindAsync(id);

            if (piecesJointesEvents == null)
            {
                return NotFound();
            }

            return piecesJointesEvents;
        }

        // PUT: api/PiecesJointesEvents/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPiecesJointesEvents(int id, PiecesJointesEvents piecesJointesEvents)
        {
            if (id != piecesJointesEvents.Id)
            {
                return BadRequest();
            }

            _context.Entry(piecesJointesEvents).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PiecesJointesEventsExists(id))
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

        // POST: api/PiecesJointesEvents
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<PiecesJointesEvents>> PostPiecesJointesEvents(PiecesJointesEvents piecesJointesEvents)
        {
            _context.piecesJointesEvents.Add(piecesJointesEvents);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPiecesJointesEvents", new { id = piecesJointesEvents.Id }, piecesJointesEvents);
        }

        // DELETE: api/PiecesJointesEvents/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<PiecesJointesEvents>> DeletePiecesJointesEvents(int id)
        {
            var piecesJointesEvents = await _context.piecesJointesEvents.FindAsync(id);
            if (piecesJointesEvents == null)
            {
                return NotFound();
            }

            _context.piecesJointesEvents.Remove(piecesJointesEvents);
            await _context.SaveChangesAsync();

            return piecesJointesEvents;
        }

        private bool PiecesJointesEventsExists(int id)
        {
            return _context.piecesJointesEvents.Any(e => e.Id == id);
        }
    }
}
