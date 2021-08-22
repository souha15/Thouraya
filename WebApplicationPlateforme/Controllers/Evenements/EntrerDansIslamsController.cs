using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Evenements;

namespace WebApplicationPlateforme.Controllers.Evenements
{
    [Route("api/[controller]")]
    [ApiController]
    public class EntrerDansIslamsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public EntrerDansIslamsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/EntrerDansIslams
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EntrerDansIslam>>> GetentrerDansIslams()
        {
            return await _context.entrerDansIslams.ToListAsync();
        }

        // GET: api/EntrerDansIslams/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EntrerDansIslam>> GetEntrerDansIslam(int id)
        {
            var entrerDansIslam = await _context.entrerDansIslams.FindAsync(id);

            if (entrerDansIslam == null)
            {
                return NotFound();
            }

            return entrerDansIslam;
        }

        // PUT: api/EntrerDansIslams/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEntrerDansIslam(int id, EntrerDansIslam entrerDansIslam)
        {
            if (id != entrerDansIslam.Id)
            {
                return BadRequest();
            }

            _context.Entry(entrerDansIslam).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EntrerDansIslamExists(id))
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

        // POST: api/EntrerDansIslams
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<EntrerDansIslam>> PostEntrerDansIslam(EntrerDansIslam entrerDansIslam)
        {
            _context.entrerDansIslams.Add(entrerDansIslam);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEntrerDansIslam", new { id = entrerDansIslam.Id }, entrerDansIslam);
        }

        // DELETE: api/EntrerDansIslams/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<EntrerDansIslam>> DeleteEntrerDansIslam(int id)
        {
            var entrerDansIslam = await _context.entrerDansIslams.FindAsync(id);
            if (entrerDansIslam == null)
            {
                return NotFound();
            }

            _context.entrerDansIslams.Remove(entrerDansIslam);
            await _context.SaveChangesAsync();

            return entrerDansIslam;
        }

        private bool EntrerDansIslamExists(int id)
        {
            return _context.entrerDansIslams.Any(e => e.Id == id);
        }
    }
}
