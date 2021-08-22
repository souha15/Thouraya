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
    public class OrphelinsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public OrphelinsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/Orphelins
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Orphelin>>> GetOrphelins()
        {
            return await _context.Orphelins.ToListAsync();
        }

        // GET: api/Orphelins/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Orphelin>> GetOrphelin(int id)
        {
            var orphelin = await _context.Orphelins.FindAsync(id);

            if (orphelin == null)
            {
                return NotFound();
            }

            return orphelin;
        }

        // PUT: api/Orphelins/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrphelin(int id, Orphelin orphelin)
        {
            if (id != orphelin.Id)
            {
                return BadRequest();
            }

            _context.Entry(orphelin).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrphelinExists(id))
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

        // POST: api/Orphelins
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Orphelin>> PostOrphelin(Orphelin orphelin)
        {
            _context.Orphelins.Add(orphelin);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrphelin", new { id = orphelin.Id }, orphelin);
        }

        // DELETE: api/Orphelins/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Orphelin>> DeleteOrphelin(int id)
        {
            var orphelin = await _context.Orphelins.FindAsync(id);
            if (orphelin == null)
            {
                return NotFound();
            }

            _context.Orphelins.Remove(orphelin);
            await _context.SaveChangesAsync();

            return orphelin;
        }

        private bool OrphelinExists(int id)
        {
            return _context.Orphelins.Any(e => e.Id == id);
        }
    }
}
