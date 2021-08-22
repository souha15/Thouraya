using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.gestion_de_stock;

namespace WebApplicationPlateforme.Controllers.GestionStock
{
    [Route("api/[controller]")]
    [ApiController]
    public class UniteTypeStocksController : ControllerBase
    {
        private readonly FinanceContext _context;

        public UniteTypeStocksController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/UniteTypeStocks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UniteTypeStock>>> GetUniteTypeStocks()
        {
            return await _context.UniteTypeStocks.ToListAsync();
        }

        // GET: api/UniteTypeStocks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UniteTypeStock>> GetUniteTypeStock(int id)
        {
            var uniteTypeStock = await _context.UniteTypeStocks.FindAsync(id);

            if (uniteTypeStock == null)
            {
                return NotFound();
            }

            return uniteTypeStock;
        }

        // PUT: api/UniteTypeStocks/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUniteTypeStock(int id, UniteTypeStock uniteTypeStock)
        {
            if (id != uniteTypeStock.Id)
            {
                return BadRequest();
            }

            _context.Entry(uniteTypeStock).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UniteTypeStockExists(id))
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

        // POST: api/UniteTypeStocks
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<UniteTypeStock>> PostUniteTypeStock(UniteTypeStock uniteTypeStock)
        {
            _context.UniteTypeStocks.Add(uniteTypeStock);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUniteTypeStock", new { id = uniteTypeStock.Id }, uniteTypeStock);
        }

        // DELETE: api/UniteTypeStocks/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<UniteTypeStock>> DeleteUniteTypeStock(int id)
        {
            var uniteTypeStock = await _context.UniteTypeStocks.FindAsync(id);
            if (uniteTypeStock == null)
            {
                return NotFound();
            }

            _context.UniteTypeStocks.Remove(uniteTypeStock);
            await _context.SaveChangesAsync();

            return uniteTypeStock;
        }

        private bool UniteTypeStockExists(int id)
        {
            return _context.UniteTypeStocks.Any(e => e.Id == id);
        }
    }
}
