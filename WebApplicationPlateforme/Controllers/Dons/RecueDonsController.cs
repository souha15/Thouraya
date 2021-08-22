using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Dons;

namespace WebApplicationPlateforme.Controllers.Dons
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecueDonsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public RecueDonsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/RecueDons
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RecueDons>>> GetrecueDons()
        {
            return await _context.recueDons.ToListAsync();
        }

        // GET: api/RecueDons/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RecueDons>> GetRecueDons(int id)
        {
            var recueDons = await _context.recueDons.FindAsync(id);

            if (recueDons == null)
            {
                return NotFound();
            }

            return recueDons;
        }

        // PUT: api/RecueDons/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRecueDons(int id, RecueDons recueDons)
        {
            if (id != recueDons.Id)
            {
                return BadRequest();
            }

            _context.Entry(recueDons).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RecueDonsExists(id))
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

        // POST: api/RecueDons
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<RecueDons>> PostRecueDons(RecueDons recueDons)
        {
            _context.recueDons.Add(recueDons);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRecueDons", new { id = recueDons.Id }, recueDons);
        }

        // DELETE: api/RecueDons/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<RecueDons>> DeleteRecueDons(int id)
        {
            var recueDons = await _context.recueDons.FindAsync(id);
            if (recueDons == null)
            {
                return NotFound();
            }

            _context.recueDons.Remove(recueDons);
            await _context.SaveChangesAsync();

            return recueDons;
        }

        private bool RecueDonsExists(int id)
        {
            return _context.recueDons.Any(e => e.Id == id);
        }
    }
}
