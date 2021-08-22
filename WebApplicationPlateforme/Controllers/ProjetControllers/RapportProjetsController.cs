using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Projets;

namespace WebApplicationPlateforme.Controllers.ProjetControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RapportProjetsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public RapportProjetsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/RapportProjets
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RapportProjet>>> GetrapportProjets()
        {
            return await _context.rapportProjets.ToListAsync();
        }

        // GET: api/RapportProjets/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RapportProjet>> GetRapportProjet(int id)
        {
            var rapportProjet = await _context.rapportProjets.FindAsync(id);

            if (rapportProjet == null)
            {
                return NotFound();
            }

            return rapportProjet;
        }

        // PUT: api/RapportProjets/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRapportProjet(int id, RapportProjet rapportProjet)
        {
            if (id != rapportProjet.Id)
            {
                return BadRequest();
            }

            _context.Entry(rapportProjet).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RapportProjetExists(id))
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

        // POST: api/RapportProjets
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<RapportProjet>> PostRapportProjet(RapportProjet rapportProjet)
        {
            _context.rapportProjets.Add(rapportProjet);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRapportProjet", new { id = rapportProjet.Id }, rapportProjet);
        }

        // DELETE: api/RapportProjets/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<RapportProjet>> DeleteRapportProjet(int id)
        {
            var rapportProjet = await _context.rapportProjets.FindAsync(id);
            if (rapportProjet == null)
            {
                return NotFound();
            }

            _context.rapportProjets.Remove(rapportProjet);
            await _context.SaveChangesAsync();

            return rapportProjet;
        }

        private bool RapportProjetExists(int id)
        {
            return _context.rapportProjets.Any(e => e.Id == id);
        }
    }
}
