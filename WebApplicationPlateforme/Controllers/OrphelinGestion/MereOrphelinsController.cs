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
    public class MereOrphelinsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public MereOrphelinsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/MereOrphelins
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MereOrphelin>>> GetMereOrphelins()
        {
            return await _context.MereOrphelins.ToListAsync();
        }

        // GET: api/MereOrphelins/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MereOrphelin>> GetMereOrphelin(int id)
        {
            var mereOrphelin = await _context.MereOrphelins.FindAsync(id);

            if (mereOrphelin == null)
            {
                return NotFound();
            }

            return mereOrphelin;
        }

        // PUT: api/MereOrphelins/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMereOrphelin(int id, MereOrphelin mereOrphelin)
        {
            if (id != mereOrphelin.Id)
            {
                return BadRequest();
            }

            _context.Entry(mereOrphelin).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MereOrphelinExists(id))
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

        // POST: api/MereOrphelins
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<MereOrphelin>> PostMereOrphelin(MereOrphelin mereOrphelin)
        {
            _context.MereOrphelins.Add(mereOrphelin);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMereOrphelin", new { id = mereOrphelin.Id }, mereOrphelin);
        }

        // DELETE: api/MereOrphelins/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<MereOrphelin>> DeleteMereOrphelin(int id)
        {
            var mereOrphelin = await _context.MereOrphelins.FindAsync(id);
            if (mereOrphelin == null)
            {
                return NotFound();
            }

            _context.MereOrphelins.Remove(mereOrphelin);
            await _context.SaveChangesAsync();

            return mereOrphelin;
        }

        private bool MereOrphelinExists(int id)
        {
            return _context.MereOrphelins.Any(e => e.Id == id);
        }
    }
}
