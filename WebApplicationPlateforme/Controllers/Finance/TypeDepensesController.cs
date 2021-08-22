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
    public class TypeDepensesController : ControllerBase
    {
        private readonly FinanceContext _context;

        public TypeDepensesController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/TypeDepenses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TypeDepense>>> GettypeDepenses()
        {
            return await _context.typeDepenses.ToListAsync();
        }

        // GET: api/TypeDepenses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TypeDepense>> GetTypeDepense(int id)
        {
            var typeDepense = await _context.typeDepenses.FindAsync(id);

            if (typeDepense == null)
            {
                return NotFound();
            }

            return typeDepense;
        }

        // PUT: api/TypeDepenses/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTypeDepense(int id, TypeDepense typeDepense)
        {
            if (id != typeDepense.Id)
            {
                return BadRequest();
            }

            _context.Entry(typeDepense).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TypeDepenseExists(id))
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

        // POST: api/TypeDepenses
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<TypeDepense>> PostTypeDepense(TypeDepense typeDepense)
        {
            _context.typeDepenses.Add(typeDepense);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTypeDepense", new { id = typeDepense.Id }, typeDepense);
        }

        // DELETE: api/TypeDepenses/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TypeDepense>> DeleteTypeDepense(int id)
        {
            var typeDepense = await _context.typeDepenses.FindAsync(id);
            if (typeDepense == null)
            {
                return NotFound();
            }

            _context.typeDepenses.Remove(typeDepense);
            await _context.SaveChangesAsync();

            return typeDepense;
        }

        private bool TypeDepenseExists(int id)
        {
            return _context.typeDepenses.Any(e => e.Id == id);
        }
    }
}
