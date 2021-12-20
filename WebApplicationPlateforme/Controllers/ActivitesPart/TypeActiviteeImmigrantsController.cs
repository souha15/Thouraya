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
    public class TypeActiviteeImmigrantsController : ControllerBase
    {
        private readonly DawaaContext _context;

        public TypeActiviteeImmigrantsController(DawaaContext context)
        {
            _context = context;
        }

        // GET: api/TypeActiviteeImmigrants
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TypeActiviteeImmigrant>>> GetTypeActiviteeImmigrants()
        {
            return await _context.TypeActiviteeImmigrants.ToListAsync();
        }

        // GET: api/TypeActiviteeImmigrants/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TypeActiviteeImmigrant>> GetTypeActiviteeImmigrant(int id)
        {
            var typeActiviteeImmigrant = await _context.TypeActiviteeImmigrants.FindAsync(id);

            if (typeActiviteeImmigrant == null)
            {
                return NotFound();
            }

            return typeActiviteeImmigrant;
        }

        // PUT: api/TypeActiviteeImmigrants/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTypeActiviteeImmigrant(int id, TypeActiviteeImmigrant typeActiviteeImmigrant)
        {
            if (id != typeActiviteeImmigrant.Id)
            {
                return BadRequest();
            }

            _context.Entry(typeActiviteeImmigrant).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TypeActiviteeImmigrantExists(id))
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

        // POST: api/TypeActiviteeImmigrants
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<TypeActiviteeImmigrant>> PostTypeActiviteeImmigrant(TypeActiviteeImmigrant typeActiviteeImmigrant)
        {
            _context.TypeActiviteeImmigrants.Add(typeActiviteeImmigrant);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTypeActiviteeImmigrant", new { id = typeActiviteeImmigrant.Id }, typeActiviteeImmigrant);
        }

        // DELETE: api/TypeActiviteeImmigrants/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TypeActiviteeImmigrant>> DeleteTypeActiviteeImmigrant(int id)
        {
            var typeActiviteeImmigrant = await _context.TypeActiviteeImmigrants.FindAsync(id);
            if (typeActiviteeImmigrant == null)
            {
                return NotFound();
            }

            _context.TypeActiviteeImmigrants.Remove(typeActiviteeImmigrant);
            await _context.SaveChangesAsync();

            return typeActiviteeImmigrant;
        }

        private bool TypeActiviteeImmigrantExists(int id)
        {
            return _context.TypeActiviteeImmigrants.Any(e => e.Id == id);
        }
    }
}
