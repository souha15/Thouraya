using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.ActivitePart;

namespace WebApplicationPlateforme.Controllers.ActivitesPart
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActiviteesController : ControllerBase
    {
        private readonly DawaaContext _context;

        public ActiviteesController(DawaaContext context)
        {
            _context = context;
        }

        // GET: api/Activitees
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Activiteee>>> GetActivitee()
        {
            return await _context.Activitee.ToListAsync();
        }

        // GET: api/Activitees/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Activiteee>> GetActivitee(int id)
        {
            var activitee = await _context.Activitee.FindAsync(id);

            if (activitee == null)
            {
                return NotFound();
            }

            return activitee;
        }

        // PUT: api/Activitees/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutActivitee(int id, Activiteee activitee)
        {
            if (id != activitee.Id)
            {
                return BadRequest();
            }

            _context.Entry(activitee).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ActiviteeExists(id))
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

        // POST: api/Activitees
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Activiteee>> PostActivitee(Activiteee activitee)
        {
            _context.Activitee.Add(activitee);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetActivitee", new { id = activitee.Id }, activitee);
        }

        // DELETE: api/Activitees/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Activiteee>> DeleteActivitee(int id)
        {
            var activitee = await _context.Activitee.FindAsync(id);
            if (activitee == null)
            {
                return NotFound();
            }

            _context.Activitee.Remove(activitee);
            await _context.SaveChangesAsync();

            return activitee;
        }

        private bool ActiviteeExists(int id)
        {
            return _context.Activitee.Any(e => e.Id == id);
        }
    }
}
