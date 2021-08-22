using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Projets;

namespace WebApplicationPlateforme.Controllers.ProjetControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrganismeSuppsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public OrganismeSuppsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/OrganismeSupps
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrganismeSupp>>> GetorganismeSupps()
        {
            return await _context.organismeSupps.ToListAsync();
        }

        // GET: api/OrganismeSupps/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OrganismeSupp>> GetOrganismeSupp(int id)
        {
            var organismeSupp = await _context.organismeSupps.FindAsync(id);

            if (organismeSupp == null)
            {
                return NotFound();
            }

            return organismeSupp;
        }

        // PUT: api/OrganismeSupps/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrganismeSupp(int id, OrganismeSupp organismeSupp)
        {
            if (id != organismeSupp.Id)
            {
                return BadRequest();
            }

            _context.Entry(organismeSupp).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrganismeSuppExists(id))
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

        // POST: api/OrganismeSupps
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<OrganismeSupp>> PostOrganismeSupp(OrganismeSupp organismeSupp)
        {
            _context.organismeSupps.Add(organismeSupp);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrganismeSupp", new { id = organismeSupp.Id }, organismeSupp);
        }

        // DELETE: api/OrganismeSupps/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<OrganismeSupp>> DeleteOrganismeSupp(int id)
        {
            var organismeSupp = await _context.organismeSupps.FindAsync(id);
            if (organismeSupp == null)
            {
                return NotFound();
            }

            _context.organismeSupps.Remove(organismeSupp);
            await _context.SaveChangesAsync();

            return organismeSupp;
        }

        private bool OrganismeSuppExists(int id)
        {
            return _context.organismeSupps.Any(e => e.Id == id);
        }
    }
}
