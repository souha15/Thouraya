using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.ActivitePart;

namespace WebApplicationPlateforme.Controllers.NewControllersForDawa
{
    [Route("api/[controller]")]
    [ApiController]
    public class TypeActiviteesController : ControllerBase
    {
        private readonly DawaaContext _context;

        public TypeActiviteesController(DawaaContext context)
        {
            _context = context;
        }

        // GET: api/TypeActivitees
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TypeActivitee>>> GetTypeActivitee()
        {
            return await _context.TypeActivitee.ToListAsync();
        }

        // GET: api/TypeActivitees/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TypeActivitee>> GetTypeActivitee(int id)
        {
            var typeActivitee = await _context.TypeActivitee.FindAsync(id);

            if (typeActivitee == null)
            {
                return NotFound();
            }

            return typeActivitee;
        }

        // PUT: api/TypeActivitees/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTypeActivitee(int id, TypeActivitee typeActivitee)
        {
            if (id != typeActivitee.Id)
            {
                return BadRequest();
            }

            _context.Entry(typeActivitee).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TypeActiviteeExists(id))
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

        // POST: api/TypeActivitees
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<TypeActivitee>> PostTypeActivitee(TypeActivitee typeActivitee)
        {
            _context.TypeActivitee.Add(typeActivitee);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTypeActivitee", new { id = typeActivitee.Id }, typeActivitee);
        }

        // DELETE: api/TypeActivitees/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TypeActivitee>> DeleteTypeActivitee(int id)
        {
            var typeActivitee = await _context.TypeActivitee.FindAsync(id);
            if (typeActivitee == null)
            {
                return NotFound();
            }

            _context.TypeActivitee.Remove(typeActivitee);
            await _context.SaveChangesAsync();

            return typeActivitee;
        }

        private bool TypeActiviteeExists(int id)
        {
            return _context.TypeActivitee.Any(e => e.Id == id);
        }
    }
}
