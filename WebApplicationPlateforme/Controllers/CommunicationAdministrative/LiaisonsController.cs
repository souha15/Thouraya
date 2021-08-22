using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.AdministrativeCommunication;

namespace WebApplicationPlateforme.Controllers.CommunicationAdministrative
{
    [Route("api/[controller]")]
    [ApiController]
    public class LiaisonsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public LiaisonsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/Liaisons
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Liaison>>> Getliaisons()
        {
            return await _context.liaisons.ToListAsync();
        }

        // GET: api/Liaisons/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Liaison>> GetLiaison(int id)
        {
            var liaison = await _context.liaisons.FindAsync(id);

            if (liaison == null)
            {
                return NotFound();
            }

            return liaison;
        }

        // PUT: api/Liaisons/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLiaison(int id, Liaison liaison)
        {
            if (id != liaison.Id)
            {
                return BadRequest();
            }

            _context.Entry(liaison).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LiaisonExists(id))
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

        // POST: api/Liaisons
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Liaison>> PostLiaison(Liaison liaison)
        {
            _context.liaisons.Add(liaison);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLiaison", new { id = liaison.Id }, liaison);
        }

        // DELETE: api/Liaisons/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Liaison>> DeleteLiaison(int id)
        {
            var liaison = await _context.liaisons.FindAsync(id);
            if (liaison == null)
            {
                return NotFound();
            }

            _context.liaisons.Remove(liaison);
            await _context.SaveChangesAsync();

            return liaison;
        }

        private bool LiaisonExists(int id)
        {
            return _context.liaisons.Any(e => e.Id == id);
        }
    }
}
