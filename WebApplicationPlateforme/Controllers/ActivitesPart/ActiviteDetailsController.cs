using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.ActivitePart;

namespace WebApplicationPlateforme.Controllers.ActivitesPart
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActiviteDetailsController : ControllerBase
    {
        private readonly DawaaContext _context;

        public ActiviteDetailsController(DawaaContext context)
        {
            _context = context;
        }

        // GET: api/ActiviteDetails
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ActiviteDetails>>> GetActiviteDetails()
        {
            return await _context.ActiviteDetails.ToListAsync();
        }

        // GET: api/ActiviteDetails/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ActiviteDetails>> GetActiviteDetails(int id)
        {
            var activiteDetails = await _context.ActiviteDetails.FindAsync(id);

            if (activiteDetails == null)
            {
                return NotFound();
            }

            return activiteDetails;
        }

        // PUT: api/ActiviteDetails/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutActiviteDetails(int id, ActiviteDetails activiteDetails)
        {
            if (id != activiteDetails.Id)
            {
                return BadRequest();
            }

            _context.Entry(activiteDetails).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ActiviteDetailsExists(id))
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

        // POST: api/ActiviteDetails
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ActiviteDetails>> PostActiviteDetails(ActiviteDetails activiteDetails)
        {
            _context.ActiviteDetails.Add(activiteDetails);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetActiviteDetails", new { id = activiteDetails.Id }, activiteDetails);
        }

        // DELETE: api/ActiviteDetails/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ActiviteDetails>> DeleteActiviteDetails(int id)
        {
            var activiteDetails = await _context.ActiviteDetails.FindAsync(id);
            if (activiteDetails == null)
            {
                return NotFound();
            }

            _context.ActiviteDetails.Remove(activiteDetails);
            await _context.SaveChangesAsync();

            return activiteDetails;
        }

        private bool ActiviteDetailsExists(int id)
        {
            return _context.ActiviteDetails.Any(e => e.Id == id);
        }
    }
}
