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
    public class DemandeAvancesController : ControllerBase
    {
        private readonly FinanceContext _context;

        public DemandeAvancesController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/DemandeAvances
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DemandeAvance>>> GetdemandeAvances()
        {
            return await _context.demandeAvances.ToListAsync();
        }

        // GET: api/DemandeAvances/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DemandeAvance>> GetDemandeAvance(int id)
        {
            var demandeAvance = await _context.demandeAvances.FindAsync(id);

            if (demandeAvance == null)
            {
                return NotFound();
            }

            return demandeAvance;
        }

        // PUT: api/DemandeAvances/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDemandeAvance(int id, DemandeAvance demandeAvance)
        {
            if (id != demandeAvance.Id)
            {
                return BadRequest();
            }

            _context.Entry(demandeAvance).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DemandeAvanceExists(id))
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

        // POST: api/DemandeAvances
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<DemandeAvance>> PostDemandeAvance(DemandeAvance demandeAvance)
        {
            _context.demandeAvances.Add(demandeAvance);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDemandeAvance", new { id = demandeAvance.Id }, demandeAvance);
        }

        // DELETE: api/DemandeAvances/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<DemandeAvance>> DeleteDemandeAvance(int id)
        {
            var demandeAvance = await _context.demandeAvances.FindAsync(id);
            if (demandeAvance == null)
            {
                return NotFound();
            }

            _context.demandeAvances.Remove(demandeAvance);
            await _context.SaveChangesAsync();

            return demandeAvance;
        }

        private bool DemandeAvanceExists(int id)
        {
            return _context.demandeAvances.Any(e => e.Id == id);
        }
    }
}
