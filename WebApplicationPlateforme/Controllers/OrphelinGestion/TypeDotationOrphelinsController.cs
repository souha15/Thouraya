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
    public class TypeDotationOrphelinsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public TypeDotationOrphelinsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/TypeDotationOrphelins
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TypeDotationOrphelin>>> GetTypeDotationOrphelins()
        {
            return await _context.TypeDotationOrphelins.ToListAsync();
        }

        // GET: api/TypeDotationOrphelins/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TypeDotationOrphelin>> GetTypeDotationOrphelin(int id)
        {
            var typeDotationOrphelin = await _context.TypeDotationOrphelins.FindAsync(id);

            if (typeDotationOrphelin == null)
            {
                return NotFound();
            }

            return typeDotationOrphelin;
        }

        // PUT: api/TypeDotationOrphelins/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTypeDotationOrphelin(int id, TypeDotationOrphelin typeDotationOrphelin)
        {
            if (id != typeDotationOrphelin.Id)
            {
                return BadRequest();
            }

            _context.Entry(typeDotationOrphelin).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TypeDotationOrphelinExists(id))
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

        // POST: api/TypeDotationOrphelins
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<TypeDotationOrphelin>> PostTypeDotationOrphelin(TypeDotationOrphelin typeDotationOrphelin)
        {
            _context.TypeDotationOrphelins.Add(typeDotationOrphelin);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTypeDotationOrphelin", new { id = typeDotationOrphelin.Id }, typeDotationOrphelin);
        }

        // DELETE: api/TypeDotationOrphelins/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TypeDotationOrphelin>> DeleteTypeDotationOrphelin(int id)
        {
            var typeDotationOrphelin = await _context.TypeDotationOrphelins.FindAsync(id);
            if (typeDotationOrphelin == null)
            {
                return NotFound();
            }

            _context.TypeDotationOrphelins.Remove(typeDotationOrphelin);
            await _context.SaveChangesAsync();

            return typeDotationOrphelin;
        }

        private bool TypeDotationOrphelinExists(int id)
        {
            return _context.TypeDotationOrphelins.Any(e => e.Id == id);
        }
    }
}
