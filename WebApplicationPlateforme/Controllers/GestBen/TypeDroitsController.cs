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
    public class TypeDroitsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public TypeDroitsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/TypeDroits
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TypeDroit>>> GettypeDroits()
        {
            return await _context.typeDroits.ToListAsync();
        }

        // GET: api/TypeDroits/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TypeDroit>> GetTypeDroit(int id)
        {
            var typeDroit = await _context.typeDroits.FindAsync(id);

            if (typeDroit == null)
            {
                return NotFound();
            }

            return typeDroit;
        }

        // PUT: api/TypeDroits/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTypeDroit(int id, TypeDroit typeDroit)
        {
            if (id != typeDroit.Id)
            {
                return BadRequest();
            }

            _context.Entry(typeDroit).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TypeDroitExists(id))
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

        // POST: api/TypeDroits
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<TypeDroit>> PostTypeDroit(TypeDroit typeDroit)
        {
            _context.typeDroits.Add(typeDroit);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTypeDroit", new { id = typeDroit.Id }, typeDroit);
        }

        // DELETE: api/TypeDroits/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TypeDroit>> DeleteTypeDroit(int id)
        {
            var typeDroit = await _context.typeDroits.FindAsync(id);
            if (typeDroit == null)
            {
                return NotFound();
            }

            _context.typeDroits.Remove(typeDroit);
            await _context.SaveChangesAsync();

            return typeDroit;
        }

        private bool TypeDroitExists(int id)
        {
            return _context.typeDroits.Any(e => e.Id == id);
        }
    }
}
