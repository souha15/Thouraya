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
    public class FinanceOrphelinsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public FinanceOrphelinsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/FinanceOrphelins
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FinanceOrphelin>>> GetFinanceOrphelins()
        {
            return await _context.FinanceOrphelins.ToListAsync();
        }

        // GET: api/FinanceOrphelins/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FinanceOrphelin>> GetFinanceOrphelin(int id)
        {
            var financeOrphelin = await _context.FinanceOrphelins.FindAsync(id);

            if (financeOrphelin == null)
            {
                return NotFound();
            }

            return financeOrphelin;
        }

        // PUT: api/FinanceOrphelins/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFinanceOrphelin(int id, FinanceOrphelin financeOrphelin)
        {
            if (id != financeOrphelin.Id)
            {
                return BadRequest();
            }

            _context.Entry(financeOrphelin).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FinanceOrphelinExists(id))
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

        // POST: api/FinanceOrphelins
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<FinanceOrphelin>> PostFinanceOrphelin(FinanceOrphelin financeOrphelin)
        {
            _context.FinanceOrphelins.Add(financeOrphelin);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFinanceOrphelin", new { id = financeOrphelin.Id }, financeOrphelin);
        }

        // DELETE: api/FinanceOrphelins/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<FinanceOrphelin>> DeleteFinanceOrphelin(int id)
        {
            var financeOrphelin = await _context.FinanceOrphelins.FindAsync(id);
            if (financeOrphelin == null)
            {
                return NotFound();
            }

            _context.FinanceOrphelins.Remove(financeOrphelin);
            await _context.SaveChangesAsync();

            return financeOrphelin;
        }

        private bool FinanceOrphelinExists(int id)
        {
            return _context.FinanceOrphelins.Any(e => e.Id == id);
        }
    }
}
