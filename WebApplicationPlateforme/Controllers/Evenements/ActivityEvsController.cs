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
    public class ActivityEvsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public ActivityEvsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/ActivityEvs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ActivityEv>>> GetactivityEvs()
        {
            return await _context.activityEvs.ToListAsync();
        }

        // GET: api/ActivityEvs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ActivityEv>> GetActivityEv(int id)
        {
            var activityEv = await _context.activityEvs.FindAsync(id);

            if (activityEv == null)
            {
                return NotFound();
            }

            return activityEv;
        }

        // PUT: api/ActivityEvs/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutActivityEv(int id, ActivityEv activityEv)
        {
            if (id != activityEv.Id)
            {
                return BadRequest();
            }

            _context.Entry(activityEv).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ActivityEvExists(id))
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

        // POST: api/ActivityEvs
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ActivityEv>> PostActivityEv(ActivityEv activityEv)
        {
            _context.activityEvs.Add(activityEv);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetActivityEv", new { id = activityEv.Id }, activityEv);
        }

        // DELETE: api/ActivityEvs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ActivityEv>> DeleteActivityEv(int id)
        {
            var activityEv = await _context.activityEvs.FindAsync(id);
            if (activityEv == null)
            {
                return NotFound();
            }

            _context.activityEvs.Remove(activityEv);
            await _context.SaveChangesAsync();

            return activityEv;
        }

        private bool ActivityEvExists(int id)
        {
            return _context.activityEvs.Any(e => e.Id == id);
        }
    }
}
