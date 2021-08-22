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
    public class agenceImmobsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public agenceImmobsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/agenceImmobs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<agenceImmob>>> GetagenceImmobs()
        {
            return await _context.agenceImmobs.ToListAsync();
        }

        // GET: api/agenceImmobs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<agenceImmob>> GetagenceImmob(int id)
        {
            var agenceImmob = await _context.agenceImmobs.FindAsync(id);

            if (agenceImmob == null)
            {
                return NotFound();
            }

            return agenceImmob;
        }

        // PUT: api/agenceImmobs/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutagenceImmob(int id, agenceImmob agenceImmob)
        {
            if (id != agenceImmob.Id)
            {
                return BadRequest();
            }

            _context.Entry(agenceImmob).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!agenceImmobExists(id))
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

        // POST: api/agenceImmobs
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<agenceImmob>> PostagenceImmob(agenceImmob agenceImmob)
        {
            _context.agenceImmobs.Add(agenceImmob);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetagenceImmob", new { id = agenceImmob.Id }, agenceImmob);
        }

        // DELETE: api/agenceImmobs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<agenceImmob>> DeleteagenceImmob(int id)
        {
            var agenceImmob = await _context.agenceImmobs.FindAsync(id);
            if (agenceImmob == null)
            {
                return NotFound();
            }

            _context.agenceImmobs.Remove(agenceImmob);
            await _context.SaveChangesAsync();

            return agenceImmob;
        }

        private bool agenceImmobExists(int id)
        {
            return _context.agenceImmobs.Any(e => e.Id == id);
        }
    }
}
