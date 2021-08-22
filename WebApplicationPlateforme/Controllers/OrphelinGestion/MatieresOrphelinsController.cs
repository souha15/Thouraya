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
    public class MatieresOrphelinsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public MatieresOrphelinsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/MatieresOrphelins
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MatieresOrphelin>>> GetMatieresOrphelins()
        {
            return await _context.MatieresOrphelins.ToListAsync();
        }

        // GET: api/MatieresOrphelins/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MatieresOrphelin>> GetMatieresOrphelin(int id)
        {
            var matieresOrphelin = await _context.MatieresOrphelins.FindAsync(id);

            if (matieresOrphelin == null)
            {
                return NotFound();
            }

            return matieresOrphelin;
        }

        // PUT: api/MatieresOrphelins/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMatieresOrphelin(int id, MatieresOrphelin matieresOrphelin)
        {
            if (id != matieresOrphelin.Id)
            {
                return BadRequest();
            }

            _context.Entry(matieresOrphelin).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MatieresOrphelinExists(id))
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

        // POST: api/MatieresOrphelins
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<MatieresOrphelin>> PostMatieresOrphelin(MatieresOrphelin matieresOrphelin)
        {
            _context.MatieresOrphelins.Add(matieresOrphelin);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMatieresOrphelin", new { id = matieresOrphelin.Id }, matieresOrphelin);
        }

        // DELETE: api/MatieresOrphelins/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<MatieresOrphelin>> DeleteMatieresOrphelin(int id)
        {
            var matieresOrphelin = await _context.MatieresOrphelins.FindAsync(id);
            if (matieresOrphelin == null)
            {
                return NotFound();
            }

            _context.MatieresOrphelins.Remove(matieresOrphelin);
            await _context.SaveChangesAsync();

            return matieresOrphelin;
        }

        private bool MatieresOrphelinExists(int id)
        {
            return _context.MatieresOrphelins.Any(e => e.Id == id);
        }
    }
}
