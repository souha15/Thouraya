using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Supplies;

namespace WebApplicationPlateforme.Controllers.Supplies
{
    [Route("api/[controller]")]
    [ApiController]
    public class GestionSuppliesController : ControllerBase
    {
        private readonly FinanceContext _context;

        public GestionSuppliesController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/GestionSupplies
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GestionSupplies>>> GetgestionSupplies()
        {
            return await _context.gestionSupplies.ToListAsync();
        }

        // GET: api/GestionSupplies/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GestionSupplies>> GetGestionSupplies(int id)
        {
            var gestionSupplies = await _context.gestionSupplies.FindAsync(id);

            if (gestionSupplies == null)
            {
                return NotFound();
            }

            return gestionSupplies;
        }

        // PUT: api/GestionSupplies/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGestionSupplies(int id, GestionSupplies gestionSupplies)
        {
            if (id != gestionSupplies.Id)
            {
                return BadRequest();
            }

            _context.Entry(gestionSupplies).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GestionSuppliesExists(id))
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

        // POST: api/GestionSupplies
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<GestionSupplies>> PostGestionSupplies(GestionSupplies gestionSupplies)
        {
            _context.gestionSupplies.Add(gestionSupplies);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGestionSupplies", new { id = gestionSupplies.Id }, gestionSupplies);
        }

        // DELETE: api/GestionSupplies/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<GestionSupplies>> DeleteGestionSupplies(int id)
        {
            var gestionSupplies = await _context.gestionSupplies.FindAsync(id);
            if (gestionSupplies == null)
            {
                return NotFound();
            }

            _context.gestionSupplies.Remove(gestionSupplies);
            await _context.SaveChangesAsync();

            return gestionSupplies;
        }

        private bool GestionSuppliesExists(int id)
        {
            return _context.gestionSupplies.Any(e => e.Id == id);
        }
    }
}
