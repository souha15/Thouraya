using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.AdministrativeCommunication;

namespace WebApplicationPlateforme.Controllers.CommunicationAdministrative
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrganismesController : ControllerBase
    {
        private readonly FinanceContext _context;

        public OrganismesController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/Organismes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Organisme>>> Getorganismes()
        {
            return await _context.organismes.ToListAsync();
        }

        // GET: api/Organismes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Organisme>> GetOrganisme(int id)
        {
            var organisme = await _context.organismes.FindAsync(id);

            if (organisme == null)
            {
                return NotFound();
            }

            return organisme;
        }

        // PUT: api/Organismes/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrganisme(int id, Organisme organisme)
        {
            if (id != organisme.Id)
            {
                return BadRequest();
            }

            _context.Entry(organisme).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrganismeExists(id))
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

        // POST: api/Organismes
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Organisme>> PostOrganisme(Organisme organisme)
        {
            _context.organismes.Add(organisme);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrganisme", new { id = organisme.Id }, organisme);
        }

        // DELETE: api/Organismes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Organisme>> DeleteOrganisme(int id)
        {
            var organisme = await _context.organismes.FindAsync(id);
            if (organisme == null)
            {
                return NotFound();
            }

            _context.organismes.Remove(organisme);
            await _context.SaveChangesAsync();

            return organisme;
        }

        private bool OrganismeExists(int id)
        {
            return _context.organismes.Any(e => e.Id == id);
        }
    }
}
