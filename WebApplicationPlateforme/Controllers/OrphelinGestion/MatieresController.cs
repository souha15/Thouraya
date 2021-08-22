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
    public class MatieresController : ControllerBase
    {
        private readonly FinanceContext _context;

        public MatieresController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/Matieres
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Matieres>>> GetMatieres()
        {
            return await _context.Matieres.ToListAsync();
        }

        // GET: api/Matieres/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Matieres>> GetMatieres(int id)
        {
            var matieres = await _context.Matieres.FindAsync(id);

            if (matieres == null)
            {
                return NotFound();
            }

            return matieres;
        }

        // PUT: api/Matieres/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMatieres(int id, Matieres matieres)
        {
            if (id != matieres.Id)
            {
                return BadRequest();
            }

            _context.Entry(matieres).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MatieresExists(id))
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

        // POST: api/Matieres
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Matieres>> PostMatieres(Matieres matieres)
        {
            _context.Matieres.Add(matieres);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMatieres", new { id = matieres.Id }, matieres);
        }

        // DELETE: api/Matieres/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Matieres>> DeleteMatieres(int id)
        {
            var matieres = await _context.Matieres.FindAsync(id);
            if (matieres == null)
            {
                return NotFound();
            }

            _context.Matieres.Remove(matieres);
            await _context.SaveChangesAsync();

            return matieres;
        }

        private bool MatieresExists(int id)
        {
            return _context.Matieres.Any(e => e.Id == id);
        }
    }
}
