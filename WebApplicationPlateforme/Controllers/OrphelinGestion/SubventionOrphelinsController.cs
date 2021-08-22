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
    public class SubventionOrphelinsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public SubventionOrphelinsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/SubventionOrphelins
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SubventionOrphelin>>> GetSubventionOrphelins()
        {
            return await _context.SubventionOrphelins.ToListAsync();
        }

        // GET: api/SubventionOrphelins/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SubventionOrphelin>> GetSubventionOrphelin(int id)
        {
            var subventionOrphelin = await _context.SubventionOrphelins.FindAsync(id);

            if (subventionOrphelin == null)
            {
                return NotFound();
            }

            return subventionOrphelin;
        }

        // PUT: api/SubventionOrphelins/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSubventionOrphelin(int id, SubventionOrphelin subventionOrphelin)
        {
            if (id != subventionOrphelin.Id)
            {
                return BadRequest();
            }

            _context.Entry(subventionOrphelin).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SubventionOrphelinExists(id))
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

        // POST: api/SubventionOrphelins
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<SubventionOrphelin>> PostSubventionOrphelin(SubventionOrphelin subventionOrphelin)
        {
            _context.SubventionOrphelins.Add(subventionOrphelin);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSubventionOrphelin", new { id = subventionOrphelin.Id }, subventionOrphelin);
        }

        // DELETE: api/SubventionOrphelins/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<SubventionOrphelin>> DeleteSubventionOrphelin(int id)
        {
            var subventionOrphelin = await _context.SubventionOrphelins.FindAsync(id);
            if (subventionOrphelin == null)
            {
                return NotFound();
            }

            _context.SubventionOrphelins.Remove(subventionOrphelin);
            await _context.SaveChangesAsync();

            return subventionOrphelin;
        }

        private bool SubventionOrphelinExists(int id)
        {
            return _context.SubventionOrphelins.Any(e => e.Id == id);
        }
    }
}
