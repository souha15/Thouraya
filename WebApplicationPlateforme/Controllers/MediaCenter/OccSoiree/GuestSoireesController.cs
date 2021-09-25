using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.MediaCenter.SoireeOccasion;

namespace WebApplicationPlateforme.Controllers.MediaCenter.OccSoiree
{
    [Route("api/[controller]")]
    [ApiController]
    public class GuestSoireesController : ControllerBase
    {
        private readonly FinanceContext _context;

        public GuestSoireesController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/GuestSoirees
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GuestSoiree>>> GetGuestSoiree()
        {
            return await _context.GuestSoiree.ToListAsync();
        }

        // GET: api/GuestSoirees/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GuestSoiree>> GetGuestSoiree(int id)
        {
            var guestSoiree = await _context.GuestSoiree.FindAsync(id);

            if (guestSoiree == null)
            {
                return NotFound();
            }

            return guestSoiree;
        }

        // PUT: api/GuestSoirees/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGuestSoiree(int id, GuestSoiree guestSoiree)
        {
            if (id != guestSoiree.Id)
            {
                return BadRequest();
            }

            _context.Entry(guestSoiree).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GuestSoireeExists(id))
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

        // POST: api/GuestSoirees
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<GuestSoiree>> PostGuestSoiree(GuestSoiree guestSoiree)
        {
            _context.GuestSoiree.Add(guestSoiree);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGuestSoiree", new { id = guestSoiree.Id }, guestSoiree);
        }

        // DELETE: api/GuestSoirees/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<GuestSoiree>> DeleteGuestSoiree(int id)
        {
            var guestSoiree = await _context.GuestSoiree.FindAsync(id);
            if (guestSoiree == null)
            {
                return NotFound();
            }

            _context.GuestSoiree.Remove(guestSoiree);
            await _context.SaveChangesAsync();

            return guestSoiree;
        }

        private bool GuestSoireeExists(int id)
        {
            return _context.GuestSoiree.Any(e => e.Id == id);
        }
    }
}
