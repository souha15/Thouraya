using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Gestion_de_stock;

namespace WebApplicationPlateforme.Controllers.GestionStock
{
    [Route("api/[controller]")]
    [ApiController]
    public class PayDirecteStockagesController : ControllerBase
    {
        private readonly FinanceContext _context;

        public PayDirecteStockagesController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/PayDirecteStockages
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PayDirecteStockage>>> GetPayDirecteStockages()
        {
            return await _context.PayDirecteStockages.ToListAsync();
        }

        // GET: api/PayDirecteStockages/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PayDirecteStockage>> GetPayDirecteStockage(int id)
        {
            var payDirecteStockage = await _context.PayDirecteStockages.FindAsync(id);

            if (payDirecteStockage == null)
            {
                return NotFound();
            }

            return payDirecteStockage;
        }

        // PUT: api/PayDirecteStockages/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPayDirecteStockage(int id, PayDirecteStockage payDirecteStockage)
        {
            if (id != payDirecteStockage.Id)
            {
                return BadRequest();
            }

            _context.Entry(payDirecteStockage).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PayDirecteStockageExists(id))
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

        // POST: api/PayDirecteStockages
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<PayDirecteStockage>> PostPayDirecteStockage(PayDirecteStockage payDirecteStockage)
        {
            _context.PayDirecteStockages.Add(payDirecteStockage);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPayDirecteStockage", new { id = payDirecteStockage.Id }, payDirecteStockage);
        }

        // DELETE: api/PayDirecteStockages/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<PayDirecteStockage>> DeletePayDirecteStockage(int id)
        {
            var payDirecteStockage = await _context.PayDirecteStockages.FindAsync(id);
            if (payDirecteStockage == null)
            {
                return NotFound();
            }

            _context.PayDirecteStockages.Remove(payDirecteStockage);
            await _context.SaveChangesAsync();

            return payDirecteStockage;
        }

        private bool PayDirecteStockageExists(int id)
        {
            return _context.PayDirecteStockages.Any(e => e.Id == id);
        }
    }
}
