using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Dons;

namespace WebApplicationPlateforme.Controllers.Dons
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjetDonsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public ProjetDonsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/ProjetDons
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjetDons>>> GetprojetDons()
        {
            return await _context.projetDons.ToListAsync();
        }

        // GET: api/ProjetDons/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProjetDons>> GetProjetDons(int id)
        {
            var projetDons = await _context.projetDons.FindAsync(id);

            if (projetDons == null)
            {
                return NotFound();
            }

            return projetDons;
        }

        // PUT: api/ProjetDons/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProjetDons(int id, ProjetDons projetDons)
        {
            if (id != projetDons.Id)
            {
                return BadRequest();
            }

            _context.Entry(projetDons).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjetDonsExists(id))
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

        // POST: api/ProjetDons
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ProjetDons>> PostProjetDons(ProjetDons projetDons)
        {
            _context.projetDons.Add(projetDons);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProjetDons", new { id = projetDons.Id }, projetDons);
        }

        // DELETE: api/ProjetDons/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ProjetDons>> DeleteProjetDons(int id)
        {
            var projetDons = await _context.projetDons.FindAsync(id);
            if (projetDons == null)
            {
                return NotFound();
            }

            _context.projetDons.Remove(projetDons);
            await _context.SaveChangesAsync();

            return projetDons;
        }

        private bool ProjetDonsExists(int id)
        {
            return _context.projetDons.Any(e => e.Id == id);
        }
    }
}
