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
    public class etatDotationsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public etatDotationsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/etatDotations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<etatDotation>>> GetetatDotations()
        {
            return await _context.etatDotations.ToListAsync();
        }

        // GET: api/etatDotations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<etatDotation>> GetetatDotation(int id)
        {
            var etatDotation = await _context.etatDotations.FindAsync(id);

            if (etatDotation == null)
            {
                return NotFound();
            }

            return etatDotation;
        }

        // PUT: api/etatDotations/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutetatDotation(int id, etatDotation etatDotation)
        {
            if (id != etatDotation.Id)
            {
                return BadRequest();
            }

            _context.Entry(etatDotation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!etatDotationExists(id))
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

        // POST: api/etatDotations
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<etatDotation>> PostetatDotation(etatDotation etatDotation)
        {
            _context.etatDotations.Add(etatDotation);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetetatDotation", new { id = etatDotation.Id }, etatDotation);
        }

        // DELETE: api/etatDotations/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<etatDotation>> DeleteetatDotation(int id)
        {
            var etatDotation = await _context.etatDotations.FindAsync(id);
            if (etatDotation == null)
            {
                return NotFound();
            }

            _context.etatDotations.Remove(etatDotation);
            await _context.SaveChangesAsync();

            return etatDotation;
        }

        private bool etatDotationExists(int id)
        {
            return _context.etatDotations.Any(e => e.Id == id);
        }
    }
}
