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
    public class ParenteOrphelinsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public ParenteOrphelinsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/ParenteOrphelins
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ParenteOrphelin>>> GetParenteOrphelins()
        {
            return await _context.ParenteOrphelins.ToListAsync();
        }

        // GET: api/ParenteOrphelins/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ParenteOrphelin>> GetParenteOrphelin(int id)
        {
            var parenteOrphelin = await _context.ParenteOrphelins.FindAsync(id);

            if (parenteOrphelin == null)
            {
                return NotFound();
            }

            return parenteOrphelin;
        }

        // PUT: api/ParenteOrphelins/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutParenteOrphelin(int id, ParenteOrphelin parenteOrphelin)
        {
            if (id != parenteOrphelin.Id)
            {
                return BadRequest();
            }

            _context.Entry(parenteOrphelin).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ParenteOrphelinExists(id))
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

        // POST: api/ParenteOrphelins
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ParenteOrphelin>> PostParenteOrphelin(ParenteOrphelin parenteOrphelin)
        {
            _context.ParenteOrphelins.Add(parenteOrphelin);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetParenteOrphelin", new { id = parenteOrphelin.Id }, parenteOrphelin);
        }

        // DELETE: api/ParenteOrphelins/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ParenteOrphelin>> DeleteParenteOrphelin(int id)
        {
            var parenteOrphelin = await _context.ParenteOrphelins.FindAsync(id);
            if (parenteOrphelin == null)
            {
                return NotFound();
            }

            _context.ParenteOrphelins.Remove(parenteOrphelin);
            await _context.SaveChangesAsync();

            return parenteOrphelin;
        }

        private bool ParenteOrphelinExists(int id)
        {
            return _context.ParenteOrphelins.Any(e => e.Id == id);
        }
    }
}
