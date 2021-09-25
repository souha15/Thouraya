using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.MediaCenter.Montage;

namespace WebApplicationPlateforme.Controllers.MediaCenter.MontPart
{
    [Route("api/[controller]")]
    [ApiController]
    public class montageFilesController : ControllerBase
    {
        private readonly FinanceContext _context;

        public montageFilesController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/montageFiles
        [HttpGet]
        public async Task<ActionResult<IEnumerable<montageFiles>>> GetmontageFiles()
        {
            return await _context.montageFiles.ToListAsync();
        }

        // GET: api/montageFiles/5
        [HttpGet("{id}")]
        public async Task<ActionResult<montageFiles>> GetmontageFiles(int id)
        {
            var montageFiles = await _context.montageFiles.FindAsync(id);

            if (montageFiles == null)
            {
                return NotFound();
            }

            return montageFiles;
        }

        // PUT: api/montageFiles/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutmontageFiles(int id, montageFiles montageFiles)
        {
            if (id != montageFiles.Id)
            {
                return BadRequest();
            }

            _context.Entry(montageFiles).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!montageFilesExists(id))
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

        // POST: api/montageFiles
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<montageFiles>> PostmontageFiles(montageFiles montageFiles)
        {
            _context.montageFiles.Add(montageFiles);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetmontageFiles", new { id = montageFiles.Id }, montageFiles);
        }

        // DELETE: api/montageFiles/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<montageFiles>> DeletemontageFiles(int id)
        {
            var montageFiles = await _context.montageFiles.FindAsync(id);
            if (montageFiles == null)
            {
                return NotFound();
            }

            _context.montageFiles.Remove(montageFiles);
            await _context.SaveChangesAsync();

            return montageFiles;
        }

        private bool montageFilesExists(int id)
        {
            return _context.montageFiles.Any(e => e.Id == id);
        }
    }
}
