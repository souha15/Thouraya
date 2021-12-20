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
    public class TypeActiviteDawasController : ControllerBase
    {
        private readonly DawaaContext _context;

        public TypeActiviteDawasController(DawaaContext context)
        {
            _context = context;
        }

        // GET: api/TypeActiviteDawas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TypeActiviteDawa>>> GetTypeActiviteDawas()
        {
            return await _context.TypeActiviteDawas.ToListAsync();
        }

        // GET: api/TypeActiviteDawas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TypeActiviteDawa>> GetTypeActiviteDawa(int id)
        {
            var typeActiviteDawa = await _context.TypeActiviteDawas.FindAsync(id);

            if (typeActiviteDawa == null)
            {
                return NotFound();
            }

            return typeActiviteDawa;
        }

        // PUT: api/TypeActiviteDawas/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTypeActiviteDawa(int id, TypeActiviteDawa typeActiviteDawa)
        {
            if (id != typeActiviteDawa.Id)
            {
                return BadRequest();
            }

            _context.Entry(typeActiviteDawa).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TypeActiviteDawaExists(id))
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

        // POST: api/TypeActiviteDawas
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<TypeActiviteDawa>> PostTypeActiviteDawa(TypeActiviteDawa typeActiviteDawa)
        {
            _context.TypeActiviteDawas.Add(typeActiviteDawa);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTypeActiviteDawa", new { id = typeActiviteDawa.Id }, typeActiviteDawa);
        }

        // DELETE: api/TypeActiviteDawas/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TypeActiviteDawa>> DeleteTypeActiviteDawa(int id)
        {
            var typeActiviteDawa = await _context.TypeActiviteDawas.FindAsync(id);
            if (typeActiviteDawa == null)
            {
                return NotFound();
            }

            _context.TypeActiviteDawas.Remove(typeActiviteDawa);
            await _context.SaveChangesAsync();

            return typeActiviteDawa;
        }

        private bool TypeActiviteDawaExists(int id)
        {
            return _context.TypeActiviteDawas.Any(e => e.Id == id);
        }
    }
}
