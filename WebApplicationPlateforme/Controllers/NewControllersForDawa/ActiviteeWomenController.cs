using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.ActivitePart;

namespace WebApplicationPlateforme.Controllers.NewControllersForDawa
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActiviteeWomenController : ControllerBase
    {
        private readonly DawaaContext _context;

        public ActiviteeWomenController(DawaaContext context)
        {
            _context = context;
        }

        // GET: api/ActiviteeWomen
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ActiviteeWomen>>> GetActiviteeWomens()
        {
            return await _context.ActiviteeWomens.ToListAsync();
        }

        // GET: api/ActiviteeWomen/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ActiviteeWomen>> GetActiviteeWomen(int id)
        {
            var activiteeWomen = await _context.ActiviteeWomens.FindAsync(id);

            if (activiteeWomen == null)
            {
                return NotFound();
            }

            return activiteeWomen;
        }

        // PUT: api/ActiviteeWomen/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutActiviteeWomen(int id, ActiviteeWomen activiteeWomen)
        {
            if (id != activiteeWomen.Id)
            {
                return BadRequest();
            }

            _context.Entry(activiteeWomen).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ActiviteeWomenExists(id))
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

        // POST: api/ActiviteeWomen
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ActiviteeWomen>> PostActiviteeWomen(ActiviteeWomen activiteeWomen)
        {
            _context.ActiviteeWomens.Add(activiteeWomen);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetActiviteeWomen", new { id = activiteeWomen.Id }, activiteeWomen);
        }

        // DELETE: api/ActiviteeWomen/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ActiviteeWomen>> DeleteActiviteeWomen(int id)
        {
            var activiteeWomen = await _context.ActiviteeWomens.FindAsync(id);
            if (activiteeWomen == null)
            {
                return NotFound();
            }

            _context.ActiviteeWomens.Remove(activiteeWomen);
            await _context.SaveChangesAsync();

            return activiteeWomen;
        }

        private bool ActiviteeWomenExists(int id)
        {
            return _context.ActiviteeWomens.Any(e => e.Id == id);
        }
    }
}
