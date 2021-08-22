using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Dotations;

namespace WebApplicationPlateforme.Controllers.DotationsControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class typeDotationsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public typeDotationsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/typeDotations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<typeDotation>>> GettypeDotations()
        {
            return await _context.typeDotations.ToListAsync();
        }

        // GET: api/typeDotations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<typeDotation>> GettypeDotation(int id)
        {
            var typeDotation = await _context.typeDotations.FindAsync(id);

            if (typeDotation == null)
            {
                return NotFound();
            }

            return typeDotation;
        }

        // PUT: api/typeDotations/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PuttypeDotation(int id, typeDotation typeDotation)
        {
            if (id != typeDotation.Id)
            {
                return BadRequest();
            }

            _context.Entry(typeDotation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!typeDotationExists(id))
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

        // POST: api/typeDotations
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<typeDotation>> PosttypeDotation(typeDotation typeDotation)
        {
            _context.typeDotations.Add(typeDotation);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GettypeDotation", new { id = typeDotation.Id }, typeDotation);
        }

        // DELETE: api/typeDotations/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<typeDotation>> DeletetypeDotation(int id)
        {
            var typeDotation = await _context.typeDotations.FindAsync(id);
            if (typeDotation == null)
            {
                return NotFound();
            }

            _context.typeDotations.Remove(typeDotation);
            await _context.SaveChangesAsync();

            return typeDotation;
        }

        private bool typeDotationExists(int id)
        {
            return _context.typeDotations.Any(e => e.Id == id);
        }
    }
}
