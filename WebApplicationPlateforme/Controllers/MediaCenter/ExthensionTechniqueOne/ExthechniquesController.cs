using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.MediaCenter.ExtensionTechnique;

namespace WebApplicationPlateforme.Controllers.MediaCenter.ExthensionTechniqueOne
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExthechniquesController : ControllerBase
    {
        private readonly FinanceContext _context;

        public ExthechniquesController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/Exthechniques
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Exthechnique>>> GetExthechnique()
        {
            return await _context.Exthechnique.ToListAsync();
        }

        // GET: api/Exthechniques/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Exthechnique>> GetExthechnique(int id)
        {
            var exthechnique = await _context.Exthechnique.FindAsync(id);

            if (exthechnique == null)
            {
                return NotFound();
            }

            return exthechnique;
        }

        // PUT: api/Exthechniques/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutExthechnique(int id, Exthechnique exthechnique)
        {
            if (id != exthechnique.Id)
            {
                return BadRequest();
            }

            _context.Entry(exthechnique).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ExthechniqueExists(id))
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

        // POST: api/Exthechniques
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Exthechnique>> PostExthechnique(Exthechnique exthechnique)
        {
            _context.Exthechnique.Add(exthechnique);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetExthechnique", new { id = exthechnique.Id }, exthechnique);
        }

        // DELETE: api/Exthechniques/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Exthechnique>> DeleteExthechnique(int id)
        {
            var exthechnique = await _context.Exthechnique.FindAsync(id);
            if (exthechnique == null)
            {
                return NotFound();
            }

            _context.Exthechnique.Remove(exthechnique);
            await _context.SaveChangesAsync();

            return exthechnique;
        }

        private bool ExthechniqueExists(int id)
        {
            return _context.Exthechnique.Any(e => e.Id == id);
        }
    }
}
