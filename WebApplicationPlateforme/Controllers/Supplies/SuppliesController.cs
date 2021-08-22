using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Supplies;

namespace WebApplicationPlateforme.Controllers.Supplies
{
    [Route("api/[controller]")]
    [ApiController]
    public class SuppliesController : ControllerBase
    {
        private readonly FinanceContext _context;

        public SuppliesController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/Supplies
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Supplie>>> Getsupplies()
        {
            return await _context.supplies.ToListAsync();
        }

        // GET: api/Supplies/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Supplie>> GetSupplie(int id)
        {
            var supplie = await _context.supplies.FindAsync(id);

            if (supplie == null)
            {
                return NotFound();
            }

            return supplie;
        }

        // PUT: api/Supplies/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSupplie(int id, Supplie supplie)
        {
            if (id != supplie.Id)
            {
                return BadRequest();
            }

            _context.Entry(supplie).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SupplieExists(id))
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

        // POST: api/Supplies
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Supplie>> PostSupplie(Supplie supplie)
        {
            _context.supplies.Add(supplie);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSupplie", new { id = supplie.Id }, supplie);
        }

        // DELETE: api/Supplies/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Supplie>> DeleteSupplie(int id)
        {
            var supplie = await _context.supplies.FindAsync(id);
            if (supplie == null)
            {
                return NotFound();
            }

            _context.supplies.Remove(supplie);
            await _context.SaveChangesAsync();

            return supplie;
        }

        private bool SupplieExists(int id)
        {
            return _context.supplies.Any(e => e.Id == id);
        }
    }
}
