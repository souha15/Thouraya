using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.ProjetOrg;

namespace WebApplicationPlateforme.Controllers.ProjetOrg
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjetOuvriersController : ControllerBase
    {
        private readonly FinanceContext _context;

        public ProjetOuvriersController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/ProjetOuvriers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjetOuvrier>>> GetProjetOuvrier()
        {
            return await _context.ProjetOuvrier.ToListAsync();
        }

        // GET: api/ProjetOuvriers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProjetOuvrier>> GetProjetOuvrier(int id)
        {
            var projetOuvrier = await _context.ProjetOuvrier.FindAsync(id);

            if (projetOuvrier == null)
            {
                return NotFound();
            }

            return projetOuvrier;
        }

        // PUT: api/ProjetOuvriers/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProjetOuvrier(int id, ProjetOuvrier projetOuvrier)
        {
            if (id != projetOuvrier.Id)
            {
                return BadRequest();
            }

            _context.Entry(projetOuvrier).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjetOuvrierExists(id))
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

        // POST: api/ProjetOuvriers
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ProjetOuvrier>> PostProjetOuvrier(ProjetOuvrier projetOuvrier)
        {
            _context.ProjetOuvrier.Add(projetOuvrier);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProjetOuvrier", new { id = projetOuvrier.Id }, projetOuvrier);
        }

        // DELETE: api/ProjetOuvriers/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ProjetOuvrier>> DeleteProjetOuvrier(int id)
        {
            var projetOuvrier = await _context.ProjetOuvrier.FindAsync(id);
            if (projetOuvrier == null)
            {
                return NotFound();
            }

            _context.ProjetOuvrier.Remove(projetOuvrier);
            await _context.SaveChangesAsync();

            return projetOuvrier;
        }

        private bool ProjetOuvrierExists(int id)
        {
            return _context.ProjetOuvrier.Any(e => e.Id == id);
        }
    }
}
