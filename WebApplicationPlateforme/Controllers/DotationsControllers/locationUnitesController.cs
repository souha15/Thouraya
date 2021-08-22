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
    public class locationUnitesController : ControllerBase
    {
        private readonly FinanceContext _context;

        public locationUnitesController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/locationUnites
        [HttpGet]
        public async Task<ActionResult<IEnumerable<locationUnite>>> GetlocationUnites()
        {
            return await _context.locationUnites.ToListAsync();
        }

        // GET: api/locationUnites/5
        [HttpGet("{id}")]
        public async Task<ActionResult<locationUnite>> GetlocationUnite(int id)
        {
            var locationUnite = await _context.locationUnites.FindAsync(id);

            if (locationUnite == null)
            {
                return NotFound();
            }

            return locationUnite;
        }

        // PUT: api/locationUnites/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutlocationUnite(int id, locationUnite locationUnite)
        {
            if (id != locationUnite.Id)
            {
                return BadRequest();
            }

            _context.Entry(locationUnite).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!locationUniteExists(id))
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

        // POST: api/locationUnites
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<locationUnite>> PostlocationUnite(locationUnite locationUnite)
        {
            _context.locationUnites.Add(locationUnite);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetlocationUnite", new { id = locationUnite.Id }, locationUnite);
        }

        // DELETE: api/locationUnites/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<locationUnite>> DeletelocationUnite(int id)
        {
            var locationUnite = await _context.locationUnites.FindAsync(id);
            if (locationUnite == null)
            {
                return NotFound();
            }

            _context.locationUnites.Remove(locationUnite);
            await _context.SaveChangesAsync();

            return locationUnite;
        }

        private bool locationUniteExists(int id)
        {
            return _context.locationUnites.Any(e => e.Id == id);
        }
    }
}
