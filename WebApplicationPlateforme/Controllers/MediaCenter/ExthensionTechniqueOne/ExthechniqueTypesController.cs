using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.MediaCenter.ExtensionTechnique;

namespace WebApplicationPlateforme.Controllers.MediaCenter.ExthensionTechniqueOne
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExthechniqueTypesController : ControllerBase
    {
        private readonly FinanceContext _context;

        public ExthechniqueTypesController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/ExthechniqueTypes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ExthechniqueType>>> GetExthechniqueType()
        {
            return await _context.ExthechniqueType.ToListAsync();
        }

        // GET: api/ExthechniqueTypes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ExthechniqueType>> GetExthechniqueType(int id)
        {
            var exthechniqueType = await _context.ExthechniqueType.FindAsync(id);

            if (exthechniqueType == null)
            {
                return NotFound();
            }

            return exthechniqueType;
        }

        // PUT: api/ExthechniqueTypes/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutExthechniqueType(int id, ExthechniqueType exthechniqueType)
        {
            if (id != exthechniqueType.Id)
            {
                return BadRequest();
            }

            _context.Entry(exthechniqueType).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ExthechniqueTypeExists(id))
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

        // POST: api/ExthechniqueTypes
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ExthechniqueType>> PostExthechniqueType(ExthechniqueType exthechniqueType)
        {
            _context.ExthechniqueType.Add(exthechniqueType);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetExthechniqueType", new { id = exthechniqueType.Id }, exthechniqueType);
        }

        // DELETE: api/ExthechniqueTypes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ExthechniqueType>> DeleteExthechniqueType(int id)
        {
            var exthechniqueType = await _context.ExthechniqueType.FindAsync(id);
            if (exthechniqueType == null)
            {
                return NotFound();
            }

            _context.ExthechniqueType.Remove(exthechniqueType);
            await _context.SaveChangesAsync();

            return exthechniqueType;
        }

        private bool ExthechniqueTypeExists(int id)
        {
            return _context.ExthechniqueType.Any(e => e.Id == id);
        }
    }
}
