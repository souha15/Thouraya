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
    public class ActiviteeImmigrantsController : ControllerBase
    {
        private readonly DawaaContext _context;

        public ActiviteeImmigrantsController(DawaaContext context)
        {
            _context = context;
        }

        // GET: api/ActiviteeImmigrants
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ActiviteeImmigrant>>> GetActiviteeImmigrants()
        {
            return await _context.ActiviteeImmigrants.ToListAsync();
        }

        // GET: api/ActiviteeImmigrants/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ActiviteeImmigrant>> GetActiviteeImmigrant(int id)
        {
            var activiteeImmigrant = await _context.ActiviteeImmigrants.FindAsync(id);

            if (activiteeImmigrant == null)
            {
                return NotFound();
            }

            return activiteeImmigrant;
        }

        // PUT: api/ActiviteeImmigrants/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutActiviteeImmigrant(int id, ActiviteeImmigrant activiteeImmigrant)
        {
            if (id != activiteeImmigrant.Id)
            {
                return BadRequest();
            }

            _context.Entry(activiteeImmigrant).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ActiviteeImmigrantExists(id))
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

        // POST: api/ActiviteeImmigrants
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ActiviteeImmigrant>> PostActiviteeImmigrant(ActiviteeImmigrant activiteeImmigrant)
        {
            _context.ActiviteeImmigrants.Add(activiteeImmigrant);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetActiviteeImmigrant", new { id = activiteeImmigrant.Id }, activiteeImmigrant);
        }

        // DELETE: api/ActiviteeImmigrants/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ActiviteeImmigrant>> DeleteActiviteeImmigrant(int id)
        {
            var activiteeImmigrant = await _context.ActiviteeImmigrants.FindAsync(id);
            if (activiteeImmigrant == null)
            {
                return NotFound();
            }

            _context.ActiviteeImmigrants.Remove(activiteeImmigrant);
            await _context.SaveChangesAsync();

            return activiteeImmigrant;
        }

        private bool ActiviteeImmigrantExists(int id)
        {
            return _context.ActiviteeImmigrants.Any(e => e.Id == id);
        }
    }
}
