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
    public class etatUnitesController : ControllerBase
    {
        private readonly FinanceContext _context;

        public etatUnitesController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/etatUnites
        [HttpGet]
        public async Task<ActionResult<IEnumerable<etatUnite>>> GetetatUnites()
        {
            return await _context.etatUnites.ToListAsync();
        }

        // GET: api/etatUnites/5
        [HttpGet("{id}")]
        public async Task<ActionResult<etatUnite>> GetetatUnite(int id)
        {
            var etatUnite = await _context.etatUnites.FindAsync(id);

            if (etatUnite == null)
            {
                return NotFound();
            }

            return etatUnite;
        }

        // PUT: api/etatUnites/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutetatUnite(int id, etatUnite etatUnite)
        {
            if (id != etatUnite.Id)
            {
                return BadRequest();
            }

            _context.Entry(etatUnite).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!etatUniteExists(id))
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

        // POST: api/etatUnites
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<etatUnite>> PostetatUnite(etatUnite etatUnite)
        {
            _context.etatUnites.Add(etatUnite);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetetatUnite", new { id = etatUnite.Id }, etatUnite);
        }

        // DELETE: api/etatUnites/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<etatUnite>> DeleteetatUnite(int id)
        {
            var etatUnite = await _context.etatUnites.FindAsync(id);
            if (etatUnite == null)
            {
                return NotFound();
            }

            _context.etatUnites.Remove(etatUnite);
            await _context.SaveChangesAsync();

            return etatUnite;
        }

        private bool etatUniteExists(int id)
        {
            return _context.etatUnites.Any(e => e.Id == id);
        }
    }
}
