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
    public class PsyOrphelinsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public PsyOrphelinsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/PsyOrphelins
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PsyOrphelin>>> GetPsyOrphelin()
        {
            return await _context.PsyOrphelin.ToListAsync();
        }

        // GET: api/PsyOrphelins/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PsyOrphelin>> GetPsyOrphelin(int id)
        {
            var psyOrphelin = await _context.PsyOrphelin.FindAsync(id);

            if (psyOrphelin == null)
            {
                return NotFound();
            }

            return psyOrphelin;
        }

        // PUT: api/PsyOrphelins/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPsyOrphelin(int id, PsyOrphelin psyOrphelin)
        {
            if (id != psyOrphelin.Id)
            {
                return BadRequest();
            }

            _context.Entry(psyOrphelin).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PsyOrphelinExists(id))
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

        // POST: api/PsyOrphelins
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<PsyOrphelin>> PostPsyOrphelin(PsyOrphelin psyOrphelin)
        {
            _context.PsyOrphelin.Add(psyOrphelin);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPsyOrphelin", new { id = psyOrphelin.Id }, psyOrphelin);
        }

        // DELETE: api/PsyOrphelins/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<PsyOrphelin>> DeletePsyOrphelin(int id)
        {
            var psyOrphelin = await _context.PsyOrphelin.FindAsync(id);
            if (psyOrphelin == null)
            {
                return NotFound();
            }

            _context.PsyOrphelin.Remove(psyOrphelin);
            await _context.SaveChangesAsync();

            return psyOrphelin;
        }

        private bool PsyOrphelinExists(int id)
        {
            return _context.PsyOrphelin.Any(e => e.Id == id);
        }
    }
}
