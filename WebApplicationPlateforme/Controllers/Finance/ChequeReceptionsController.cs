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
    public class ChequeReceptionsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public ChequeReceptionsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/ChequeReceptions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ChequeReception>>> GetchequeReceptions()
        {
            return await _context.chequeReceptions.ToListAsync();
        }

        // GET: api/ChequeReceptions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ChequeReception>> GetChequeReception(int id)
        {
            var chequeReception = await _context.chequeReceptions.FindAsync(id);

            if (chequeReception == null)
            {
                return NotFound();
            }

            return chequeReception;
        }

        // PUT: api/ChequeReceptions/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutChequeReception(int id, ChequeReception chequeReception)
        {
            if (id != chequeReception.Id)
            {
                return BadRequest();
            }

            _context.Entry(chequeReception).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ChequeReceptionExists(id))
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

        // POST: api/ChequeReceptions
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ChequeReception>> PostChequeReception(ChequeReception chequeReception)
        {
            _context.chequeReceptions.Add(chequeReception);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetChequeReception", new { id = chequeReception.Id }, chequeReception);
        }

        // DELETE: api/ChequeReceptions/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ChequeReception>> DeleteChequeReception(int id)
        {
            var chequeReception = await _context.chequeReceptions.FindAsync(id);
            if (chequeReception == null)
            {
                return NotFound();
            }

            _context.chequeReceptions.Remove(chequeReception);
            await _context.SaveChangesAsync();

            return chequeReception;
        }

        private bool ChequeReceptionExists(int id)
        {
            return _context.chequeReceptions.Any(e => e.Id == id);
        }
    }
}
