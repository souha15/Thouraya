using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.gestion_beneficiaire;

namespace WebApplicationPlateforme.Controllers.GestBen
{
    [Route("api/[controller]")]
    [ApiController]
    public class RevenusBensController : ControllerBase
    {
        private readonly FinanceContext _context;

        public RevenusBensController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/RevenusBens
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RevenusBen>>> GetrevenusBens()
        {
            return await _context.revenusBens.ToListAsync();
        }

        // GET: api/RevenusBens/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RevenusBen>> GetRevenusBen(int id)
        {
            var revenusBen = await _context.revenusBens.FindAsync(id);

            if (revenusBen == null)
            {
                return NotFound();
            }

            return revenusBen;
        }

        // PUT: api/RevenusBens/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRevenusBen(int id, RevenusBen revenusBen)
        {
            if (id != revenusBen.Id)
            {
                return BadRequest();
            }

            _context.Entry(revenusBen).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RevenusBenExists(id))
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

        // POST: api/RevenusBens
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<RevenusBen>> PostRevenusBen(RevenusBen revenusBen)
        {
            _context.revenusBens.Add(revenusBen);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRevenusBen", new { id = revenusBen.Id }, revenusBen);
        }

        // DELETE: api/RevenusBens/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<RevenusBen>> DeleteRevenusBen(int id)
        {
            var revenusBen = await _context.revenusBens.FindAsync(id);
            if (revenusBen == null)
            {
                return NotFound();
            }

            _context.revenusBens.Remove(revenusBen);
            await _context.SaveChangesAsync();

            return revenusBen;
        }

        private bool RevenusBenExists(int id)
        {
            return _context.revenusBens.Any(e => e.Id == id);
        }
    }
}
