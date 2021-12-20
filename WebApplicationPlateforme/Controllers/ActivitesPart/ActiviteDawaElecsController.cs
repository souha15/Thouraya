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
    public class ActiviteDawaElecsController : ControllerBase
    {
        private readonly DawaaContext _context;

        public ActiviteDawaElecsController(DawaaContext context)
        {
            _context = context;
        }

        // GET: api/ActiviteDawaElecs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ActiviteDawaElec>>> GetActiviteDawaElecs()
        {
            return await _context.ActiviteDawaElecs.ToListAsync();
        }

        // GET: api/ActiviteDawaElecs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ActiviteDawaElec>> GetActiviteDawaElec(int id)
        {
            var activiteDawaElec = await _context.ActiviteDawaElecs.FindAsync(id);

            if (activiteDawaElec == null)
            {
                return NotFound();
            }

            return activiteDawaElec;
        }

        // PUT: api/ActiviteDawaElecs/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutActiviteDawaElec(int id, ActiviteDawaElec activiteDawaElec)
        {
            if (id != activiteDawaElec.Id)
            {
                return BadRequest();
            }

            _context.Entry(activiteDawaElec).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ActiviteDawaElecExists(id))
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

        // POST: api/ActiviteDawaElecs
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ActiviteDawaElec>> PostActiviteDawaElec(ActiviteDawaElec activiteDawaElec)
        {
            _context.ActiviteDawaElecs.Add(activiteDawaElec);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetActiviteDawaElec", new { id = activiteDawaElec.Id }, activiteDawaElec);
        }

        // DELETE: api/ActiviteDawaElecs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ActiviteDawaElec>> DeleteActiviteDawaElec(int id)
        {
            var activiteDawaElec = await _context.ActiviteDawaElecs.FindAsync(id);
            if (activiteDawaElec == null)
            {
                return NotFound();
            }

            _context.ActiviteDawaElecs.Remove(activiteDawaElec);
            await _context.SaveChangesAsync();

            return activiteDawaElec;
        }

        private bool ActiviteDawaElecExists(int id)
        {
            return _context.ActiviteDawaElecs.Any(e => e.Id == id);
        }
    }
}
