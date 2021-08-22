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
    public class TypeStocksController : ControllerBase
    {
        private readonly FinanceContext _context;

        public TypeStocksController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/TypeStocks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TypeStock>>> GetTypeStocks()
        {
            return await _context.TypeStocks.ToListAsync();
        }

        // GET: api/TypeStocks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TypeStock>> GetTypeStock(int id)
        {
            var typeStock = await _context.TypeStocks.FindAsync(id);

            if (typeStock == null)
            {
                return NotFound();
            }

            return typeStock;
        }

        // PUT: api/TypeStocks/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTypeStock(int id, TypeStock typeStock)
        {
            if (id != typeStock.Id)
            {
                return BadRequest();
            }

            _context.Entry(typeStock).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TypeStockExists(id))
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

        // POST: api/TypeStocks
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<TypeStock>> PostTypeStock(TypeStock typeStock)
        {
            _context.TypeStocks.Add(typeStock);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTypeStock", new { id = typeStock.Id }, typeStock);
        }

        // DELETE: api/TypeStocks/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TypeStock>> DeleteTypeStock(int id)
        {
            var typeStock = await _context.TypeStocks.FindAsync(id);
            if (typeStock == null)
            {
                return NotFound();
            }

            _context.TypeStocks.Remove(typeStock);
            await _context.SaveChangesAsync();

            return typeStock;
        }

        private bool TypeStockExists(int id)
        {
            return _context.TypeStocks.Any(e => e.Id == id);
        }
    }
}
