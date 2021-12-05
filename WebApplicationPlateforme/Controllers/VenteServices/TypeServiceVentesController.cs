using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.VenteServices;

namespace WebApplicationPlateforme.Controllers.VenteServices
{
    [Route("api/[controller]")]
    [ApiController]
    public class TypeServiceVentesController : ControllerBase
    {
        private readonly DawaaContext _context;

        public TypeServiceVentesController(DawaaContext context)
        {
            _context = context;
        }

        // GET: api/TypeServiceVentes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TypeServiceVente>>> GetTypeServiceVentes()
        {
            return await _context.TypeServiceVentes.ToListAsync();
        }

        // GET: api/TypeServiceVentes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TypeServiceVente>> GetTypeServiceVente(int id)
        {
            var typeServiceVente = await _context.TypeServiceVentes.FindAsync(id);

            if (typeServiceVente == null)
            {
                return NotFound();
            }

            return typeServiceVente;
        }

        // PUT: api/TypeServiceVentes/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTypeServiceVente(int id, TypeServiceVente typeServiceVente)
        {
            if (id != typeServiceVente.Id)
            {
                return BadRequest();
            }

            _context.Entry(typeServiceVente).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TypeServiceVenteExists(id))
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

        // POST: api/TypeServiceVentes
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<TypeServiceVente>> PostTypeServiceVente(TypeServiceVente typeServiceVente)
        {
            _context.TypeServiceVentes.Add(typeServiceVente);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTypeServiceVente", new { id = typeServiceVente.Id }, typeServiceVente);
        }

        // DELETE: api/TypeServiceVentes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TypeServiceVente>> DeleteTypeServiceVente(int id)
        {
            var typeServiceVente = await _context.TypeServiceVentes.FindAsync(id);
            if (typeServiceVente == null)
            {
                return NotFound();
            }

            _context.TypeServiceVentes.Remove(typeServiceVente);
            await _context.SaveChangesAsync();

            return typeServiceVente;
        }

        private bool TypeServiceVenteExists(int id)
        {
            return _context.TypeServiceVentes.Any(e => e.Id == id);
        }
    }
}
