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
    public class Ticket2Controller : ControllerBase
    {
        private readonly FinanceContext _context;

        public Ticket2Controller(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/Ticket2
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Ticket2>>> GetTicket2s()
        {
            return await _context.Ticket2s.ToListAsync();
        }

        // GET: api/Ticket2/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Ticket2>> GetTicket2(int id)
        {
            var ticket2 = await _context.Ticket2s.FindAsync(id);

            if (ticket2 == null)
            {
                return NotFound();
            }

            return ticket2;
        }

        // PUT: api/Ticket2/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTicket2(int id, Ticket2 ticket2)
        {
            if (id != ticket2.Id)
            {
                return BadRequest();
            }

            _context.Entry(ticket2).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Ticket2Exists(id))
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

        // POST: api/Ticket2
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Ticket2>> PostTicket2(Ticket2 ticket2)
        {
            _context.Ticket2s.Add(ticket2);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTicket2", new { id = ticket2.Id }, ticket2);
        }

        // DELETE: api/Ticket2/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Ticket2>> DeleteTicket2(int id)
        {
            var ticket2 = await _context.Ticket2s.FindAsync(id);
            if (ticket2 == null)
            {
                return NotFound();
            }

            _context.Ticket2s.Remove(ticket2);
            await _context.SaveChangesAsync();

            return ticket2;
        }

        private bool Ticket2Exists(int id)
        {
            return _context.Ticket2s.Any(e => e.Id == id);
        }
    }
}
