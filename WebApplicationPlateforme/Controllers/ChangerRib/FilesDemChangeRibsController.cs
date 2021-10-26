using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.ChangerRib;

namespace WebApplicationPlateforme.Controllers.ChangerRib
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilesDemChangeRibsController : ControllerBase
    {
        private readonly DawaaContext _context;

        public FilesDemChangeRibsController(DawaaContext context)
        {
            _context = context;
        }

        // GET: api/FilesDemChangeRibs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FilesDemChangeRib>>> GetFilesDemChangeRib()
        {
            return await _context.FilesDemChangeRib.ToListAsync();
        }

        // GET: api/FilesDemChangeRibs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FilesDemChangeRib>> GetFilesDemChangeRib(int id)
        {
            var filesDemChangeRib = await _context.FilesDemChangeRib.FindAsync(id);

            if (filesDemChangeRib == null)
            {
                return NotFound();
            }

            return filesDemChangeRib;
        }

        // PUT: api/FilesDemChangeRibs/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFilesDemChangeRib(int id, FilesDemChangeRib filesDemChangeRib)
        {
            if (id != filesDemChangeRib.Id)
            {
                return BadRequest();
            }

            _context.Entry(filesDemChangeRib).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FilesDemChangeRibExists(id))
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

        // POST: api/FilesDemChangeRibs
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<FilesDemChangeRib>> PostFilesDemChangeRib(FilesDemChangeRib filesDemChangeRib)
        {
            _context.FilesDemChangeRib.Add(filesDemChangeRib);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFilesDemChangeRib", new { id = filesDemChangeRib.Id }, filesDemChangeRib);
        }

        // DELETE: api/FilesDemChangeRibs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<FilesDemChangeRib>> DeleteFilesDemChangeRib(int id)
        {
            var filesDemChangeRib = await _context.FilesDemChangeRib.FindAsync(id);
            if (filesDemChangeRib == null)
            {
                return NotFound();
            }

            _context.FilesDemChangeRib.Remove(filesDemChangeRib);
            await _context.SaveChangesAsync();

            return filesDemChangeRib;
        }

        private bool FilesDemChangeRibExists(int id)
        {
            return _context.FilesDemChangeRib.Any(e => e.Id == id);
        }
    }
}
