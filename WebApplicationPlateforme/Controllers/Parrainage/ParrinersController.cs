using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Parrainage;

namespace WebApplicationPlateforme.Controllers.Parrainage
{
    [Route("api/[controller]")]
    [ApiController]
    public class ParrinersController : ControllerBase
    {
        private readonly FinanceContext _context;

        public ParrinersController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/Parriners
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Parriner>>> GetParriners()
        {
            return await _context.Parriners.ToListAsync();
        }

        // GET: api/Parriners/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Parriner>> GetParriner(int id)
        {
            var parriner = await _context.Parriners.FindAsync(id);

            if (parriner == null)
            {
                return NotFound();
            }

            return parriner;
        }

        // PUT: api/Parriners/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutParriner(int id, Parriner parriner)
        {
            if (id != parriner.Id)
            {
                return BadRequest();
            }

            _context.Entry(parriner).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ParrinerExists(id))
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

        // POST: api/Parriners
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Parriner>> PostParriner(Parriner parriner)
        {
            _context.Parriners.Add(parriner);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetParriner", new { id = parriner.Id }, parriner);
        }

        // DELETE: api/Parriners/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Parriner>> DeleteParriner(int id)
        {
            var parriner = await _context.Parriners.FindAsync(id);
            if (parriner == null)
            {
                return NotFound();
            }

            _context.Parriners.Remove(parriner);
            await _context.SaveChangesAsync();

            return parriner;
        }

        private bool ParrinerExists(int id)
        {
            return _context.Parriners.Any(e => e.Id == id);
        }
    }
}
