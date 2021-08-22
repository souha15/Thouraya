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
    public class EtatListComptesController : ControllerBase
    {
        private readonly FinanceContext _context;

        public EtatListComptesController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/EtatListComptes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EtatListCompte>>> GetetatListComptes()
        {
            return await _context.etatListComptes.ToListAsync();
        }

        // GET: api/EtatListComptes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EtatListCompte>> GetEtatListCompte(int id)
        {
            var etatListCompte = await _context.etatListComptes.FindAsync(id);

            if (etatListCompte == null)
            {
                return NotFound();
            }

            return etatListCompte;
        }

        // PUT: api/EtatListComptes/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEtatListCompte(int id, EtatListCompte etatListCompte)
        {
            if (id != etatListCompte.Id)
            {
                return BadRequest();
            }

            _context.Entry(etatListCompte).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EtatListCompteExists(id))
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

        // POST: api/EtatListComptes
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<EtatListCompte>> PostEtatListCompte(EtatListCompte etatListCompte)
        {
            _context.etatListComptes.Add(etatListCompte);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEtatListCompte", new { id = etatListCompte.Id }, etatListCompte);
        }

        // DELETE: api/EtatListComptes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<EtatListCompte>> DeleteEtatListCompte(int id)
        {
            var etatListCompte = await _context.etatListComptes.FindAsync(id);
            if (etatListCompte == null)
            {
                return NotFound();
            }

            _context.etatListComptes.Remove(etatListCompte);
            await _context.SaveChangesAsync();

            return etatListCompte;
        }

        private bool EtatListCompteExists(int id)
        {
            return _context.etatListComptes.Any(e => e.Id == id);
        }
    }
}
