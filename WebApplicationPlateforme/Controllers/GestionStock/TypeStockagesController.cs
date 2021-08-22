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
    public class TypeStockagesController : ControllerBase
    {
        private readonly FinanceContext _context;

        public TypeStockagesController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/TypeStockages
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TypeStockage>>> GetTypeStockages()
        {
            return await _context.TypeStockages.ToListAsync();
        }

        // GET: api/TypeStockages/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TypeStockage>> GetTypeStockage(int id)
        {
            var typeStockage = await _context.TypeStockages.FindAsync(id);

            if (typeStockage == null)
            {
                return NotFound();
            }

            return typeStockage;
        }

        // PUT: api/TypeStockages/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTypeStockage(int id, TypeStockage typeStockage)
        {
            if (id != typeStockage.Id)
            {
                return BadRequest();
            }

            _context.Entry(typeStockage).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TypeStockageExists(id))
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

        // POST: api/TypeStockages
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<TypeStockage>> PostTypeStockage(TypeStockage typeStockage)
        {
            _context.TypeStockages.Add(typeStockage);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTypeStockage", new { id = typeStockage.Id }, typeStockage);
        }

        // DELETE: api/TypeStockages/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TypeStockage>> DeleteTypeStockage(int id)
        {
            var typeStockage = await _context.TypeStockages.FindAsync(id);
            if (typeStockage == null)
            {
                return NotFound();
            }

            _context.TypeStockages.Remove(typeStockage);
            await _context.SaveChangesAsync();

            return typeStockage;
        }

        private bool TypeStockageExists(int id)
        {
            return _context.TypeStockages.Any(e => e.Id == id);
        }
    }
}
