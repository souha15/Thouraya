using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Taches;

namespace WebApplicationPlateforme.Controllers.TachesControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotiftachesController : ControllerBase
    {
        private readonly FinanceContext _context;

        public NotiftachesController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/Notiftaches
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Notiftache>>> Getnotiftaches()
        {
            return await _context.notiftaches.ToListAsync();
        }

        // GET: api/Notiftaches/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Notiftache>> GetNotiftache(int id)
        {
            var notiftache = await _context.notiftaches.FindAsync(id);

            if (notiftache == null)
            {
                return NotFound();
            }

            return notiftache;
        }

        // PUT: api/Notiftaches/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNotiftache(int id, Notiftache notiftache)
        {
            if (id != notiftache.Id)
            {
                return BadRequest();
            }

            _context.Entry(notiftache).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NotiftacheExists(id))
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

        // POST: api/Notiftaches
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Notiftache>> PostNotiftache(Notiftache notiftache)
        {
            _context.notiftaches.Add(notiftache);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetNotiftache", new { id = notiftache.Id }, notiftache);
        }

        // DELETE: api/Notiftaches/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Notiftache>> DeleteNotiftache(int id)
        {
            var notiftache = await _context.notiftaches.FindAsync(id);
            if (notiftache == null)
            {
                return NotFound();
            }

            _context.notiftaches.Remove(notiftache);
            await _context.SaveChangesAsync();

            return notiftache;
        }

        private bool NotiftacheExists(int id)
        {
            return _context.notiftaches.Any(e => e.Id == id);
        }
    }
}
