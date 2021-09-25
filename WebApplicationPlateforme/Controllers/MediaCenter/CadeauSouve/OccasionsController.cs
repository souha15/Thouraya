using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.MediaCenter.CadeauxSouvenirs;

namespace WebApplicationPlateforme.Controllers.MediaCenter.CadeauSouve
{
    [Route("api/[controller]")]
    [ApiController]
    public class OccasionsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public OccasionsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/Occasions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Occasion>>> GetOccasion()
        {
            return await _context.Occasion.ToListAsync();
        }

        // GET: api/Occasions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Occasion>> GetOccasion(int id)
        {
            var occasion = await _context.Occasion.FindAsync(id);

            if (occasion == null)
            {
                return NotFound();
            }

            return occasion;
        }

        // PUT: api/Occasions/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOccasion(int id, Occasion occasion)
        {
            if (id != occasion.Id)
            {
                return BadRequest();
            }

            _context.Entry(occasion).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OccasionExists(id))
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

        // POST: api/Occasions
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Occasion>> PostOccasion(Occasion occasion)
        {
            _context.Occasion.Add(occasion);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOccasion", new { id = occasion.Id }, occasion);
        }

        // DELETE: api/Occasions/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Occasion>> DeleteOccasion(int id)
        {
            var occasion = await _context.Occasion.FindAsync(id);
            if (occasion == null)
            {
                return NotFound();
            }

            _context.Occasion.Remove(occasion);
            await _context.SaveChangesAsync();

            return occasion;
        }

        private bool OccasionExists(int id)
        {
            return _context.Occasion.Any(e => e.Id == id);
        }
    }
}
