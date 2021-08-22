using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Orphelin;

namespace WebApplicationPlateforme.Controllers.OrphelinGestion
{
    [Route("api/[controller]")]
    [ApiController]
    public class EducationOrphelinsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public EducationOrphelinsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/EducationOrphelins
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EducationOrphelin>>> GetEducationOrphelins()
        {
            return await _context.EducationOrphelins.ToListAsync();
        }

        // GET: api/EducationOrphelins/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EducationOrphelin>> GetEducationOrphelin(int id)
        {
            var educationOrphelin = await _context.EducationOrphelins.FindAsync(id);

            if (educationOrphelin == null)
            {
                return NotFound();
            }

            return educationOrphelin;
        }

        // PUT: api/EducationOrphelins/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEducationOrphelin(int id, EducationOrphelin educationOrphelin)
        {
            if (id != educationOrphelin.Id)
            {
                return BadRequest();
            }

            _context.Entry(educationOrphelin).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EducationOrphelinExists(id))
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

        // POST: api/EducationOrphelins
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<EducationOrphelin>> PostEducationOrphelin(EducationOrphelin educationOrphelin)
        {
            _context.EducationOrphelins.Add(educationOrphelin);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEducationOrphelin", new { id = educationOrphelin.Id }, educationOrphelin);
        }

        // DELETE: api/EducationOrphelins/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<EducationOrphelin>> DeleteEducationOrphelin(int id)
        {
            var educationOrphelin = await _context.EducationOrphelins.FindAsync(id);
            if (educationOrphelin == null)
            {
                return NotFound();
            }

            _context.EducationOrphelins.Remove(educationOrphelin);
            await _context.SaveChangesAsync();

            return educationOrphelin;
        }

        private bool EducationOrphelinExists(int id)
        {
            return _context.EducationOrphelins.Any(e => e.Id == id);
        }
    }
}
