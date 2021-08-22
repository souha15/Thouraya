using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.gestion_beneficiaire;

namespace WebApplicationPlateforme.Controllers.GestBen
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilesBensController : ControllerBase
    {
        private readonly FinanceContext _context;

        public FilesBensController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/FilesBens
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FilesBen>>> GetfilesBens()
        {
            return await _context.filesBens.ToListAsync();
        }

        // GET: api/FilesBens/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FilesBen>> GetFilesBen(int id)
        {
            var filesBen = await _context.filesBens.FindAsync(id);

            if (filesBen == null)
            {
                return NotFound();
            }

            return filesBen;
        }

        // PUT: api/FilesBens/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFilesBen(int id, FilesBen filesBen)
        {
            if (id != filesBen.Id)
            {
                return BadRequest();
            }

            _context.Entry(filesBen).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FilesBenExists(id))
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

        // POST: api/FilesBens
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<FilesBen>> PostFilesBen(FilesBen filesBen)
        {
            _context.filesBens.Add(filesBen);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFilesBen", new { id = filesBen.Id }, filesBen);
        }

        // DELETE: api/FilesBens/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<FilesBen>> DeleteFilesBen(int id)
        {
            var filesBen = await _context.filesBens.FindAsync(id);
            if (filesBen == null)
            {
                return NotFound();
            }

            _context.filesBens.Remove(filesBen);
            await _context.SaveChangesAsync();

            return filesBen;
        }

        private bool FilesBenExists(int id)
        {
            return _context.filesBens.Any(e => e.Id == id);
        }
    }
}
