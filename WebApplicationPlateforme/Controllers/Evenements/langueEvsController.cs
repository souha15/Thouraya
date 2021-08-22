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
    public class langueEvsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public langueEvsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/langueEvs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<langueEv>>> GetlangueEvs()
        {
            return await _context.langueEvs.ToListAsync();
        }

        // GET: api/langueEvs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<langueEv>> GetlangueEv(int id)
        {
            var langueEv = await _context.langueEvs.FindAsync(id);

            if (langueEv == null)
            {
                return NotFound();
            }

            return langueEv;
        }

        // PUT: api/langueEvs/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutlangueEv(int id, langueEv langueEv)
        {
            if (id != langueEv.Id)
            {
                return BadRequest();
            }

            _context.Entry(langueEv).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!langueEvExists(id))
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

        // POST: api/langueEvs
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<langueEv>> PostlangueEv(langueEv langueEv)
        {
            _context.langueEvs.Add(langueEv);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetlangueEv", new { id = langueEv.Id }, langueEv);
        }

        // DELETE: api/langueEvs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<langueEv>> DeletelangueEv(int id)
        {
            var langueEv = await _context.langueEvs.FindAsync(id);
            if (langueEv == null)
            {
                return NotFound();
            }

            _context.langueEvs.Remove(langueEv);
            await _context.SaveChangesAsync();

            return langueEv;
        }

        private bool langueEvExists(int id)
        {
            return _context.langueEvs.Any(e => e.Id == id);
        }
    }
}
