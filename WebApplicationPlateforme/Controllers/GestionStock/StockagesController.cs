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
    public class StockagesController : ControllerBase
    {
        private readonly FinanceContext _context;

        public StockagesController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/Stockages
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Stockage>>> GetStockages()
        {
            return await _context.Stockages.ToListAsync();
        }

        // GET: api/Stockages/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Stockage>> GetStockage(int id)
        {
            var stockage = await _context.Stockages.FindAsync(id);

            if (stockage == null)
            {
                return NotFound();
            }

            return stockage;
        }

        // PUT: api/Stockages/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStockage(int id, Stockage stockage)
        {
            if (id != stockage.Id)
            {
                return BadRequest();
            }

            _context.Entry(stockage).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StockageExists(id))
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

        // POST: api/Stockages
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Stockage>> PostStockage(Stockage stockage)
        {
            _context.Stockages.Add(stockage);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStockage", new { id = stockage.Id }, stockage);
        }

        // DELETE: api/Stockages/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Stockage>> DeleteStockage(int id)
        {
            var stockage = await _context.Stockages.FindAsync(id);
            if (stockage == null)
            {
                return NotFound();
            }

            _context.Stockages.Remove(stockage);
            await _context.SaveChangesAsync();

            return stockage;
        }

        private bool StockageExists(int id)
        {
            return _context.Stockages.Any(e => e.Id == id);
        }
    }
}
