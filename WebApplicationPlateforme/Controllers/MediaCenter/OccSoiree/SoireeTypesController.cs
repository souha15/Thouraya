using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.MediaCenter.SoireeOccasion;

namespace WebApplicationPlateforme.Controllers.MediaCenter.OccSoiree
{
    [Route("api/[controller]")]
    [ApiController]
    public class SoireeTypesController : ControllerBase
    {
        private readonly FinanceContext _context;

        public SoireeTypesController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/SoireeTypes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SoireeType>>> GetSoireeType()
        {
            return await _context.SoireeType.ToListAsync();
        }

        // GET: api/SoireeTypes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SoireeType>> GetSoireeType(int id)
        {
            var soireeType = await _context.SoireeType.FindAsync(id);

            if (soireeType == null)
            {
                return NotFound();
            }

            return soireeType;
        }

        // PUT: api/SoireeTypes/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSoireeType(int id, SoireeType soireeType)
        {
            if (id != soireeType.Id)
            {
                return BadRequest();
            }

            _context.Entry(soireeType).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SoireeTypeExists(id))
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

        // POST: api/SoireeTypes
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<SoireeType>> PostSoireeType(SoireeType soireeType)
        {
            _context.SoireeType.Add(soireeType);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSoireeType", new { id = soireeType.Id }, soireeType);
        }

        // DELETE: api/SoireeTypes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<SoireeType>> DeleteSoireeType(int id)
        {
            var soireeType = await _context.SoireeType.FindAsync(id);
            if (soireeType == null)
            {
                return NotFound();
            }

            _context.SoireeType.Remove(soireeType);
            await _context.SaveChangesAsync();

            return soireeType;
        }

        private bool SoireeTypeExists(int id)
        {
            return _context.SoireeType.Any(e => e.Id == id);
        }
    }
}
