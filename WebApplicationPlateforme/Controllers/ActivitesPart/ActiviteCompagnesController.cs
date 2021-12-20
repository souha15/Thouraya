using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.ActivitePart;

namespace WebApplicationPlateforme.Controllers.Activitee
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActiviteCompagnesController : ControllerBase
    {
        private readonly DawaaContext _context;

        public ActiviteCompagnesController(DawaaContext context)
        {
            _context = context;
        }

        // GET: api/ActiviteCompagnes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ActiviteCompagne>>> GetActiviteCompagnes()
        {
            return await _context.ActiviteCompagnes.ToListAsync();
        }

        // GET: api/ActiviteCompagnes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ActiviteCompagne>> GetActiviteCompagne(int id)
        {
            var activiteCompagne = await _context.ActiviteCompagnes.FindAsync(id);

            if (activiteCompagne == null)
            {
                return NotFound();
            }

            return activiteCompagne;
        }

        // PUT: api/ActiviteCompagnes/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutActiviteCompagne(int id, ActiviteCompagne activiteCompagne)
        {
            if (id != activiteCompagne.Id)
            {
                return BadRequest();
            }

            _context.Entry(activiteCompagne).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ActiviteCompagneExists(id))
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

        // POST: api/ActiviteCompagnes
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ActiviteCompagne>> PostActiviteCompagne(ActiviteCompagne activiteCompagne)
        {
            _context.ActiviteCompagnes.Add(activiteCompagne);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetActiviteCompagne", new { id = activiteCompagne.Id }, activiteCompagne);
        }

        // DELETE: api/ActiviteCompagnes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ActiviteCompagne>> DeleteActiviteCompagne(int id)
        {
            var activiteCompagne = await _context.ActiviteCompagnes.FindAsync(id);
            if (activiteCompagne == null)
            {
                return NotFound();
            }

            _context.ActiviteCompagnes.Remove(activiteCompagne);
            await _context.SaveChangesAsync();

            return activiteCompagne;
        }

        private bool ActiviteCompagneExists(int id)
        {
            return _context.ActiviteCompagnes.Any(e => e.Id == id);
        }
    }
}
