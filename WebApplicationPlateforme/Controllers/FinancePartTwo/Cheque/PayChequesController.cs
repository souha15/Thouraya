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
    public class PayChequesController : ControllerBase
    {
        private readonly FinanceContext _context;

        public PayChequesController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/PayCheques
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PayCheque>>> GetpayCheques()
        {
            return await _context.payCheques.ToListAsync();
        }

        // GET: api/PayCheques/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PayCheque>> GetPayCheque(int id)
        {
            var payCheque = await _context.payCheques.FindAsync(id);

            if (payCheque == null)
            {
                return NotFound();
            }

            return payCheque;
        }

        // PUT: api/PayCheques/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPayCheque(int id, PayCheque payCheque)
        {
            if (id != payCheque.Id)
            {
                return BadRequest();
            }

            _context.Entry(payCheque).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PayChequeExists(id))
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

        // POST: api/PayCheques
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<PayCheque>> PostPayCheque(PayCheque payCheque)
        {
            _context.payCheques.Add(payCheque);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPayCheque", new { id = payCheque.Id }, payCheque);
        }

        // DELETE: api/PayCheques/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<PayCheque>> DeletePayCheque(int id)
        {
            var payCheque = await _context.payCheques.FindAsync(id);
            if (payCheque == null)
            {
                return NotFound();
            }

            _context.payCheques.Remove(payCheque);
            await _context.SaveChangesAsync();

            return payCheque;
        }

        private bool PayChequeExists(int id)
        {
            return _context.payCheques.Any(e => e.Id == id);
        }
    }
}
