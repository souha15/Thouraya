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
    public class contratLocationsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public contratLocationsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/contratLocations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<contratLocation>>> GetcontratLocations()
        {
            return await _context.contratLocations.ToListAsync();
        }

        // GET: api/contratLocations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<contratLocation>> GetcontratLocation(int id)
        {
            var contratLocation = await _context.contratLocations.FindAsync(id);

            if (contratLocation == null)
            {
                return NotFound();
            }

            return contratLocation;
        }

        // PUT: api/contratLocations/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutcontratLocation(int id, contratLocation contratLocation)
        {
            if (id != contratLocation.Id)
            {
                return BadRequest();
            }

            _context.Entry(contratLocation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!contratLocationExists(id))
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

        // POST: api/contratLocations
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<contratLocation>> PostcontratLocation(contratLocation contratLocation)
        {
            _context.contratLocations.Add(contratLocation);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetcontratLocation", new { id = contratLocation.Id }, contratLocation);
        }

        // DELETE: api/contratLocations/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<contratLocation>> DeletecontratLocation(int id)
        {
            var contratLocation = await _context.contratLocations.FindAsync(id);
            if (contratLocation == null)
            {
                return NotFound();
            }

            _context.contratLocations.Remove(contratLocation);
            await _context.SaveChangesAsync();

            return contratLocation;
        }

        private bool contratLocationExists(int id)
        {
            return _context.contratLocations.Any(e => e.Id == id);
        }
    }
}
