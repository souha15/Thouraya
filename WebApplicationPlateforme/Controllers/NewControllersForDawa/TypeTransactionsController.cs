using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.AdministrativeCommunication;

namespace WebApplicationPlateforme.Controllers.NewControllersForDawa
{
    [Route("api/[controller]")]
    [ApiController]
    public class TypeTransactionsController : ControllerBase
    {
        private readonly DawaaContext _context;

        public TypeTransactionsController(DawaaContext context)
        {
            _context = context;
        }

        // GET: api/TypeTransactions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TypeTransaction>>> GetTypeTransaction()
        {
            return await _context.TypeTransaction.ToListAsync();
        }

        // GET: api/TypeTransactions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TypeTransaction>> GetTypeTransaction(int id)
        {
            var typeTransaction = await _context.TypeTransaction.FindAsync(id);

            if (typeTransaction == null)
            {
                return NotFound();
            }

            return typeTransaction;
        }

        // PUT: api/TypeTransactions/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTypeTransaction(int id, TypeTransaction typeTransaction)
        {
            if (id != typeTransaction.Id)
            {
                return BadRequest();
            }

            _context.Entry(typeTransaction).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TypeTransactionExists(id))
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

        // POST: api/TypeTransactions
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<TypeTransaction>> PostTypeTransaction(TypeTransaction typeTransaction)
        {
            _context.TypeTransaction.Add(typeTransaction);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTypeTransaction", new { id = typeTransaction.Id }, typeTransaction);
        }

        // DELETE: api/TypeTransactions/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TypeTransaction>> DeleteTypeTransaction(int id)
        {
            var typeTransaction = await _context.TypeTransaction.FindAsync(id);
            if (typeTransaction == null)
            {
                return NotFound();
            }

            _context.TypeTransaction.Remove(typeTransaction);
            await _context.SaveChangesAsync();

            return typeTransaction;
        }

        private bool TypeTransactionExists(int id)
        {
            return _context.TypeTransaction.Any(e => e.Id == id);
        }
    }
}
