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
    public class TypeMaisonsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public TypeMaisonsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/TypeMaisons
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TypeMaison>>> GettypeMaisons()
        {
            return await _context.typeMaisons.ToListAsync();
        }

        // GET: api/TypeMaisons/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TypeMaison>> GetTypeMaison(int id)
        {
            var typeMaison = await _context.typeMaisons.FindAsync(id);

            if (typeMaison == null)
            {
                return NotFound();
            }

            return typeMaison;
        }

        // PUT: api/TypeMaisons/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTypeMaison(int id, TypeMaison typeMaison)
        {
            if (id != typeMaison.Id)
            {
                return BadRequest();
            }

            _context.Entry(typeMaison).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TypeMaisonExists(id))
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

        // POST: api/TypeMaisons
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<TypeMaison>> PostTypeMaison(TypeMaison typeMaison)
        {
            _context.typeMaisons.Add(typeMaison);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTypeMaison", new { id = typeMaison.Id }, typeMaison);
        }

        // DELETE: api/TypeMaisons/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TypeMaison>> DeleteTypeMaison(int id)
        {
            var typeMaison = await _context.typeMaisons.FindAsync(id);
            if (typeMaison == null)
            {
                return NotFound();
            }

            _context.typeMaisons.Remove(typeMaison);
            await _context.SaveChangesAsync();

            return typeMaison;
        }

        private bool TypeMaisonExists(int id)
        {
            return _context.typeMaisons.Any(e => e.Id == id);
        }
    }
}
