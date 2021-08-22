using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Orphelin;

namespace WebApplicationPlateforme.Controllers.OrphelinGestion
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrganismeOrphelinsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public OrganismeOrphelinsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/OrganismeOrphelins
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrganismeOrphelin>>> GetOrganismeOrphelins()
        {
            return await _context.OrganismeOrphelins.ToListAsync();
        }

        // GET: api/OrganismeOrphelins/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OrganismeOrphelin>> GetOrganismeOrphelin(int id)
        {
            var organismeOrphelin = await _context.OrganismeOrphelins.FindAsync(id);

            if (organismeOrphelin == null)
            {
                return NotFound();
            }

            return organismeOrphelin;
        }

        // PUT: api/OrganismeOrphelins/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrganismeOrphelin(int id, OrganismeOrphelin organismeOrphelin)
        {
            if (id != organismeOrphelin.Id)
            {
                return BadRequest();
            }

            _context.Entry(organismeOrphelin).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrganismeOrphelinExists(id))
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

        // POST: api/OrganismeOrphelins
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<OrganismeOrphelin>> PostOrganismeOrphelin(OrganismeOrphelin organismeOrphelin)
        {
            _context.OrganismeOrphelins.Add(organismeOrphelin);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrganismeOrphelin", new { id = organismeOrphelin.Id }, organismeOrphelin);
        }

        // DELETE: api/OrganismeOrphelins/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<OrganismeOrphelin>> DeleteOrganismeOrphelin(int id)
        {
            var organismeOrphelin = await _context.OrganismeOrphelins.FindAsync(id);
            if (organismeOrphelin == null)
            {
                return NotFound();
            }

            _context.OrganismeOrphelins.Remove(organismeOrphelin);
            await _context.SaveChangesAsync();

            return organismeOrphelin;
        }

        private bool OrganismeOrphelinExists(int id)
        {
            return _context.OrganismeOrphelins.Any(e => e.Id == id);
        }
    }
}
