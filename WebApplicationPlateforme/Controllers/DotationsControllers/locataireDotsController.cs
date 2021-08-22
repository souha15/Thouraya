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
    public class locataireDotsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public locataireDotsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/locataireDots
        [HttpGet]
        public async Task<ActionResult<IEnumerable<locataireDot>>> GetlocataireDot()
        {
            return await _context.locataireDot.ToListAsync();
        }

        // GET: api/locataireDots/5
        [HttpGet("{id}")]
        public async Task<ActionResult<locataireDot>> GetlocataireDot(int id)
        {
            var locataireDot = await _context.locataireDot.FindAsync(id);

            if (locataireDot == null)
            {
                return NotFound();
            }

            return locataireDot;
        }

        // PUT: api/locataireDots/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutlocataireDot(int id, locataireDot locataireDot)
        {
            if (id != locataireDot.Id)
            {
                return BadRequest();
            }

            _context.Entry(locataireDot).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!locataireDotExists(id))
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

        // POST: api/locataireDots
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<locataireDot>> PostlocataireDot(locataireDot locataireDot)
        {
            _context.locataireDot.Add(locataireDot);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetlocataireDot", new { id = locataireDot.Id }, locataireDot);
        }

        // DELETE: api/locataireDots/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<locataireDot>> DeletelocataireDot(int id)
        {
            var locataireDot = await _context.locataireDot.FindAsync(id);
            if (locataireDot == null)
            {
                return NotFound();
            }

            _context.locataireDot.Remove(locataireDot);
            await _context.SaveChangesAsync();

            return locataireDot;
        }

        private bool locataireDotExists(int id)
        {
            return _context.locataireDot.Any(e => e.Id == id);
        }
    }
}
