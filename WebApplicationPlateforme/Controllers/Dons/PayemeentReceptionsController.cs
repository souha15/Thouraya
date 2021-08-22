using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Dons;

namespace WebApplicationPlateforme.Controllers.Dons
{
    [Route("api/[controller]")]
    [ApiController]
    public class PayemeentReceptionsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public PayemeentReceptionsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/PayemeentReceptions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PayemeentReception>>> GetpayemeentReceptions()
        {
            return await _context.payemeentReceptions.ToListAsync();
        }

        // GET: api/PayemeentReceptions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PayemeentReception>> GetPayemeentReception(int id)
        {
            var payemeentReception = await _context.payemeentReceptions.FindAsync(id);

            if (payemeentReception == null)
            {
                return NotFound();
            }

            return payemeentReception;
        }

        // PUT: api/PayemeentReceptions/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPayemeentReception(int id, PayemeentReception payemeentReception)
        {
            if (id != payemeentReception.Id)
            {
                return BadRequest();
            }

            _context.Entry(payemeentReception).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PayemeentReceptionExists(id))
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

        // POST: api/PayemeentReceptions
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<PayemeentReception>> PostPayemeentReception(PayemeentReception payemeentReception)
        {
            _context.payemeentReceptions.Add(payemeentReception);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPayemeentReception", new { id = payemeentReception.Id }, payemeentReception);
        }

        // DELETE: api/PayemeentReceptions/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<PayemeentReception>> DeletePayemeentReception(int id)
        {
            var payemeentReception = await _context.payemeentReceptions.FindAsync(id);
            if (payemeentReception == null)
            {
                return NotFound();
            }

            _context.payemeentReceptions.Remove(payemeentReception);
            await _context.SaveChangesAsync();

            return payemeentReception;
        }

        private bool PayemeentReceptionExists(int id)
        {
            return _context.payemeentReceptions.Any(e => e.Id == id);
        }
    }
}
