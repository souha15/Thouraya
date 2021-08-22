using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.voitures;

namespace WebApplicationPlateforme.Controllers.voitures
{
    [Route("api/[controller]")]
    [ApiController]
    public class TypeVoituresController : ControllerBase
    {
        private readonly FinanceContext _context;

        public TypeVoituresController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/TypeVoitures
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TypeVoiture>>> GettypeVoitures()
        {
            return await _context.typeVoitures.ToListAsync();
        }

        // GET: api/TypeVoitures/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TypeVoiture>> GetTypeVoiture(int id)
        {
            var typeVoiture = await _context.typeVoitures.FindAsync(id);

            if (typeVoiture == null)
            {
                return NotFound();
            }

            return typeVoiture;
        }

        // PUT: api/TypeVoitures/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTypeVoiture(int id, TypeVoiture typeVoiture)
        {
            if (id != typeVoiture.Id)
            {
                return BadRequest();
            }

            _context.Entry(typeVoiture).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TypeVoitureExists(id))
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

        // POST: api/TypeVoitures
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<TypeVoiture>> PostTypeVoiture(TypeVoiture typeVoiture)
        {
            _context.typeVoitures.Add(typeVoiture);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTypeVoiture", new { id = typeVoiture.Id }, typeVoiture);
        }

        // DELETE: api/TypeVoitures/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TypeVoiture>> DeleteTypeVoiture(int id)
        {
            var typeVoiture = await _context.typeVoitures.FindAsync(id);
            if (typeVoiture == null)
            {
                return NotFound();
            }

            _context.typeVoitures.Remove(typeVoiture);
            await _context.SaveChangesAsync();

            return typeVoiture;
        }

        private bool TypeVoitureExists(int id)
        {
            return _context.typeVoitures.Any(e => e.Id == id);
        }
    }
}
