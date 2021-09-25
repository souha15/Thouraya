using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.MediaCenter.PartageMedia;

namespace WebApplicationPlateforme.Controllers.MediaCenter.ParMedia
{
    [Route("api/[controller]")]
    [ApiController]
    public class PartageFilesController : ControllerBase
    {
        private readonly FinanceContext _context;

        public PartageFilesController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/PartageFiles
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PartageFiles>>> GetPartageFiles()
        {
            return await _context.PartageFiles.ToListAsync();
        }

        // GET: api/PartageFiles/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PartageFiles>> GetPartageFiles(int id)
        {
            var partageFiles = await _context.PartageFiles.FindAsync(id);

            if (partageFiles == null)
            {
                return NotFound();
            }

            return partageFiles;
        }

        // PUT: api/PartageFiles/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPartageFiles(int id, PartageFiles partageFiles)
        {
            if (id != partageFiles.Id)
            {
                return BadRequest();
            }

            _context.Entry(partageFiles).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PartageFilesExists(id))
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

        // POST: api/PartageFiles
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<PartageFiles>> PostPartageFiles(PartageFiles partageFiles)
        {
            _context.PartageFiles.Add(partageFiles);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPartageFiles", new { id = partageFiles.Id }, partageFiles);
        }

        // DELETE: api/PartageFiles/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<PartageFiles>> DeletePartageFiles(int id)
        {
            var partageFiles = await _context.PartageFiles.FindAsync(id);
            if (partageFiles == null)
            {
                return NotFound();
            }

            _context.PartageFiles.Remove(partageFiles);
            await _context.SaveChangesAsync();

            return partageFiles;
        }

        private bool PartageFilesExists(int id)
        {
            return _context.PartageFiles.Any(e => e.Id == id);
        }
    }
}
