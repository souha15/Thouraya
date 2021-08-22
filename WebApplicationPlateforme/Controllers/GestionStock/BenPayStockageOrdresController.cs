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
    public class BenPayStockageOrdresController : ControllerBase
    {
        private readonly FinanceContext _context;

        public BenPayStockageOrdresController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/BenPayStockageOrdres
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BenPayStockageOrdre>>> GetBenPayStockageOrdres()
        {
            return await _context.BenPayStockageOrdres.ToListAsync();
        }

        // GET: api/BenPayStockageOrdres/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BenPayStockageOrdre>> GetBenPayStockageOrdre(int id)
        {
            var benPayStockageOrdre = await _context.BenPayStockageOrdres.FindAsync(id);

            if (benPayStockageOrdre == null)
            {
                return NotFound();
            }

            return benPayStockageOrdre;
        }

        // PUT: api/BenPayStockageOrdres/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBenPayStockageOrdre(int id, BenPayStockageOrdre benPayStockageOrdre)
        {
            if (id != benPayStockageOrdre.Id)
            {
                return BadRequest();
            }

            _context.Entry(benPayStockageOrdre).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BenPayStockageOrdreExists(id))
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

        // POST: api/BenPayStockageOrdres
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<BenPayStockageOrdre>> PostBenPayStockageOrdre(BenPayStockageOrdre benPayStockageOrdre)
        {
            _context.BenPayStockageOrdres.Add(benPayStockageOrdre);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBenPayStockageOrdre", new { id = benPayStockageOrdre.Id }, benPayStockageOrdre);
        }

        // DELETE: api/BenPayStockageOrdres/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<BenPayStockageOrdre>> DeleteBenPayStockageOrdre(int id)
        {
            var benPayStockageOrdre = await _context.BenPayStockageOrdres.FindAsync(id);
            if (benPayStockageOrdre == null)
            {
                return NotFound();
            }

            _context.BenPayStockageOrdres.Remove(benPayStockageOrdre);
            await _context.SaveChangesAsync();

            return benPayStockageOrdre;
        }

        private bool BenPayStockageOrdreExists(int id)
        {
            return _context.BenPayStockageOrdres.Any(e => e.Id == id);
        }
    }
}
