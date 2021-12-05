using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.VenteServices;

namespace WebApplicationPlateforme.Controllers.VenteServices
{
    [Route("api/[controller]")]
    [ApiController]
    public class OffreVentesController : ControllerBase
    {
        private readonly DawaaContext _context;

        public OffreVentesController(DawaaContext context)
        {
            _context = context;
        }

        // GET: api/OffreVentes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OffreVente>>> GetOffreVentes()
        {
            return await _context.OffreVentes.ToListAsync();
        }

        // GET: api/OffreVentes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OffreVente>> GetOffreVente(int id)
        {
            var offreVente = await _context.OffreVentes.FindAsync(id);

            if (offreVente == null)
            {
                return NotFound();
            }

            return offreVente;
        }

        // PUT: api/OffreVentes/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOffreVente(int id, OffreVente offreVente)
        {
            if (id != offreVente.Id)
            {
                return BadRequest();
            }

            _context.Entry(offreVente).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OffreVenteExists(id))
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

        // POST: api/OffreVentes
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<OffreVente>> PostOffreVente(OffreVente offreVente)
        {
            _context.OffreVentes.Add(offreVente);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOffreVente", new { id = offreVente.Id }, offreVente);
        }

        // DELETE: api/OffreVentes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<OffreVente>> DeleteOffreVente(int id)
        {
            var offreVente = await _context.OffreVentes.FindAsync(id);
            if (offreVente == null)
            {
                return NotFound();
            }

            _context.OffreVentes.Remove(offreVente);
            await _context.SaveChangesAsync();

            return offreVente;
        }

        private bool OffreVenteExists(int id)
        {
            return _context.OffreVentes.Any(e => e.Id == id);
        }
    }
}
