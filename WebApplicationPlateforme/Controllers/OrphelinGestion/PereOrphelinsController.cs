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
    public class PereOrphelinsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public PereOrphelinsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/PereOrphelins
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PereOrphelin>>> GetPereOrphelins()
        {
            return await _context.PereOrphelins.ToListAsync();
        }

        // GET: api/PereOrphelins/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PereOrphelin>> GetPereOrphelin(int id)
        {
            var pereOrphelin = await _context.PereOrphelins.FindAsync(id);

            if (pereOrphelin == null)
            {
                return NotFound();
            }

            return pereOrphelin;
        }

        // PUT: api/PereOrphelins/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPereOrphelin(int id, PereOrphelin pereOrphelin)
        {
            if (id != pereOrphelin.Id)
            {
                return BadRequest();
            }

            _context.Entry(pereOrphelin).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PereOrphelinExists(id))
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

        // POST: api/PereOrphelins
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<PereOrphelin>> PostPereOrphelin(PereOrphelin pereOrphelin)
        {
            _context.PereOrphelins.Add(pereOrphelin);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPereOrphelin", new { id = pereOrphelin.Id }, pereOrphelin);
        }

        // DELETE: api/PereOrphelins/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<PereOrphelin>> DeletePereOrphelin(int id)
        {
            var pereOrphelin = await _context.PereOrphelins.FindAsync(id);
            if (pereOrphelin == null)
            {
                return NotFound();
            }

            _context.PereOrphelins.Remove(pereOrphelin);
            await _context.SaveChangesAsync();

            return pereOrphelin;
        }

        private bool PereOrphelinExists(int id)
        {
            return _context.PereOrphelins.Any(e => e.Id == id);
        }
    }
}
