using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.GestionDestTickets;

namespace WebApplicationPlateforme.Controllers.Maintenance
{
    [Route("api/[controller]")]
    [ApiController]
    public class GestionTicketsController : ControllerBase
    {
        private readonly DawaaContext _context;

        public GestionTicketsController(DawaaContext context)
        {
            _context = context;
        }

        // GET: api/GestionTickets
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GestionTickets>>> GetGestionTickets()
        {
            return await _context.GestionTickets.OrderBy(item=> item.Id).ToListAsync();
        }

        // GET: api/GestionTickets/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GestionTickets>> GetGestionTickets(int id)
        {
            var gestionTickets = await _context.GestionTickets.FindAsync(id);

            if (gestionTickets == null)
            {
                return NotFound();
            }

            return gestionTickets;
        }

        // PUT: api/GestionTickets/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGestionTickets(int id, GestionTickets gestionTickets)
        {
            if (id != gestionTickets.Id)
            {
                return BadRequest();
            }

            _context.Entry(gestionTickets).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GestionTicketsExists(id))
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

        // POST: api/GestionTickets
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<GestionTickets>> PostGestionTickets(GestionTickets gestionTickets)
        {
            _context.GestionTickets.Add(gestionTickets);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGestionTickets", new { id = gestionTickets.Id }, gestionTickets);
        }

        // DELETE: api/GestionTickets/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<GestionTickets>> DeleteGestionTickets(int id)
        {
            var gestionTickets = await _context.GestionTickets.FindAsync(id);
            if (gestionTickets == null)
            {
                return NotFound();
            }

            _context.GestionTickets.Remove(gestionTickets);
            await _context.SaveChangesAsync();

            return gestionTickets;
        }
        private bool GestionTicketsExists(int id)
        {
            return _context.GestionTickets.Any(e => e.Id == id);
        }
    }
}
