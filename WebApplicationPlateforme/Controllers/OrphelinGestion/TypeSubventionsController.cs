using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Orphelin;

namespace WebApplicationPlateforme.Controllers.OrphelinGestion
{
    [Route("api/[controller]")]
    [ApiController]
    public class TypeSubventionsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public TypeSubventionsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/TypeSubventions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TypeSubvention>>> GetTypeSubventions()
        {
            return await _context.TypeSubventions.ToListAsync();
        }

        // GET: api/TypeSubventions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TypeSubvention>> GetTypeSubvention(int id)
        {
            var typeSubvention = await _context.TypeSubventions.FindAsync(id);

            if (typeSubvention == null)
            {
                return NotFound();
            }

            return typeSubvention;
        }

        // PUT: api/TypeSubventions/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTypeSubvention(int id, TypeSubvention typeSubvention)
        {
            if (id != typeSubvention.Id)
            {
                return BadRequest();
            }

            _context.Entry(typeSubvention).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TypeSubventionExists(id))
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

        // POST: api/TypeSubventions
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<TypeSubvention>> PostTypeSubvention(TypeSubvention typeSubvention)
        {
            _context.TypeSubventions.Add(typeSubvention);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTypeSubvention", new { id = typeSubvention.Id }, typeSubvention);
        }

        // DELETE: api/TypeSubventions/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TypeSubvention>> DeleteTypeSubvention(int id)
        {
            var typeSubvention = await _context.TypeSubventions.FindAsync(id);
            if (typeSubvention == null)
            {
                return NotFound();
            }

            _context.TypeSubventions.Remove(typeSubvention);
            await _context.SaveChangesAsync();

            return typeSubvention;
        }

        private bool TypeSubventionExists(int id)
        {
            return _context.TypeSubventions.Any(e => e.Id == id);
        }
    }
}
