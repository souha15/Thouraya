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
    public class RetourStockController : ControllerBase
    {
        private readonly DawaaContext _context;

        public RetourStockController(DawaaContext context)
        {
            _context = context;
        }

        // GET: api/RetourStock
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RetourStock>>> GetRetourStocks()
        {
            return await _context.RetourStock.ToListAsync();
        }

        // GET: api/RetourStock/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RetourStock>> GetRetourStock(int id)
        {
            var retourStock = await _context.RetourStock.FindAsync(id);

            if (retourStock == null)
            {
                return NotFound();
            }

            return retourStock;
        }

        // PUT: api/RetourStocks/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRetourStock(int id, RetourStock retourStock)
        {
            if (id != retourStock.Id)
            {
                return BadRequest();
            }

            _context.Entry(retourStock).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RetourStockExists(id))
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

        // POST: api/RetourStocks
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<RetourStock>> PostRetourStock(RetourStock retourStock)
        {
            _context.RetourStock.Add(retourStock);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRetourStock", new { id = retourStock.Id }, retourStock);
        }

        // DELETE: api/RetourStocks/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<RetourStock>> DeleteRetourStock(int id)
        {
            var retourStock = await _context.RetourStock.FindAsync(id);
            if (retourStock == null)
            {
                return NotFound();
            }

            _context.RetourStock.Remove(retourStock);
            await _context.SaveChangesAsync();

            return retourStock;
        }

        private bool RetourStockExists(int id)
        {
            return _context.RetourStock.Any(e => e.Id == id);
        }
    }
}
