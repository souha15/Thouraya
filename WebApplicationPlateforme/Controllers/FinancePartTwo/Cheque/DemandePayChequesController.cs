using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.FinancePartTwo.Cheques;

namespace WebApplicationPlateforme.Controllers.FinancePartTwo.Cheque
{
    [Route("api/[controller]")]
    [ApiController]
    public class DemandePayChequesController : ControllerBase
    {
        private readonly FinanceContext _context;

        public DemandePayChequesController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/DemandePayCheques
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DemandePayCheque>>> GetdemandePayCheques()
        {
            return await _context.demandePayCheques.ToListAsync();
        }

        // GET: api/DemandePayCheques/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DemandePayCheque>> GetDemandePayCheque(int id)
        {
            var demandePayCheque = await _context.demandePayCheques.FindAsync(id);

            if (demandePayCheque == null)
            {
                return NotFound();
            }

            return demandePayCheque;
        }

        // PUT: api/DemandePayCheques/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDemandePayCheque(int id, DemandePayCheque demandePayCheque)
        {
            if (id != demandePayCheque.Id)
            {
                return BadRequest();
            }

            _context.Entry(demandePayCheque).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DemandePayChequeExists(id))
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

        // POST: api/DemandePayCheques
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<DemandePayCheque>> PostDemandePayCheque(DemandePayCheque demandePayCheque)
        {
            _context.demandePayCheques.Add(demandePayCheque);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDemandePayCheque", new { id = demandePayCheque.Id }, demandePayCheque);
        }

        // DELETE: api/DemandePayCheques/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<DemandePayCheque>> DeleteDemandePayCheque(int id)
        {
            var demandePayCheque = await _context.demandePayCheques.FindAsync(id);
            if (demandePayCheque == null)
            {
                return NotFound();
            }

            _context.demandePayCheques.Remove(demandePayCheque);
            await _context.SaveChangesAsync();

            return demandePayCheque;
        }

        private bool DemandePayChequeExists(int id)
        {
            return _context.demandePayCheques.Any(e => e.Id == id);
        }
    }
}
