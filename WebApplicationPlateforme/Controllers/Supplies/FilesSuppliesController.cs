using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Supplies;

namespace WebApplicationPlateforme.Controllers.Supplies
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilesSuppliesController : ControllerBase
    {
        private readonly FinanceContext _context;

        public FilesSuppliesController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/FilesSupplies
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FilesSupplie>>> GetfilesSupplies()
        {
            return await _context.filesSupplies.ToListAsync();
        }

        // GET: api/FilesSupplies/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FilesSupplie>> GetFilesSupplie(int id)
        {
            var filesSupplie = await _context.filesSupplies.FindAsync(id);

            if (filesSupplie == null)
            {
                return NotFound();
            }

            return filesSupplie;
        }

        // PUT: api/FilesSupplies/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFilesSupplie(int id, FilesSupplie filesSupplie)
        {
            if (id != filesSupplie.Id)
            {
                return BadRequest();
            }

            _context.Entry(filesSupplie).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FilesSupplieExists(id))
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

        // POST: api/FilesSupplies
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<FilesSupplie>> PostFilesSupplie(FilesSupplie filesSupplie)
        {
            _context.filesSupplies.Add(filesSupplie);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFilesSupplie", new { id = filesSupplie.Id }, filesSupplie);
        }

        // DELETE: api/FilesSupplies/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<FilesSupplie>> DeleteFilesSupplie(int id)
        {
            var filesSupplie = await _context.filesSupplies.FindAsync(id);
            if (filesSupplie == null)
            {
                return NotFound();
            }

            _context.filesSupplies.Remove(filesSupplie);
            await _context.SaveChangesAsync();

            return filesSupplie;
        }

        private bool FilesSupplieExists(int id)
        {
            return _context.filesSupplies.Any(e => e.Id == id);
        }
    }
}
