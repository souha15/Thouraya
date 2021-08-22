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
    public class TuteurOrphelinsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public TuteurOrphelinsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/TuteurOrphelins
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TuteurOrphelin>>> GetTuteurOrphelins()
        {
            return await _context.TuteurOrphelins.ToListAsync();
        }

        // GET: api/TuteurOrphelins/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TuteurOrphelin>> GetTuteurOrphelin(int id)
        {
            var tuteurOrphelin = await _context.TuteurOrphelins.FindAsync(id);

            if (tuteurOrphelin == null)
            {
                return NotFound();
            }

            return tuteurOrphelin;
        }

        // PUT: api/TuteurOrphelins/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTuteurOrphelin(int id, TuteurOrphelin tuteurOrphelin)
        {
            if (id != tuteurOrphelin.Id)
            {
                return BadRequest();
            }

            _context.Entry(tuteurOrphelin).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TuteurOrphelinExists(id))
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

        // POST: api/TuteurOrphelins
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<TuteurOrphelin>> PostTuteurOrphelin(TuteurOrphelin tuteurOrphelin)
        {
            _context.TuteurOrphelins.Add(tuteurOrphelin);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTuteurOrphelin", new { id = tuteurOrphelin.Id }, tuteurOrphelin);
        }

        // DELETE: api/TuteurOrphelins/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TuteurOrphelin>> DeleteTuteurOrphelin(int id)
        {
            var tuteurOrphelin = await _context.TuteurOrphelins.FindAsync(id);
            if (tuteurOrphelin == null)
            {
                return NotFound();
            }

            _context.TuteurOrphelins.Remove(tuteurOrphelin);
            await _context.SaveChangesAsync();

            return tuteurOrphelin;
        }

        private bool TuteurOrphelinExists(int id)
        {
            return _context.TuteurOrphelins.Any(e => e.Id == id);
        }
    }
}
