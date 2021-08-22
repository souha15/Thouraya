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
    public class revenusController : ControllerBase
    {
        private readonly FinanceContext _context;

        public revenusController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/revenus
        [HttpGet]
        public async Task<ActionResult<IEnumerable<revenus>>> Getrevenus()
        {
            return await _context.revenus.ToListAsync();
        }

        // GET: api/revenus/5
        [HttpGet("{id}")]
        public async Task<ActionResult<revenus>> Getrevenus(int id)
        {
            var revenus = await _context.revenus.FindAsync(id);

            if (revenus == null)
            {
                return NotFound();
            }

            return revenus;
        }

        // PUT: api/revenus/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> Putrevenus(int id, revenus revenus)
        {
            if (id != revenus.Id)
            {
                return BadRequest();
            }

            _context.Entry(revenus).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!revenusExists(id))
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

        // POST: api/revenus
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<revenus>> Postrevenus(revenus revenus)
        {
            _context.revenus.Add(revenus);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Getrevenus", new { id = revenus.Id }, revenus);
        }

        // DELETE: api/revenus/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<revenus>> Deleterevenus(int id)
        {
            var revenus = await _context.revenus.FindAsync(id);
            if (revenus == null)
            {
                return NotFound();
            }

            _context.revenus.Remove(revenus);
            await _context.SaveChangesAsync();

            return revenus;
        }

        private bool revenusExists(int id)
        {
            return _context.revenus.Any(e => e.Id == id);
        }
    }
}
