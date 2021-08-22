using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.gestion_beneficiaire;

namespace WebApplicationPlateforme.Controllers.GestBen
{
    [Route("api/[controller]")]
    [ApiController]
    public class GestionBenenficiairesController : ControllerBase
    {
        private readonly FinanceContext _context;

        public GestionBenenficiairesController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/GestionBenenficiaires
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GestionBenenficiaire>>> GetgestionBenenficiaires()
        {
            return await _context.gestionBenenficiaires.ToListAsync();
        }

        // GET: api/GestionBenenficiaires/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GestionBenenficiaire>> GetGestionBenenficiaire(int id)
        {
            var gestionBenenficiaire = await _context.gestionBenenficiaires.FindAsync(id);

            if (gestionBenenficiaire == null)
            {
                return NotFound();
            }

            return gestionBenenficiaire;
        }

        // PUT: api/GestionBenenficiaires/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGestionBenenficiaire(int id, GestionBenenficiaire gestionBenenficiaire)
        {
            if (id != gestionBenenficiaire.Id)
            {
                return BadRequest();
            }

            _context.Entry(gestionBenenficiaire).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GestionBenenficiaireExists(id))
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

        // POST: api/GestionBenenficiaires
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<GestionBenenficiaire>> PostGestionBenenficiaire(GestionBenenficiaire gestionBenenficiaire)
        {
            _context.gestionBenenficiaires.Add(gestionBenenficiaire);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGestionBenenficiaire", new { id = gestionBenenficiaire.Id }, gestionBenenficiaire);
        }

        // DELETE: api/GestionBenenficiaires/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<GestionBenenficiaire>> DeleteGestionBenenficiaire(int id)
        {
            var gestionBenenficiaire = await _context.gestionBenenficiaires.FindAsync(id);
            if (gestionBenenficiaire == null)
            {
                return NotFound();
            }

            _context.gestionBenenficiaires.Remove(gestionBenenficiaire);
            await _context.SaveChangesAsync();

            return gestionBenenficiaire;
        }

        private bool GestionBenenficiaireExists(int id)
        {
            return _context.gestionBenenficiaires.Any(e => e.Id == id);
        }
    }
}
