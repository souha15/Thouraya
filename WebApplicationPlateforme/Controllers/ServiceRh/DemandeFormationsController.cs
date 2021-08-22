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
    public class DemandeFormationsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public DemandeFormationsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/DemandeFormations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DemandeFormation>>> GetdemandeFormations()
        {
            return await _context.demandeFormations.ToListAsync();
        }

        // GET: api/DemandeFormations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DemandeFormation>> GetDemandeFormation(int id)
        {
            var demandeFormation = await _context.demandeFormations.FindAsync(id);

            if (demandeFormation == null)
            {
                return NotFound();
            }

            return demandeFormation;
        }

        // PUT: api/DemandeFormations/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDemandeFormation(int id, DemandeFormation demandeFormation)
        {
            if (id != demandeFormation.Id)
            {
                return BadRequest();
            }

            _context.Entry(demandeFormation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DemandeFormationExists(id))
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

        // POST: api/DemandeFormations
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<DemandeFormation>> PostDemandeFormation(DemandeFormation demandeFormation)
        {
            _context.demandeFormations.Add(demandeFormation);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDemandeFormation", new { id = demandeFormation.Id }, demandeFormation);
        }

        // DELETE: api/DemandeFormations/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<DemandeFormation>> DeleteDemandeFormation(int id)
        {
            var demandeFormation = await _context.demandeFormations.FindAsync(id);
            if (demandeFormation == null)
            {
                return NotFound();
            }

            _context.demandeFormations.Remove(demandeFormation);
            await _context.SaveChangesAsync();

            return demandeFormation;
        }

        private bool DemandeFormationExists(int id)
        {
            return _context.demandeFormations.Any(e => e.Id == id);
        }
    }
}
