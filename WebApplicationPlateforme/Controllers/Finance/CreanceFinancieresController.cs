using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Finance;

namespace WebApplicationPlateforme.Controllers.Finance
{
    [Route("api/[controller]")]
    [ApiController]
    public class CreanceFinancieresController : ControllerBase
    {
        private readonly FinanceContext _context;

        public CreanceFinancieresController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/CreanceFinancieres
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CreanceFinanciere>>> GetcreanceFinancieres()
        {
            return await _context.creanceFinancieres.ToListAsync();
        }

        // GET: api/CreanceFinancieres/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CreanceFinanciere>> GetCreanceFinanciere(int id)
        {
            var creanceFinanciere = await _context.creanceFinancieres.FindAsync(id);

            if (creanceFinanciere == null)
            {
                return NotFound();
            }

            return creanceFinanciere;
        }

        // PUT: api/CreanceFinancieres/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCreanceFinanciere(int id, CreanceFinanciere creanceFinanciere)
        {
            if (id != creanceFinanciere.Id)
            {
                return BadRequest();
            }

            _context.Entry(creanceFinanciere).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CreanceFinanciereExists(id))
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

        // POST: api/CreanceFinancieres
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<CreanceFinanciere>> PostCreanceFinanciere(CreanceFinanciere creanceFinanciere)
        {
            _context.creanceFinancieres.Add(creanceFinanciere);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCreanceFinanciere", new { id = creanceFinanciere.Id }, creanceFinanciere);
        }

        // DELETE: api/CreanceFinancieres/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<CreanceFinanciere>> DeleteCreanceFinanciere(int id)
        {
            var creanceFinanciere = await _context.creanceFinancieres.FindAsync(id);
            if (creanceFinanciere == null)
            {
                return NotFound();
            }

            _context.creanceFinancieres.Remove(creanceFinanciere);
            await _context.SaveChangesAsync();

            return creanceFinanciere;
        }

        private bool CreanceFinanciereExists(int id)
        {
            return _context.creanceFinancieres.Any(e => e.Id == id);
        }
    }
}
