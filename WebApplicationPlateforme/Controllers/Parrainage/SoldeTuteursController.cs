using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Parrainage;

namespace WebApplicationPlateforme.Controllers.Parrainage
{
    [Route("api/[controller]")]
    [ApiController]
    public class SoldeTuteursController : ControllerBase
    {
        private readonly FinanceContext _context;

        public SoldeTuteursController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/SoldeTuteurs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SoldeTuteur>>> GetSoldeTuteurs()
        {
            return await _context.SoldeTuteurs.ToListAsync();
        }

        // GET: api/SoldeTuteurs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SoldeTuteur>> GetSoldeTuteur(int id)
        {
            var soldeTuteur = await _context.SoldeTuteurs.FindAsync(id);

            if (soldeTuteur == null)
            {
                return NotFound();
            }

            return soldeTuteur;
        }

        // PUT: api/SoldeTuteurs/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSoldeTuteur(int id, SoldeTuteur soldeTuteur)
        {
            if (id != soldeTuteur.Id)
            {
                return BadRequest();
            }

            _context.Entry(soldeTuteur).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SoldeTuteurExists(id))
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

        // POST: api/SoldeTuteurs
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<SoldeTuteur>> PostSoldeTuteur(SoldeTuteur soldeTuteur)
        {
            _context.SoldeTuteurs.Add(soldeTuteur);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSoldeTuteur", new { id = soldeTuteur.Id }, soldeTuteur);
        }

        // DELETE: api/SoldeTuteurs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<SoldeTuteur>> DeleteSoldeTuteur(int id)
        {
            var soldeTuteur = await _context.SoldeTuteurs.FindAsync(id);
            if (soldeTuteur == null)
            {
                return NotFound();
            }

            _context.SoldeTuteurs.Remove(soldeTuteur);
            await _context.SaveChangesAsync();

            return soldeTuteur;
        }

        private bool SoldeTuteurExists(int id)
        {
            return _context.SoldeTuteurs.Any(e => e.Id == id);
        }
    }
}
