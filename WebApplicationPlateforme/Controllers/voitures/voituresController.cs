using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.voitures;

namespace WebApplicationPlateforme.Controllers.voitures
{
    [Route("api/[controller]")]
    [ApiController]
    public class voituresController : ControllerBase
    {
        private readonly FinanceContext _context;

        public voituresController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/voitures
        [HttpGet]
        public async Task<ActionResult<IEnumerable<voiture>>> Getvoitures()
        {
            return await _context.voitures.ToListAsync();
        }

        // GET: api/voitures/5
        [HttpGet("{id}")]
        public async Task<ActionResult<voiture>> Getvoiture(int id)
        {
            var voiture = await _context.voitures.FindAsync(id);

            if (voiture == null)
            {
                return NotFound();
            }

            return voiture;
        }

        // PUT: api/voitures/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> Putvoiture(int id, voiture voiture)
        {
            if (id != voiture.Id)
            {
                return BadRequest();
            }

            _context.Entry(voiture).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!voitureExists(id))
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

        // POST: api/voitures
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<voiture>> Postvoiture(voiture voiture)
        {
            _context.voitures.Add(voiture);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Getvoiture", new { id = voiture.Id }, voiture);
        }

        // DELETE: api/voitures/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<voiture>> Deletevoiture(int id)
        {
            var voiture = await _context.voitures.FindAsync(id);
            if (voiture == null)
            {
                return NotFound();
            }

            _context.voitures.Remove(voiture);
            await _context.SaveChangesAsync();

            return voiture;
        }

        private bool voitureExists(int id)
        {
            return _context.voitures.Any(e => e.Id == id);
        }
    }
}
