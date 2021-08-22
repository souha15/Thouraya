using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Finance;

namespace WebApplicationPlateforme.Controllers.Finance
{
    [Route("api/[controller]")]
    [ApiController]
    public class TypeFacturesController : ControllerBase
    {
        private readonly FinanceContext _context;

        public TypeFacturesController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/TypeFactures
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TypeFacture>>> GettypeFactures()
        {
            return await _context.typeFactures.ToListAsync();
        }

        // GET: api/TypeFactures/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TypeFacture>> GetTypeFacture(int id)
        {
            var typeFacture = await _context.typeFactures.FindAsync(id);

            if (typeFacture == null)
            {
                return NotFound();
            }

            return typeFacture;
        }

        // PUT: api/TypeFactures/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTypeFacture(int id, TypeFacture typeFacture)
        {
            if (id != typeFacture.Id)
            {
                return BadRequest();
            }

            _context.Entry(typeFacture).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TypeFactureExists(id))
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

        // POST: api/TypeFactures
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<TypeFacture>> PostTypeFacture(TypeFacture typeFacture)
        {
            _context.typeFactures.Add(typeFacture);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTypeFacture", new { id = typeFacture.Id }, typeFacture);
        }

        // DELETE: api/TypeFactures/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TypeFacture>> DeleteTypeFacture(int id)
        {
            var typeFacture = await _context.typeFactures.FindAsync(id);
            if (typeFacture == null)
            {
                return NotFound();
            }

            _context.typeFactures.Remove(typeFacture);
            await _context.SaveChangesAsync();

            return typeFacture;
        }

        private bool TypeFactureExists(int id)
        {
            return _context.typeFactures.Any(e => e.Id == id);
        }
    }
}
