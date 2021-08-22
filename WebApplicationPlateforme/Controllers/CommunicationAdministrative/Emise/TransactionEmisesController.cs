using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.AdministrativeCommunication.Emise;

namespace WebApplicationPlateforme.Controllers.CommunicationAdministrative.Emise
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionEmisesController : ControllerBase
    {
        private readonly FinanceContext _context;

        public TransactionEmisesController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/TransactionEmises
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TransactionEmise>>> GettransactionsEmise()
        {
            return await _context.transactionsEmise.ToListAsync();
        }

        // GET: api/TransactionEmises/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TransactionEmise>> GetTransactionEmise(int id)
        {
            var transactionEmise = await _context.transactionsEmise.FindAsync(id);

            if (transactionEmise == null)
            {
                return NotFound();
            }

            return transactionEmise;
        }

        // PUT: api/TransactionEmises/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTransactionEmise(int id, TransactionEmise transactionEmise)
        {
            if (id != transactionEmise.Id)
            {
                return BadRequest();
            }

            _context.Entry(transactionEmise).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TransactionEmiseExists(id))
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

        // POST: api/TransactionEmises
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<TransactionEmise>> PostTransactionEmise(TransactionEmise transactionEmise)
        {
            _context.transactionsEmise.Add(transactionEmise);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTransactionEmise", new { id = transactionEmise.Id }, transactionEmise);
        }

        // DELETE: api/TransactionEmises/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TransactionEmise>> DeleteTransactionEmise(int id)
        {
            var transactionEmise = await _context.transactionsEmise.FindAsync(id);
            if (transactionEmise == null)
            {
                return NotFound();
            }

            _context.transactionsEmise.Remove(transactionEmise);
            await _context.SaveChangesAsync();

            return transactionEmise;
        }

        private bool TransactionEmiseExists(int id)
        {
            return _context.transactionsEmise.Any(e => e.Id == id);
        }
    }
}
