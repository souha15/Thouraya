using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Decision;

namespace WebApplicationPlateforme.Controllers.Decisions
{
    [Route("api/[controller]")]
    [ApiController]
    public class DecissionCommunsController : ControllerBase
    {
        private readonly DawaaContext _context;

        public DecissionCommunsController(DawaaContext context)
        {
            _context = context;
        }

        // GET: api/DecissionCommuns
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DecissionCommun>>> GetDecissionCommuns()
        {
            return await _context.DecissionCommuns.ToListAsync();
        }

        // GET: api/DecissionCommuns/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DecissionCommun>> GetDecissionCommun(int id)
        {
            var decissionCommun = await _context.DecissionCommuns.FindAsync(id);

            if (decissionCommun == null)
            {
                return NotFound();
            }

            return decissionCommun;
        }

        // PUT: api/DecissionCommuns/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDecissionCommun(int id, DecissionCommun decissionCommun)
        {
            if (id != decissionCommun.Id)
            {
                return BadRequest();
            }

            _context.Entry(decissionCommun).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DecissionCommunExists(id))
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

        // POST: api/DecissionCommuns
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<DecissionCommun>> PostDecissionCommun(DecissionCommun decissionCommun)
        {
            _context.DecissionCommuns.Add(decissionCommun);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDecissionCommun", new { id = decissionCommun.Id }, decissionCommun);
        }

        // DELETE: api/DecissionCommuns/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<DecissionCommun>> DeleteDecissionCommun(int id)
        {
            var decissionCommun = await _context.DecissionCommuns.FindAsync(id);
            if (decissionCommun == null)
            {
                return NotFound();
            }

            _context.DecissionCommuns.Remove(decissionCommun);
            await _context.SaveChangesAsync();

            return decissionCommun;
        }

        private bool DecissionCommunExists(int id)
        {
            return _context.DecissionCommuns.Any(e => e.Id == id);
        }
    }
}
