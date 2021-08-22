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
    public class unitesController : ControllerBase
    {
        private readonly FinanceContext _context;

        public unitesController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/unites
        [HttpGet]
        public async Task<ActionResult<IEnumerable<unite>>> Getunites()
        {
            return await _context.unites.ToListAsync();
        }

        // GET: api/unites/5
        [HttpGet("{id}")]
        public async Task<ActionResult<unite>> Getunite(int id)
        {
            var unite = await _context.unites.FindAsync(id);

            if (unite == null)
            {
                return NotFound();
            }

            return unite;
        }

        // PUT: api/unites/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> Putunite(int id, unite unite)
        {
            if (id != unite.Id)
            {
                return BadRequest();
            }

            _context.Entry(unite).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!uniteExists(id))
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

        // POST: api/unites
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<unite>> Postunite(unite unite)
        {
            _context.unites.Add(unite);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Getunite", new { id = unite.Id }, unite);
        }

        // DELETE: api/unites/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<unite>> Deleteunite(int id)
        {
            var unite = await _context.unites.FindAsync(id);
            if (unite == null)
            {
                return NotFound();
            }

            _context.unites.Remove(unite);
            await _context.SaveChangesAsync();

            return unite;
        }

        private bool uniteExists(int id)
        {
            return _context.unites.Any(e => e.Id == id);
        }
    }
}
