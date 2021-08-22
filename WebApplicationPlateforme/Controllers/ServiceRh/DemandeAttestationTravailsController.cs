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
    public class DemandeAttestationTravailsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public DemandeAttestationTravailsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/DemandeAttestationTravails
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DemandeAttestationTravail>>> GetdemandeAttestationTravails()
        {
            return await _context.demandeAttestationTravails.ToListAsync();
        }

        // GET: api/DemandeAttestationTravails/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DemandeAttestationTravail>> GetDemandeAttestationTravail(int id)
        {
            var demandeAttestationTravail = await _context.demandeAttestationTravails.FindAsync(id);

            if (demandeAttestationTravail == null)
            {
                return NotFound();
            }

            return demandeAttestationTravail;
        }

        // PUT: api/DemandeAttestationTravails/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDemandeAttestationTravail(int id, DemandeAttestationTravail demandeAttestationTravail)
        {
            if (id != demandeAttestationTravail.Id)
            {
                return BadRequest();
            }

            _context.Entry(demandeAttestationTravail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DemandeAttestationTravailExists(id))
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

        // POST: api/DemandeAttestationTravails
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<DemandeAttestationTravail>> PostDemandeAttestationTravail(DemandeAttestationTravail demandeAttestationTravail)
        {
            _context.demandeAttestationTravails.Add(demandeAttestationTravail);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDemandeAttestationTravail", new { id = demandeAttestationTravail.Id }, demandeAttestationTravail);
        }

        // DELETE: api/DemandeAttestationTravails/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<DemandeAttestationTravail>> DeleteDemandeAttestationTravail(int id)
        {
            var demandeAttestationTravail = await _context.demandeAttestationTravails.FindAsync(id);
            if (demandeAttestationTravail == null)
            {
                return NotFound();
            }

            _context.demandeAttestationTravails.Remove(demandeAttestationTravail);
            await _context.SaveChangesAsync();

            return demandeAttestationTravail;
        }

        private bool DemandeAttestationTravailExists(int id)
        {
            return _context.demandeAttestationTravails.Any(e => e.Id == id);
        }
    }
}
