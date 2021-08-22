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
    public class DemandeSupHeuresController : ControllerBase
    {
        private readonly FinanceContext _context;

        public DemandeSupHeuresController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/DemandeSupHeures
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DemandeSupHeure>>> GetdemandeSupHeures()
        {
            return await _context.demandeSupHeures.ToListAsync();
        }

        // GET: api/DemandeSupHeures/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DemandeSupHeure>> GetDemandeSupHeure(int id)
        {
            var demandeSupHeure = await _context.demandeSupHeures.FindAsync(id);

            if (demandeSupHeure == null)
            {
                return NotFound();
            }

            return demandeSupHeure;
        }

        // PUT: api/DemandeSupHeures/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDemandeSupHeure(int id, DemandeSupHeure demandeSupHeure)
        {
            if (id != demandeSupHeure.Id)
            {
                return BadRequest();
            }

            _context.Entry(demandeSupHeure).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DemandeSupHeureExists(id))
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

        // POST: api/DemandeSupHeures
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<DemandeSupHeure>> PostDemandeSupHeure(DemandeSupHeure demandeSupHeure)
        {
            _context.demandeSupHeures.Add(demandeSupHeure);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDemandeSupHeure", new { id = demandeSupHeure.Id }, demandeSupHeure);
        }

        // DELETE: api/DemandeSupHeures/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<DemandeSupHeure>> DeleteDemandeSupHeure(int id)
        {
            var demandeSupHeure = await _context.demandeSupHeures.FindAsync(id);
            if (demandeSupHeure == null)
            {
                return NotFound();
            }

            _context.demandeSupHeures.Remove(demandeSupHeure);
            await _context.SaveChangesAsync();

            return demandeSupHeure;
        }

        private bool DemandeSupHeureExists(int id)
        {
            return _context.demandeSupHeures.Any(e => e.Id == id);
        }
    }
}
