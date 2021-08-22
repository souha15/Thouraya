using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.voitures;

namespace WebApplicationPlateforme.Controllers.voitures
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrganismeVoituresController : ControllerBase
    {
        private readonly FinanceContext _context;

        public OrganismeVoituresController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/OrganismeVoitures
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrganismeVoiture>>> GetorganismeVoitures()
        {
            return await _context.organismeVoitures.ToListAsync();
        }

        // GET: api/OrganismeVoitures/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OrganismeVoiture>> GetOrganismeVoiture(int id)
        {
            var organismeVoiture = await _context.organismeVoitures.FindAsync(id);

            if (organismeVoiture == null)
            {
                return NotFound();
            }

            return organismeVoiture;
        }

        // PUT: api/OrganismeVoitures/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrganismeVoiture(int id, OrganismeVoiture organismeVoiture)
        {
            if (id != organismeVoiture.Id)
            {
                return BadRequest();
            }

            _context.Entry(organismeVoiture).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrganismeVoitureExists(id))
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

        // POST: api/OrganismeVoitures
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<OrganismeVoiture>> PostOrganismeVoiture(OrganismeVoiture organismeVoiture)
        {
            _context.organismeVoitures.Add(organismeVoiture);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrganismeVoiture", new { id = organismeVoiture.Id }, organismeVoiture);
        }

        // DELETE: api/OrganismeVoitures/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<OrganismeVoiture>> DeleteOrganismeVoiture(int id)
        {
            var organismeVoiture = await _context.organismeVoitures.FindAsync(id);
            if (organismeVoiture == null)
            {
                return NotFound();
            }

            _context.organismeVoitures.Remove(organismeVoiture);
            await _context.SaveChangesAsync();

            return organismeVoiture;
        }

        private bool OrganismeVoitureExists(int id)
        {
            return _context.organismeVoitures.Any(e => e.Id == id);
        }
    }
}
