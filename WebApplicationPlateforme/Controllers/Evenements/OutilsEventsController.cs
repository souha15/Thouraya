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
    public class OutilsEventsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public OutilsEventsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/OutilsEvents
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OutilsEvent>>> GetoutilsEvents()
        {
            return await _context.outilsEvents.ToListAsync();
        }

        // GET: api/OutilsEvents/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OutilsEvent>> GetOutilsEvent(int id)
        {
            var outilsEvent = await _context.outilsEvents.FindAsync(id);

            if (outilsEvent == null)
            {
                return NotFound();
            }

            return outilsEvent;
        }

        // PUT: api/OutilsEvents/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOutilsEvent(int id, OutilsEvent outilsEvent)
        {
            if (id != outilsEvent.Id)
            {
                return BadRequest();
            }

            _context.Entry(outilsEvent).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OutilsEventExists(id))
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

        // POST: api/OutilsEvents
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<OutilsEvent>> PostOutilsEvent(OutilsEvent outilsEvent)
        {
            _context.outilsEvents.Add(outilsEvent);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOutilsEvent", new { id = outilsEvent.Id }, outilsEvent);
        }

        // DELETE: api/OutilsEvents/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<OutilsEvent>> DeleteOutilsEvent(int id)
        {
            var outilsEvent = await _context.outilsEvents.FindAsync(id);
            if (outilsEvent == null)
            {
                return NotFound();
            }

            _context.outilsEvents.Remove(outilsEvent);
            await _context.SaveChangesAsync();

            return outilsEvent;
        }

        private bool OutilsEventExists(int id)
        {
            return _context.outilsEvents.Any(e => e.Id == id);
        }
    }
}
