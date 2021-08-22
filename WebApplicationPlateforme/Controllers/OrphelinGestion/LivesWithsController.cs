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
    public class LivesWithsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public LivesWithsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/LivesWiths
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LivesWith>>> GetLivesWiths()
        {
            return await _context.LivesWiths.ToListAsync();
        }

        // GET: api/LivesWiths/5
        [HttpGet("{id}")]
        public async Task<ActionResult<LivesWith>> GetLivesWith(int id)
        {
            var livesWith = await _context.LivesWiths.FindAsync(id);

            if (livesWith == null)
            {
                return NotFound();
            }

            return livesWith;
        }

        // PUT: api/LivesWiths/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLivesWith(int id, LivesWith livesWith)
        {
            if (id != livesWith.Id)
            {
                return BadRequest();
            }

            _context.Entry(livesWith).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LivesWithExists(id))
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

        // POST: api/LivesWiths
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<LivesWith>> PostLivesWith(LivesWith livesWith)
        {
            _context.LivesWiths.Add(livesWith);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLivesWith", new { id = livesWith.Id }, livesWith);
        }

        // DELETE: api/LivesWiths/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<LivesWith>> DeleteLivesWith(int id)
        {
            var livesWith = await _context.LivesWiths.FindAsync(id);
            if (livesWith == null)
            {
                return NotFound();
            }

            _context.LivesWiths.Remove(livesWith);
            await _context.SaveChangesAsync();

            return livesWith;
        }

        private bool LivesWithExists(int id)
        {
            return _context.LivesWiths.Any(e => e.Id == id);
        }
    }
}
