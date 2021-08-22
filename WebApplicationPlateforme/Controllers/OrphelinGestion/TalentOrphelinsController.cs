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
    public class TalentOrphelinsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public TalentOrphelinsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/TalentOrphelins
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TalentOrphelin>>> GetTalentOrphelins()
        {
            return await _context.TalentOrphelins.ToListAsync();
        }

        // GET: api/TalentOrphelins/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TalentOrphelin>> GetTalentOrphelin(int id)
        {
            var talentOrphelin = await _context.TalentOrphelins.FindAsync(id);

            if (talentOrphelin == null)
            {
                return NotFound();
            }

            return talentOrphelin;
        }

        // PUT: api/TalentOrphelins/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTalentOrphelin(int id, TalentOrphelin talentOrphelin)
        {
            if (id != talentOrphelin.Id)
            {
                return BadRequest();
            }

            _context.Entry(talentOrphelin).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TalentOrphelinExists(id))
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

        // POST: api/TalentOrphelins
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<TalentOrphelin>> PostTalentOrphelin(TalentOrphelin talentOrphelin)
        {
            _context.TalentOrphelins.Add(talentOrphelin);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTalentOrphelin", new { id = talentOrphelin.Id }, talentOrphelin);
        }

        // DELETE: api/TalentOrphelins/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TalentOrphelin>> DeleteTalentOrphelin(int id)
        {
            var talentOrphelin = await _context.TalentOrphelins.FindAsync(id);
            if (talentOrphelin == null)
            {
                return NotFound();
            }

            _context.TalentOrphelins.Remove(talentOrphelin);
            await _context.SaveChangesAsync();

            return talentOrphelin;
        }

        private bool TalentOrphelinExists(int id)
        {
            return _context.TalentOrphelins.Any(e => e.Id == id);
        }
    }
}
