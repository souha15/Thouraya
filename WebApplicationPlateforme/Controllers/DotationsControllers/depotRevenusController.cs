using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Dotations;

namespace WebApplicationPlateforme.Controllers.DotationsControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class depotRevenusController : ControllerBase
    {
        private readonly FinanceContext _context;

        public depotRevenusController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/depotRevenus
        [HttpGet]
        public async Task<ActionResult<IEnumerable<depotRevenus>>> GetdepotRevenus()
        {
            return await _context.depotRevenus.ToListAsync();
        }

        // GET: api/depotRevenus/5
        [HttpGet("{id}")]
        public async Task<ActionResult<depotRevenus>> GetdepotRevenus(int id)
        {
            var depotRevenus = await _context.depotRevenus.FindAsync(id);

            if (depotRevenus == null)
            {
                return NotFound();
            }

            return depotRevenus;
        }

        // PUT: api/depotRevenus/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutdepotRevenus(int id, depotRevenus depotRevenus)
        {
            if (id != depotRevenus.Id)
            {
                return BadRequest();
            }

            _context.Entry(depotRevenus).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!depotRevenusExists(id))
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

        // POST: api/depotRevenus
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<depotRevenus>> PostdepotRevenus(depotRevenus depotRevenus)
        {
            _context.depotRevenus.Add(depotRevenus);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetdepotRevenus", new { id = depotRevenus.Id }, depotRevenus);
        }

        // DELETE: api/depotRevenus/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<depotRevenus>> DeletedepotRevenus(int id)
        {
            var depotRevenus = await _context.depotRevenus.FindAsync(id);
            if (depotRevenus == null)
            {
                return NotFound();
            }

            _context.depotRevenus.Remove(depotRevenus);
            await _context.SaveChangesAsync();

            return depotRevenus;
        }

        private bool depotRevenusExists(int id)
        {
            return _context.depotRevenus.Any(e => e.Id == id);
        }
    }
}
