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
    public class TypeRevBensController : ControllerBase
    {
        private readonly FinanceContext _context;

        public TypeRevBensController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/TypeRevBens
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TypeRevBen>>> GettypeRevBens()
        {
            return await _context.typeRevBens.ToListAsync();
        }

        // GET: api/TypeRevBens/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TypeRevBen>> GetTypeRevBen(int id)
        {
            var typeRevBen = await _context.typeRevBens.FindAsync(id);

            if (typeRevBen == null)
            {
                return NotFound();
            }

            return typeRevBen;
        }

        // PUT: api/TypeRevBens/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTypeRevBen(int id, TypeRevBen typeRevBen)
        {
            if (id != typeRevBen.Id)
            {
                return BadRequest();
            }

            _context.Entry(typeRevBen).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TypeRevBenExists(id))
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

        // POST: api/TypeRevBens
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<TypeRevBen>> PostTypeRevBen(TypeRevBen typeRevBen)
        {
            _context.typeRevBens.Add(typeRevBen);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTypeRevBen", new { id = typeRevBen.Id }, typeRevBen);
        }

        // DELETE: api/TypeRevBens/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TypeRevBen>> DeleteTypeRevBen(int id)
        {
            var typeRevBen = await _context.typeRevBens.FindAsync(id);
            if (typeRevBen == null)
            {
                return NotFound();
            }

            _context.typeRevBens.Remove(typeRevBen);
            await _context.SaveChangesAsync();

            return typeRevBen;
        }

        private bool TypeRevBenExists(int id)
        {
            return _context.typeRevBens.Any(e => e.Id == id);
        }
    }
}
