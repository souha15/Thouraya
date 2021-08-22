using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.ServiceRh;

namespace WebApplicationPlateforme.Controllers.ServiceRh
{
    [Route("api/[controller]")]
    [ApiController]
    public class SupHeuresController : ControllerBase
    {
        private readonly FinanceContext _context;

        public SupHeuresController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/SupHeures
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SupHeure>>> GetsupHeures()
        {
            return await _context.supHeures.ToListAsync();
        }

        // GET: api/SupHeures/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SupHeure>> GetSupHeure(int id)
        {
            var supHeure = await _context.supHeures.FindAsync(id);

            if (supHeure == null)
            {
                return NotFound();
            }

            return supHeure;
        }

        // PUT: api/SupHeures/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSupHeure(int id, SupHeure supHeure)
        {
            if (id != supHeure.Id)
            {
                return BadRequest();
            }

            _context.Entry(supHeure).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SupHeureExists(id))
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

        // POST: api/SupHeures
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<SupHeure>> PostSupHeure(SupHeure supHeure)
        {
            _context.supHeures.Add(supHeure);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSupHeure", new { id = supHeure.Id }, supHeure);
        }

        // DELETE: api/SupHeures/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<SupHeure>> DeleteSupHeure(int id)
        {
            var supHeure = await _context.supHeures.FindAsync(id);
            if (supHeure == null)
            {
                return NotFound();
            }

            _context.supHeures.Remove(supHeure);
            await _context.SaveChangesAsync();

            return supHeure;
        }

        private bool SupHeureExists(int id)
        {
            return _context.supHeures.Any(e => e.Id == id);
        }
    }
}
