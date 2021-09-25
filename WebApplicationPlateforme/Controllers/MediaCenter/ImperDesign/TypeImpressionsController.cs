using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.MediaCenter.ImpressionDesign;

namespace WebApplicationPlateforme.Controllers.MediaCenter.ImperDesign
{
    [Route("api/[controller]")]
    [ApiController]
    public class TypeImpressionsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public TypeImpressionsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/TypeImpressions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TypeImpression>>> GetTypeImpression()
        {
            return await _context.TypeImpression.ToListAsync();
        }

        // GET: api/TypeImpressions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TypeImpression>> GetTypeImpression(int id)
        {
            var typeImpression = await _context.TypeImpression.FindAsync(id);

            if (typeImpression == null)
            {
                return NotFound();
            }

            return typeImpression;
        }

        // PUT: api/TypeImpressions/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTypeImpression(int id, TypeImpression typeImpression)
        {
            if (id != typeImpression.Id)
            {
                return BadRequest();
            }

            _context.Entry(typeImpression).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TypeImpressionExists(id))
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

        // POST: api/TypeImpressions
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<TypeImpression>> PostTypeImpression(TypeImpression typeImpression)
        {
            _context.TypeImpression.Add(typeImpression);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTypeImpression", new { id = typeImpression.Id }, typeImpression);
        }

        // DELETE: api/TypeImpressions/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TypeImpression>> DeleteTypeImpression(int id)
        {
            var typeImpression = await _context.TypeImpression.FindAsync(id);
            if (typeImpression == null)
            {
                return NotFound();
            }

            _context.TypeImpression.Remove(typeImpression);
            await _context.SaveChangesAsync();

            return typeImpression;
        }

        private bool TypeImpressionExists(int id)
        {
            return _context.TypeImpression.Any(e => e.Id == id);
        }
    }
}
