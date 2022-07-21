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
    public class ActiviteDawasController : ControllerBase
    {
        private readonly DawaaContext _context;

        public ActiviteDawasController(DawaaContext context)
        {
            _context = context;
        }

        // GET: api/ActiviteDawas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ActiviteDawa>>> GetactiviteDawas()
        {
            return await _context.ActiviteDawas.ToListAsync();
        }

        // GET: api/ActiviteDawas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ActiviteDawa>> GetActiviteDawa(int id)
        {
            var activiteDawa = await _context.ActiviteDawas.FindAsync(id);

            if (activiteDawa == null)
            {
                return NotFound();
            }

            return activiteDawa;
        }

        // PUT: api/ActiviteDawas/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutActiviteDawa(int id, ActiviteDawa activiteDawa)
        {
            if (id != activiteDawa.Id)
            {
                return BadRequest();
            }

            _context.Entry(activiteDawa).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ActiviteDawaExists(id))
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

        // POST: api/ActiviteDawas
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ActiviteDawa>> PostActiviteDawa(ActiviteDawa activiteDawa)
        {
            _context.ActiviteDawas.Add(activiteDawa);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetActiviteDawa", new { id = activiteDawa.Id }, activiteDawa);
        }

        // DELETE: api/ActiviteDawas/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ActiviteDawa>> DeleteActiviteDawa(int id)
        {
            var activiteDawa = await _context.ActiviteDawas.FindAsync(id);
            if (activiteDawa == null)
            {
                return NotFound();
            }

            _context.ActiviteDawas.Remove(activiteDawa);
            await _context.SaveChangesAsync();

            return activiteDawa;
        }

        private bool ActiviteDawaExists(int id)
        {
            return _context.ActiviteDawas.Any(e => e.Id == id);
        }
    }
}
