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
    public class DotationOrphelinsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public DotationOrphelinsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/DotationOrphelins
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DotationOrphelin>>> GetDotationOrphelins()
        {
            return await _context.DotationOrphelins.ToListAsync();
        }

        // GET: api/DotationOrphelins/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DotationOrphelin>> GetDotationOrphelin(int id)
        {
            var dotationOrphelin = await _context.DotationOrphelins.FindAsync(id);

            if (dotationOrphelin == null)
            {
                return NotFound();
            }

            return dotationOrphelin;
        }

        // PUT: api/DotationOrphelins/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDotationOrphelin(int id, DotationOrphelin dotationOrphelin)
        {
            if (id != dotationOrphelin.Id)
            {
                return BadRequest();
            }

            _context.Entry(dotationOrphelin).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DotationOrphelinExists(id))
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

        // POST: api/DotationOrphelins
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<DotationOrphelin>> PostDotationOrphelin(DotationOrphelin dotationOrphelin)
        {
            _context.DotationOrphelins.Add(dotationOrphelin);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDotationOrphelin", new { id = dotationOrphelin.Id }, dotationOrphelin);
        }

        // DELETE: api/DotationOrphelins/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<DotationOrphelin>> DeleteDotationOrphelin(int id)
        {
            var dotationOrphelin = await _context.DotationOrphelins.FindAsync(id);
            if (dotationOrphelin == null)
            {
                return NotFound();
            }

            _context.DotationOrphelins.Remove(dotationOrphelin);
            await _context.SaveChangesAsync();

            return dotationOrphelin;
        }

        private bool DotationOrphelinExists(int id)
        {
            return _context.DotationOrphelins.Any(e => e.Id == id);
        }
    }
}
