using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.AdministrativeCommunication.Interne;

namespace WebApplicationPlateforme.Controllers.CommunicationAdministrative.Interne
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionIsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public TransactionIsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/TransactionIs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TransactionI>>> GettransactionsI()
        {
            return await _context.transactionsI.ToListAsync();
        }

        // GET: api/TransactionIs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TransactionI>> GetTransactionI(int id)
        {
            var transactionI = await _context.transactionsI.FindAsync(id);

            if (transactionI == null)
            {
                return NotFound();
            }

            return transactionI;
        }

        // PUT: api/TransactionIs/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTransactionI(int id, TransactionI transactionI)
        {
            if (id != transactionI.Id)
            {
                return BadRequest();
            }

            _context.Entry(transactionI).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TransactionIExists(id))
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

        // POST: api/TransactionIs
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<TransactionI>> PostTransactionI(TransactionI transactionI)
        {
            _context.transactionsI.Add(transactionI);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTransactionI", new { id = transactionI.Id }, transactionI);
        }

        // DELETE: api/TransactionIs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TransactionI>> DeleteTransactionI(int id)
        {
            var transactionI = await _context.transactionsI.FindAsync(id);
            if (transactionI == null)
            {
                return NotFound();
            }

            _context.transactionsI.Remove(transactionI);
            await _context.SaveChangesAsync();

            return transactionI;
        }

        private bool TransactionIExists(int id)
        {
            return _context.transactionsI.Any(e => e.Id == id);
        }
    }
}
