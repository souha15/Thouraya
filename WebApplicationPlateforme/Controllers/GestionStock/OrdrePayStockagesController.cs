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
    public class OrdrePayStockagesController : ControllerBase
    {
        private readonly FinanceContext _context;

        public OrdrePayStockagesController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/OrdrePayStockages
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrdrePayStockage>>> GetOrdrePayStockages()
        {
            return await _context.OrdrePayStockages.ToListAsync();
        }

        // GET: api/OrdrePayStockages/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OrdrePayStockage>> GetOrdrePayStockage(int id)
        {
            var ordrePayStockage = await _context.OrdrePayStockages.FindAsync(id);

            if (ordrePayStockage == null)
            {
                return NotFound();
            }

            return ordrePayStockage;
        }

        // PUT: api/OrdrePayStockages/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrdrePayStockage(int id, OrdrePayStockage ordrePayStockage)
        {
            if (id != ordrePayStockage.Id)
            {
                return BadRequest();
            }

            _context.Entry(ordrePayStockage).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrdrePayStockageExists(id))
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

        // POST: api/OrdrePayStockages
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<OrdrePayStockage>> PostOrdrePayStockage(OrdrePayStockage ordrePayStockage)
        {
            _context.OrdrePayStockages.Add(ordrePayStockage);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrdrePayStockage", new { id = ordrePayStockage.Id }, ordrePayStockage);
        }

        // DELETE: api/OrdrePayStockages/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<OrdrePayStockage>> DeleteOrdrePayStockage(int id)
        {
            var ordrePayStockage = await _context.OrdrePayStockages.FindAsync(id);
            if (ordrePayStockage == null)
            {
                return NotFound();
            }

            _context.OrdrePayStockages.Remove(ordrePayStockage);
            await _context.SaveChangesAsync();

            return ordrePayStockage;
        }

        private bool OrdrePayStockageExists(int id)
        {
            return _context.OrdrePayStockages.Any(e => e.Id == id);
        }
    }
}
