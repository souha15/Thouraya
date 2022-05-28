using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.AchatVoitures;

namespace WebApplicationPlateforme.Controllers.AchatVoiture
{
    [Route("api/[controller]")]
    [ApiController]
    public class DemandeVoituresController : ControllerBase
    {
        private readonly DawaaContext _context;

        public DemandeVoituresController(DawaaContext context)
        {
            _context = context;
        }

        // GET: api/DemandeVoitures
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DemandeVoiture>>> GetDemandeVoitures()
        {
            return await _context.DemandeVoitures.OrderBy(item => item.Id).ToListAsync();
        }

        // GET: api/DemandeVoitures/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DemandeVoiture>> GetDemandeVoiture(int id)
        {
            var demandeVoiture = await _context.DemandeVoitures.FindAsync(id);

            if (demandeVoiture == null)
            {
                return NotFound();
            }

            return demandeVoiture;
        }

        // PUT: api/DemandeVoitures/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDemandeVoiture(int id, DemandeVoiture demandeVoiture)
        {
            if (id != demandeVoiture.Id)
            {
                return BadRequest();
            }

            _context.Entry(demandeVoiture).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DemandeVoitureExists(id))
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

        // POST: api/DemandeVoitures
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<DemandeVoiture>> PostDemandeVoiture(DemandeVoiture demandeVoiture)
        {
            _context.DemandeVoitures.Add(demandeVoiture);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDemandeVoiture", new { id = demandeVoiture.Id }, demandeVoiture);
        }

        // DELETE: api/DemandeVoitures/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<DemandeVoiture>> DeleteDemandeVoiture(int id)
        {
            var demandeVoiture = await _context.DemandeVoitures.FindAsync(id);
            if (demandeVoiture == null)
            {
                return NotFound();
            }

            _context.DemandeVoitures.Remove(demandeVoiture);
            await _context.SaveChangesAsync();

            return demandeVoiture;
        }

        private bool DemandeVoitureExists(int id)
        {
            return _context.DemandeVoitures.Any(e => e.Id == id);
        }
    }
}
