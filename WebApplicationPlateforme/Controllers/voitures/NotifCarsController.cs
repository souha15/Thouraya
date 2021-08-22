using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.voitures;

namespace WebApplicationPlateforme.Controllers.voitures
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotifCarsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public NotifCarsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/NotifCars
        [HttpGet]
        public async Task<ActionResult<IEnumerable<NotifCars>>> GetnotifCars()
        {
            return await _context.notifCars.ToListAsync();
        }

        // GET: api/NotifCars/5
        [HttpGet("{id}")]
        public async Task<ActionResult<NotifCars>> GetNotifCars(int id)
        {
            var notifCars = await _context.notifCars.FindAsync(id);

            if (notifCars == null)
            {
                return NotFound();
            }

            return notifCars;
        }

        // PUT: api/NotifCars/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNotifCars(int id, NotifCars notifCars)
        {
            if (id != notifCars.Id)
            {
                return BadRequest();
            }

            _context.Entry(notifCars).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NotifCarsExists(id))
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

        // POST: api/NotifCars
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<NotifCars>> PostNotifCars(NotifCars notifCars)
        {
            _context.notifCars.Add(notifCars);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetNotifCars", new { id = notifCars.Id }, notifCars);
        }

        // DELETE: api/NotifCars/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<NotifCars>> DeleteNotifCars(int id)
        {
            var notifCars = await _context.notifCars.FindAsync(id);
            if (notifCars == null)
            {
                return NotFound();
            }

            _context.notifCars.Remove(notifCars);
            await _context.SaveChangesAsync();

            return notifCars;
        }

        private bool NotifCarsExists(int id)
        {
            return _context.notifCars.Any(e => e.Id == id);
        }
    }
}
