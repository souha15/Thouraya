using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.FinancePartTwo.Comptes;

namespace WebApplicationPlateforme.Controllers.FinancePartTwo
{
    [Route("api/[controller]")]
    [ApiController]
    public class EtatComptesController : ControllerBase
    {
        private readonly FinanceContext _context;

        public EtatComptesController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/EtatComptes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EtatCompte>>> GetetatComptes()
        {
            return await _context.etatComptes.ToListAsync();
        }

        // GET: api/EtatComptes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EtatCompte>> GetEtatCompte(int id)
        {
            var etatCompte = await _context.etatComptes.FindAsync(id);

            if (etatCompte == null)
            {
                return NotFound();
            }

            return etatCompte;
        }

        // PUT: api/EtatComptes/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEtatCompte(int id, EtatCompte etatCompte)
        {
            if (id != etatCompte.Id)
            {
                return BadRequest();
            }

            _context.Entry(etatCompte).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EtatCompteExists(id))
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

        // POST: api/EtatComptes
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<EtatCompte>> PostEtatCompte(EtatCompte etatCompte)
        {
            _context.etatComptes.Add(etatCompte);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEtatCompte", new { id = etatCompte.Id }, etatCompte);
        }

        // DELETE: api/EtatComptes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<EtatCompte>> DeleteEtatCompte(int id)
        {
            var etatCompte = await _context.etatComptes.FindAsync(id);
            if (etatCompte == null)
            {
                return NotFound();
            }

            _context.etatComptes.Remove(etatCompte);
            await _context.SaveChangesAsync();

            return etatCompte;
        }

        private bool EtatCompteExists(int id)
        {
            return _context.etatComptes.Any(e => e.Id == id);
        }
    }
}
