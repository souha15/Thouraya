using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.NouveauMusulman;

namespace WebApplicationPlateforme.Controllers.NvMusulman
{
    [Route("api/[controller]")]
    [ApiController]
    public class musulmenController : ControllerBase
    {
        private readonly FinanceContext _context;

        public musulmenController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/musulmen
        [HttpGet]
        public async Task<ActionResult<IEnumerable<musulman>>> Getmusulmans()
        {
            return await _context.musulmans.ToListAsync();
        }

        // GET: api/musulmen/5
        [HttpGet("{id}")]
        public async Task<ActionResult<musulman>> Getmusulman(int id)
        {
            var musulman = await _context.musulmans.FindAsync(id);

            if (musulman == null)
            {
                return NotFound();
            }

            return musulman;
        }

        // PUT: api/musulmen/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> Putmusulman(int id, musulman musulman)
        {
            if (id != musulman.Id)
            {
                return BadRequest();
            }

            _context.Entry(musulman).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!musulmanExists(id))
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

        // POST: api/musulmen
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<musulman>> Postmusulman(musulman musulman)
        {
            _context.musulmans.Add(musulman);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Getmusulman", new { id = musulman.Id }, musulman);
        }

        // DELETE: api/musulmen/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<musulman>> Deletemusulman(int id)
        {
            var musulman = await _context.musulmans.FindAsync(id);
            if (musulman == null)
            {
                return NotFound();
            }

            _context.musulmans.Remove(musulman);
            await _context.SaveChangesAsync();

            return musulman;
        }

        private bool musulmanExists(int id)
        {
            return _context.musulmans.Any(e => e.Id == id);
        }
    }
}
