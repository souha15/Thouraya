using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Ticket;

namespace WebApplicationPlateforme.Controllers.Tickets2
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotifTicket2Controller : ControllerBase
    {
        private readonly FinanceContext _context;

        public NotifTicket2Controller(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/NotifTicket2
        [HttpGet]
        public async Task<ActionResult<IEnumerable<NotifTicket2>>> GetNotifTickets()
        {
            return await _context.NotifTickets.ToListAsync();
        }

        // GET: api/NotifTicket2/5
        [HttpGet("{id}")]
        public async Task<ActionResult<NotifTicket2>> GetNotifTicket2(int id)
        {
            var notifTicket2 = await _context.NotifTickets.FindAsync(id);

            if (notifTicket2 == null)
            {
                return NotFound();
            }

            return notifTicket2;
        }

        // PUT: api/NotifTicket2/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNotifTicket2(int id, NotifTicket2 notifTicket2)
        {
            if (id != notifTicket2.Id)
            {
                return BadRequest();
            }

            _context.Entry(notifTicket2).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NotifTicket2Exists(id))
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

        // POST: api/NotifTicket2
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<NotifTicket2>> PostNotifTicket2(NotifTicket2 notifTicket2)
        {
            _context.NotifTickets.Add(notifTicket2);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetNotifTicket2", new { id = notifTicket2.Id }, notifTicket2);
        }

        // DELETE: api/NotifTicket2/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<NotifTicket2>> DeleteNotifTicket2(int id)
        {
            var notifTicket2 = await _context.NotifTickets.FindAsync(id);
            if (notifTicket2 == null)
            {
                return NotFound();
            }

            _context.NotifTickets.Remove(notifTicket2);
            await _context.SaveChangesAsync();

            return notifTicket2;
        }

        private bool NotifTicket2Exists(int id)
        {
            return _context.NotifTickets.Any(e => e.Id == id);
        }
    }
}
