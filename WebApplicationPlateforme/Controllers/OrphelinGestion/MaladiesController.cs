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
    public class MaladiesController : ControllerBase
    {
        private readonly FinanceContext _context;

        public MaladiesController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/Maladies
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Maladie>>> GetMaladies()
        {
            return await _context.Maladies.ToListAsync();
        }

        // GET: api/Maladies/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Maladie>> GetMaladie(int id)
        {
            var maladie = await _context.Maladies.FindAsync(id);

            if (maladie == null)
            {
                return NotFound();
            }

            return maladie;
        }

        // PUT: api/Maladies/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMaladie(int id, Maladie maladie)
        {
            if (id != maladie.Id)
            {
                return BadRequest();
            }

            _context.Entry(maladie).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MaladieExists(id))
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

        // POST: api/Maladies
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Maladie>> PostMaladie(Maladie maladie)
        {
            _context.Maladies.Add(maladie);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMaladie", new { id = maladie.Id }, maladie);
        }

        // DELETE: api/Maladies/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Maladie>> DeleteMaladie(int id)
        {
            var maladie = await _context.Maladies.FindAsync(id);
            if (maladie == null)
            {
                return NotFound();
            }

            _context.Maladies.Remove(maladie);
            await _context.SaveChangesAsync();

            return maladie;
        }

        private bool MaladieExists(int id)
        {
            return _context.Maladies.Any(e => e.Id == id);
        }
    }
}
