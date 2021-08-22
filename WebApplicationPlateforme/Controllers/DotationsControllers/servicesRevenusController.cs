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
    public class servicesRevenusController : ControllerBase
    {
        private readonly FinanceContext _context;

        public servicesRevenusController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/servicesRevenus
        [HttpGet]
        public async Task<ActionResult<IEnumerable<servicesRevenus>>> GetservicesRevenus()
        {
            return await _context.servicesRevenus.ToListAsync();
        }

        // GET: api/servicesRevenus/5
        [HttpGet("{id}")]
        public async Task<ActionResult<servicesRevenus>> GetservicesRevenus(int id)
        {
            var servicesRevenus = await _context.servicesRevenus.FindAsync(id);

            if (servicesRevenus == null)
            {
                return NotFound();
            }

            return servicesRevenus;
        }

        // PUT: api/servicesRevenus/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutservicesRevenus(int id, servicesRevenus servicesRevenus)
        {
            if (id != servicesRevenus.Id)
            {
                return BadRequest();
            }

            _context.Entry(servicesRevenus).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!servicesRevenusExists(id))
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

        // POST: api/servicesRevenus
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<servicesRevenus>> PostservicesRevenus(servicesRevenus servicesRevenus)
        {
            _context.servicesRevenus.Add(servicesRevenus);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetservicesRevenus", new { id = servicesRevenus.Id }, servicesRevenus);
        }

        // DELETE: api/servicesRevenus/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<servicesRevenus>> DeleteservicesRevenus(int id)
        {
            var servicesRevenus = await _context.servicesRevenus.FindAsync(id);
            if (servicesRevenus == null)
            {
                return NotFound();
            }

            _context.servicesRevenus.Remove(servicesRevenus);
            await _context.SaveChangesAsync();

            return servicesRevenus;
        }

        private bool servicesRevenusExists(int id)
        {
            return _context.servicesRevenus.Any(e => e.Id == id);
        }
    }
}
