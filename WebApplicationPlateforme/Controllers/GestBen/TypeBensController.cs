using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.gestion_beneficiaire;

namespace WebApplicationPlateforme.Controllers.GestBen
{
    [Route("api/[controller]")]
    [ApiController]
    public class TypeBensController : ControllerBase
    {
        private readonly FinanceContext _context;

        public TypeBensController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/TypeBens
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TypeBen>>> GettypeBens()
        {
            return await _context.typeBens.ToListAsync();
        }

        // GET: api/TypeBens/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TypeBen>> GetTypeBen(int id)
        {
            var typeBen = await _context.typeBens.FindAsync(id);

            if (typeBen == null)
            {
                return NotFound();
            }

            return typeBen;
        }

        // PUT: api/TypeBens/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTypeBen(int id, TypeBen typeBen)
        {
            if (id != typeBen.Id)
            {
                return BadRequest();
            }

            _context.Entry(typeBen).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TypeBenExists(id))
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

        // POST: api/TypeBens
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<TypeBen>> PostTypeBen(TypeBen typeBen)
        {
            _context.typeBens.Add(typeBen);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTypeBen", new { id = typeBen.Id }, typeBen);
        }

        // DELETE: api/TypeBens/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TypeBen>> DeleteTypeBen(int id)
        {
            var typeBen = await _context.typeBens.FindAsync(id);
            if (typeBen == null)
            {
                return NotFound();
            }

            _context.typeBens.Remove(typeBen);
            await _context.SaveChangesAsync();

            return typeBen;
        }

        private bool TypeBenExists(int id)
        {
            return _context.typeBens.Any(e => e.Id == id);
        }
    }
}
