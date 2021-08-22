using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Ressource_Humaines;

namespace WebApplicationPlateforme.Controllers.RH
{
    [Route("api/[controller]")]
    [ApiController]
    public class DemandeTicketsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public DemandeTicketsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/DemandeTickets
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DemandeTicket>>> GetdemandeTickets()
        {
            return await _context.demandeTickets.ToListAsync();
        }

        // GET: api/DemandeTickets/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DemandeTicket>> GetDemandeTicket(int id)
        {
            var demandeTicket = await _context.demandeTickets.FindAsync(id);

            if (demandeTicket == null)
            {
                return NotFound();
            }

            return demandeTicket;
        }

        // PUT: api/DemandeTickets/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDemandeTicket(int id, DemandeTicket demandeTicket)
        {
            if (id != demandeTicket.Id)
            {
                return BadRequest();
            }

            _context.Entry(demandeTicket).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DemandeTicketExists(id))
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

        // POST: api/DemandeTickets
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<DemandeTicket>> PostDemandeTicket(DemandeTicket demandeTicket)
        {
            _context.demandeTickets.Add(demandeTicket);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDemandeTicket", new { id = demandeTicket.Id }, demandeTicket);
        }

        // DELETE: api/DemandeTickets/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<DemandeTicket>> DeleteDemandeTicket(int id)
        {
            var demandeTicket = await _context.demandeTickets.FindAsync(id);
            if (demandeTicket == null)
            {
                return NotFound();
            }

            _context.demandeTickets.Remove(demandeTicket);
            await _context.SaveChangesAsync();

            return demandeTicket;
        }

        private bool DemandeTicketExists(int id)
        {
            return _context.demandeTickets.Any(e => e.Id == id);
        }
    }
}
