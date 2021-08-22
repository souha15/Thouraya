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
    public class ChequeCsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public ChequeCsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/ChequeCs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ChequeC>>> GetchequeCs()
        {
            return await _context.chequeCs.ToListAsync();
        }

        // GET: api/ChequeCs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ChequeC>> GetChequeC(int id)
        {
            var chequeC = await _context.chequeCs.FindAsync(id);

            if (chequeC == null)
            {
                return NotFound();
            }

            return chequeC;
        }

        // PUT: api/ChequeCs/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutChequeC(int id, ChequeC chequeC)
        {
            if (id != chequeC.Id)
            {
                return BadRequest();
            }

            _context.Entry(chequeC).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ChequeCExists(id))
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

        // POST: api/ChequeCs
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ChequeC>> PostChequeC(ChequeC chequeC)
        {
            _context.chequeCs.Add(chequeC);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetChequeC", new { id = chequeC.Id }, chequeC);
        }

        // DELETE: api/ChequeCs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ChequeC>> DeleteChequeC(int id)
        {
            var chequeC = await _context.chequeCs.FindAsync(id);
            if (chequeC == null)
            {
                return NotFound();
            }

            _context.chequeCs.Remove(chequeC);
            await _context.SaveChangesAsync();

            return chequeC;
        }

        private bool ChequeCExists(int id)
        {
            return _context.chequeCs.Any(e => e.Id == id);
        }
    }
}
