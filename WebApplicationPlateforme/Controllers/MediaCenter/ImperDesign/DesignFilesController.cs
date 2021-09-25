using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.MediaCenter.ImpressionDesign;

namespace WebApplicationPlateforme.Controllers.MediaCenter.ImperDesign
{
    [Route("api/[controller]")]
    [ApiController]
    public class DesignFilesController : ControllerBase
    {
        private readonly FinanceContext _context;

        public DesignFilesController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/DesignFiles
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DesignFiles>>> GetDesignFiles()
        {
            return await _context.DesignFiles.ToListAsync();
        }

        // GET: api/DesignFiles/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DesignFiles>> GetDesignFiles(int id)
        {
            var designFiles = await _context.DesignFiles.FindAsync(id);

            if (designFiles == null)
            {
                return NotFound();
            }

            return designFiles;
        }

        // PUT: api/DesignFiles/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDesignFiles(int id, DesignFiles designFiles)
        {
            if (id != designFiles.Id)
            {
                return BadRequest();
            }

            _context.Entry(designFiles).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DesignFilesExists(id))
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

        // POST: api/DesignFiles
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<DesignFiles>> PostDesignFiles(DesignFiles designFiles)
        {
            _context.DesignFiles.Add(designFiles);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDesignFiles", new { id = designFiles.Id }, designFiles);
        }

        // DELETE: api/DesignFiles/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<DesignFiles>> DeleteDesignFiles(int id)
        {
            var designFiles = await _context.DesignFiles.FindAsync(id);
            if (designFiles == null)
            {
                return NotFound();
            }

            _context.DesignFiles.Remove(designFiles);
            await _context.SaveChangesAsync();

            return designFiles;
        }

        private bool DesignFilesExists(int id)
        {
            return _context.DesignFiles.Any(e => e.Id == id);
        }
    }
}
