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
    public class TypeActiviteDawaaElecsController : ControllerBase
    {
        private readonly DawaaContext _context;

        public TypeActiviteDawaaElecsController(DawaaContext context)
        {
            _context = context;
        }

        // GET: api/TypeActiviteDawaaElecs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TypeActiviteDawaaElec>>> GetTypeActiviteDawaaElecs()
        {
            return await _context.TypeActiviteDawaaElecs.ToListAsync();
        }

        // GET: api/TypeActiviteDawaaElecs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TypeActiviteDawaaElec>> GetTypeActiviteDawaaElec(int id)
        {
            var typeActiviteDawaaElec = await _context.TypeActiviteDawaaElecs.FindAsync(id);

            if (typeActiviteDawaaElec == null)
            {
                return NotFound();
            }

            return typeActiviteDawaaElec;
        }

        // PUT: api/TypeActiviteDawaaElecs/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTypeActiviteDawaaElec(int id, TypeActiviteDawaaElec typeActiviteDawaaElec)
        {
            if (id != typeActiviteDawaaElec.Id)
            {
                return BadRequest();
            }

            _context.Entry(typeActiviteDawaaElec).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TypeActiviteDawaaElecExists(id))
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

        // POST: api/TypeActiviteDawaaElecs
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<TypeActiviteDawaaElec>> PostTypeActiviteDawaaElec(TypeActiviteDawaaElec typeActiviteDawaaElec)
        {
            _context.TypeActiviteDawaaElecs.Add(typeActiviteDawaaElec);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTypeActiviteDawaaElec", new { id = typeActiviteDawaaElec.Id }, typeActiviteDawaaElec);
        }

        // DELETE: api/TypeActiviteDawaaElecs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TypeActiviteDawaaElec>> DeleteTypeActiviteDawaaElec(int id)
        {
            var typeActiviteDawaaElec = await _context.TypeActiviteDawaaElecs.FindAsync(id);
            if (typeActiviteDawaaElec == null)
            {
                return NotFound();
            }

            _context.TypeActiviteDawaaElecs.Remove(typeActiviteDawaaElec);
            await _context.SaveChangesAsync();

            return typeActiviteDawaaElec;
        }

        private bool TypeActiviteDawaaElecExists(int id)
        {
            return _context.TypeActiviteDawaaElecs.Any(e => e.Id == id);
        }
    }
}
