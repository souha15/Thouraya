using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Evenements;

namespace WebApplicationPlateforme.Controllers.Evenements
{
    [Route("api/[controller]")]
    [ApiController]
    public class BeneficiairesController : ControllerBase
    {
        private readonly FinanceContext _context;

        public BeneficiairesController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/Beneficiaires
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Beneficiaire>>> Getbeneficiaires()
        {
            return await _context.beneficiaires.ToListAsync();
        }

        // GET: api/Beneficiaires/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Beneficiaire>> GetBeneficiaire(int id)
        {
            var beneficiaire = await _context.beneficiaires.FindAsync(id);

            if (beneficiaire == null)
            {
                return NotFound();
            }

            return beneficiaire;
        }

        // PUT: api/Beneficiaires/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBeneficiaire(int id, Beneficiaire beneficiaire)
        {
            if (id != beneficiaire.Id)
            {
                return BadRequest();
            }

            _context.Entry(beneficiaire).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BeneficiaireExists(id))
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

        // POST: api/Beneficiaires
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Beneficiaire>> PostBeneficiaire(Beneficiaire beneficiaire)
        {
            _context.beneficiaires.Add(beneficiaire);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBeneficiaire", new { id = beneficiaire.Id }, beneficiaire);
        }

        // DELETE: api/Beneficiaires/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Beneficiaire>> DeleteBeneficiaire(int id)
        {
            var beneficiaire = await _context.beneficiaires.FindAsync(id);
            if (beneficiaire == null)
            {
                return NotFound();
            }

            _context.beneficiaires.Remove(beneficiaire);
            await _context.SaveChangesAsync();

            return beneficiaire;
        }

        private bool BeneficiaireExists(int id)
        {
            return _context.beneficiaires.Any(e => e.Id == id);
        }
    }
}
