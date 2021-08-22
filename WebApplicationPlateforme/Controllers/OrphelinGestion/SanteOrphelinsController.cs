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
    public class SanteOrphelinsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public SanteOrphelinsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/SanteOrphelins
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SanteOrphelin>>> GetSanteOrphelins()
        {
            return await _context.SanteOrphelins.ToListAsync();
        }

        // GET: api/SanteOrphelins/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SanteOrphelin>> GetSanteOrphelin(int id)
        {
            var santeOrphelin = await _context.SanteOrphelins.FindAsync(id);

            if (santeOrphelin == null)
            {
                return NotFound();
            }

            return santeOrphelin;
        }

        // PUT: api/SanteOrphelins/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSanteOrphelin(int id, SanteOrphelin santeOrphelin)
        {
            if (id != santeOrphelin.Id)
            {
                return BadRequest();
            }

            _context.Entry(santeOrphelin).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SanteOrphelinExists(id))
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

        // POST: api/SanteOrphelins
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<SanteOrphelin>> PostSanteOrphelin(SanteOrphelin santeOrphelin)
        {
            _context.SanteOrphelins.Add(santeOrphelin);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSanteOrphelin", new { id = santeOrphelin.Id }, santeOrphelin);
        }

        // DELETE: api/SanteOrphelins/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<SanteOrphelin>> DeleteSanteOrphelin(int id)
        {
            var santeOrphelin = await _context.SanteOrphelins.FindAsync(id);
            if (santeOrphelin == null)
            {
                return NotFound();
            }

            _context.SanteOrphelins.Remove(santeOrphelin);
            await _context.SaveChangesAsync();

            return santeOrphelin;
        }

        private bool SanteOrphelinExists(int id)
        {
            return _context.SanteOrphelins.Any(e => e.Id == id);
        }
    }
}
