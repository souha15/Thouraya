using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Finance;

namespace WebApplicationPlateforme.Controllers.Finance
{
    [Route("api/[controller]")]
    [ApiController]
    public class TypeBeneficiairesController : ControllerBase
    {
        private readonly FinanceContext _context;

        public TypeBeneficiairesController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/TypeBeneficiaires
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TypeBeneficiaire>>> GettypeBeneficiaires()
        {
            return await _context.typeBeneficiaires.ToListAsync();
        }

        // GET: api/TypeBeneficiaires/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TypeBeneficiaire>> GetTypeBeneficiaire(int id)
        {
            var typeBeneficiaire = await _context.typeBeneficiaires.FindAsync(id);

            if (typeBeneficiaire == null)
            {
                return NotFound();
            }

            return typeBeneficiaire;
        }

        // PUT: api/TypeBeneficiaires/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTypeBeneficiaire(int id, TypeBeneficiaire typeBeneficiaire)
        {
            if (id != typeBeneficiaire.Id)
            {
                return BadRequest();
            }

            _context.Entry(typeBeneficiaire).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TypeBeneficiaireExists(id))
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

        // POST: api/TypeBeneficiaires
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<TypeBeneficiaire>> PostTypeBeneficiaire(TypeBeneficiaire typeBeneficiaire)
        {
            _context.typeBeneficiaires.Add(typeBeneficiaire);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTypeBeneficiaire", new { id = typeBeneficiaire.Id }, typeBeneficiaire);
        }

        // DELETE: api/TypeBeneficiaires/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TypeBeneficiaire>> DeleteTypeBeneficiaire(int id)
        {
            var typeBeneficiaire = await _context.typeBeneficiaires.FindAsync(id);
            if (typeBeneficiaire == null)
            {
                return NotFound();
            }

            _context.typeBeneficiaires.Remove(typeBeneficiaire);
            await _context.SaveChangesAsync();

            return typeBeneficiaire;
        }

        private bool TypeBeneficiaireExists(int id)
        {
            return _context.typeBeneficiaires.Any(e => e.Id == id);
        }
    }
}
