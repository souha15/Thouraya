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
    public class TypeActiviteEducationsController : ControllerBase
    {
        private readonly DawaaContext _context;

        public TypeActiviteEducationsController(DawaaContext context)
        {
            _context = context;
        }

        // GET: api/TypeActiviteEducations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TypeActiviteEducation>>> GetTypeActiviteEducation()
        {
            return await _context.TypeActiviteEducation.ToListAsync();
        }

        // GET: api/TypeActiviteEducations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TypeActiviteEducation>> GetTypeActiviteEducation(int id)
        {
            var typeActiviteEducation = await _context.TypeActiviteEducation.FindAsync(id);

            if (typeActiviteEducation == null)
            {
                return NotFound();
            }

            return typeActiviteEducation;
        }

        // PUT: api/TypeActiviteEducations/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTypeActiviteEducation(int id, TypeActiviteEducation typeActiviteEducation)
        {
            if (id != typeActiviteEducation.Id)
            {
                return BadRequest();
            }

            _context.Entry(typeActiviteEducation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TypeActiviteEducationExists(id))
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

        // POST: api/TypeActiviteEducations
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<TypeActiviteEducation>> PostTypeActiviteEducation(TypeActiviteEducation typeActiviteEducation)
        {
            _context.TypeActiviteEducation.Add(typeActiviteEducation);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTypeActiviteEducation", new { id = typeActiviteEducation.Id }, typeActiviteEducation);
        }

        // DELETE: api/TypeActiviteEducations/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TypeActiviteEducation>> DeleteTypeActiviteEducation(int id)
        {
            var typeActiviteEducation = await _context.TypeActiviteEducation.FindAsync(id);
            if (typeActiviteEducation == null)
            {
                return NotFound();
            }

            _context.TypeActiviteEducation.Remove(typeActiviteEducation);
            await _context.SaveChangesAsync();

            return typeActiviteEducation;
        }

        private bool TypeActiviteEducationExists(int id)
        {
            return _context.TypeActiviteEducation.Any(e => e.Id == id);
        }
    }
}
