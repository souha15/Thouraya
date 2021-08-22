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
    public class CreationTravailDemandesController : ControllerBase
    {
        private readonly FinanceContext _context;

        public CreationTravailDemandesController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/CreationTravailDemandes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CreationTravailDemande>>> GetcreationTravailDemandes()
        {
            return await _context.creationTravailDemandes.ToListAsync();
        }

        // GET: api/CreationTravailDemandes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CreationTravailDemande>> GetCreationTravailDemande(int id)
        {
            var creationTravailDemande = await _context.creationTravailDemandes.FindAsync(id);

            if (creationTravailDemande == null)
            {
                return NotFound();
            }

            return creationTravailDemande;
        }

        // PUT: api/CreationTravailDemandes/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCreationTravailDemande(int id, CreationTravailDemande creationTravailDemande)
        {
            if (id != creationTravailDemande.Id)
            {
                return BadRequest();
            }

            _context.Entry(creationTravailDemande).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CreationTravailDemandeExists(id))
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

        // POST: api/CreationTravailDemandes
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<CreationTravailDemande>> PostCreationTravailDemande(CreationTravailDemande creationTravailDemande)
        {
            _context.creationTravailDemandes.Add(creationTravailDemande);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCreationTravailDemande", new { id = creationTravailDemande.Id }, creationTravailDemande);
        }

        // DELETE: api/CreationTravailDemandes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<CreationTravailDemande>> DeleteCreationTravailDemande(int id)
        {
            var creationTravailDemande = await _context.creationTravailDemandes.FindAsync(id);
            if (creationTravailDemande == null)
            {
                return NotFound();
            }

            _context.creationTravailDemandes.Remove(creationTravailDemande);
            await _context.SaveChangesAsync();

            return creationTravailDemande;
        }

        private bool CreationTravailDemandeExists(int id)
        {
            return _context.creationTravailDemandes.Any(e => e.Id == id);
        }
    }
}
