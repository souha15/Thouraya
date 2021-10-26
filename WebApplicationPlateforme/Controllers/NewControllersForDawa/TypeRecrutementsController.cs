using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Ressource_Humaines;

namespace WebApplicationPlateforme.Controllers.NewControllersForDawa
{
    [Route("api/[controller]")]
    [ApiController]
    public class TypeRecrutementsController : ControllerBase
    {
        private readonly DawaaContext _context;

        public TypeRecrutementsController(DawaaContext context)
        {
            _context = context;
        }

        // GET: api/TypeRecrutements
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TypeRecrutement>>> GetTypeRecrutement()
        {
            return await _context.TypeRecrutement.ToListAsync();
        }

        // GET: api/TypeRecrutements/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TypeRecrutement>> GetTypeRecrutement(int id)
        {
            var typeRecrutement = await _context.TypeRecrutement.FindAsync(id);

            if (typeRecrutement == null)
            {
                return NotFound();
            }

            return typeRecrutement;
        }

        // PUT: api/TypeRecrutements/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTypeRecrutement(int id, TypeRecrutement typeRecrutement)
        {
            if (id != typeRecrutement.Id)
            {
                return BadRequest();
            }

            _context.Entry(typeRecrutement).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TypeRecrutementExists(id))
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

        // POST: api/TypeRecrutements
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<TypeRecrutement>> PostTypeRecrutement(TypeRecrutement typeRecrutement)
        {
            _context.TypeRecrutement.Add(typeRecrutement);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTypeRecrutement", new { id = typeRecrutement.Id }, typeRecrutement);
        }

        // DELETE: api/TypeRecrutements/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TypeRecrutement>> DeleteTypeRecrutement(int id)
        {
            var typeRecrutement = await _context.TypeRecrutement.FindAsync(id);
            if (typeRecrutement == null)
            {
                return NotFound();
            }

            _context.TypeRecrutement.Remove(typeRecrutement);
            await _context.SaveChangesAsync();

            return typeRecrutement;
        }

        private bool TypeRecrutementExists(int id)
        {
            return _context.TypeRecrutement.Any(e => e.Id == id);
        }
    }
}
