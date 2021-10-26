using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.RetaraitPart;

namespace WebApplicationPlateforme.Controllers.RetraitController
{
    [Route("api/[controller]")]
    [ApiController]
    public class TypeDonsRetraitsController : ControllerBase
    {
        private readonly AdministrativeCommunicationContext _context;

        public TypeDonsRetraitsController(AdministrativeCommunicationContext context)
        {
            _context = context;
        }

        // GET: api/TypeDonsRetraits
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TypeDonsRetrait>>> GetTypeDonsRetraits()
        {
            return await _context.TypeDonsRetraits.ToListAsync();
        }

        // GET: api/TypeDonsRetraits/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TypeDonsRetrait>> GetTypeDonsRetrait(int id)
        {
            var typeDonsRetrait = await _context.TypeDonsRetraits.FindAsync(id);

            if (typeDonsRetrait == null)
            {
                return NotFound();
            }

            return typeDonsRetrait;
        }

        // PUT: api/TypeDonsRetraits/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTypeDonsRetrait(int id, TypeDonsRetrait typeDonsRetrait)
        {
            if (id != typeDonsRetrait.Id)
            {
                return BadRequest();
            }

            _context.Entry(typeDonsRetrait).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TypeDonsRetraitExists(id))
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

        // POST: api/TypeDonsRetraits
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<TypeDonsRetrait>> PostTypeDonsRetrait(TypeDonsRetrait typeDonsRetrait)
        {
            _context.TypeDonsRetraits.Add(typeDonsRetrait);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTypeDonsRetrait", new { id = typeDonsRetrait.Id }, typeDonsRetrait);
        }

        // DELETE: api/TypeDonsRetraits/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TypeDonsRetrait>> DeleteTypeDonsRetrait(int id)
        {
            var typeDonsRetrait = await _context.TypeDonsRetraits.FindAsync(id);
            if (typeDonsRetrait == null)
            {
                return NotFound();
            }

            _context.TypeDonsRetraits.Remove(typeDonsRetrait);
            await _context.SaveChangesAsync();

            return typeDonsRetrait;
        }

        private bool TypeDonsRetraitExists(int id)
        {
            return _context.TypeDonsRetraits.Any(e => e.Id == id);
        }
    }
}
